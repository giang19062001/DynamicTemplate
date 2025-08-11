const Service = require('node-windows').Service;

// create and install and start service
const svc = new Service({
  name: 'POS Of Youth Sync Service',   // name service on service.msc
  description: 'POS Of Youth Sync Service 2025', 
  script: 'D:\\SHUKET\\DynamicTemplate\\windown-service\\app.js',  
  nodeOptions: [
    '--harmony', '--max_old_space_size=4096'
  ]
});

svc.on('install', () => {
  console.log('Service installed!');
  svc.start(); // start after installed
});

// install service
svc.install();
