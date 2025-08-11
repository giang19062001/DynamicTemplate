const axios = require("axios");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

// KEY SECRET
const KEY_SECRET = "1234567890abcdef";

// POS local database (MYSQL)
const dbConfig = {
   host: "127.0.0.1",
   user: "root",
   password: "giang19062001",
   database: "pos_youth",
};

// Đường dẫn file log
const logFile = path.join(__dirname, "service-log.txt");

function writeLog(message) {
   const timestamp = new Date().toISOString();
   fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

async function SyncData() {
   let connection;
   try {
      connection = await mysql.createConnection(dbConfig);

      const [rows] = await connection.execute(`
        SELECT product_code, product_name, product_price, is_sync 
        FROM pos_youth.tbl_product_info
        WHERE is_sync = 0
      `);

      const response = await axios.post(
         "http://localhost:8000/api/product/syncProductFromPos",
         rows,
         { headers: { Authorization: `ApiKey ${KEY_SECRET}` } }
      );

      // Ghi log ra file
      writeLog(`API response: ${JSON.stringify(response.data)}`);

   } catch (err) {
      writeLog(`Error: ${err.message}`);
   } finally {
      if (connection) await connection.end();
   }
}

// Run each 1 minute
setInterval(SyncData, 60000);

// Run first time when service start
SyncData();
