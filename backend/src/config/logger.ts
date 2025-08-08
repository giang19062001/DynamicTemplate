import path from "path";
import appRootPath from "app-root-path";
import winston, { format, transports } from "winston";
import "winston-daily-rotate-file";
import moment from "moment";

const { combine, timestamp, printf } = format;

const infoOnly = format((info) => {
   return info.level === "info" ? info : false;
});

const errorOnly = format((info) => {
   return info.level === "error" ? info : false;
});

// Định nghĩa interface cho logger mở rộng
type CustomLogger = winston.Logger & {
   stream: {
      write: (message: string, encoding?: string) => void;
   };
   writeLog: (logType: string, logMessage: string) => void;
};

// Định dạng log
const logFormat = printf((info) => {
   return `${info.timestamp} ${info.level}: ${info.message}`;
});

// Đường dẫn logs
const logsPath = path.join(appRootPath.path, "logs");

// Khởi tạo logger
const logger: CustomLogger = winston.createLogger({
   format: combine(
      timestamp({
         format: "YYYY-MM-DD HH:mm:ss",
      }),
      logFormat
   ),
   transports: [
      new transports.DailyRotateFile({
         level: "info",
         format: combine(infoOnly(), logFormat),
         filename: path.join(logsPath, "info-%DATE%.log"),
         datePattern: "YYYY-MM-DD-HH",
         maxSize: "1m", // tương đương ~1024 bytes
         maxFiles: "30d",
         zippedArchive: true,
      }),
      new transports.DailyRotateFile({
         level: "error",
         format: combine(errorOnly(), logFormat),
         filename: path.join(logsPath, "error-%DATE%.log"),
         datePattern: "YYYY-MM-DD-HH",
         maxSize: "1m",
         maxFiles: "30d",
         zippedArchive: true,
      }),
   ],
}) as unknown as CustomLogger;

// Stream cho morgan (HTTP logger)
logger.stream = {
   write: (message: string) => {
      logger.info(message.trim());
   },
} as unknown as typeof logger.stream;

// Hàm ghi log tùy chỉnh
logger.writeLog = (logType: string, logMessage: string) => {
   logger.log(logType, logMessage);
   console.log(`[${logType}] ${logMessage}`);
};

export default logger;
