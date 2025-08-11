const Service = require("node-windows").Service;
const svc = new Service({
  name: 'POS Of Youth Sync Service',       // name service on service.msc
   script: "D:\\SHUKET\\DynamicTemplate\\windown-service\\app.js",
});

svc.on("uninstall", () => {
   console.log("Service uninstalled!");
});

// unistall server from service.msc
svc.uninstall();
