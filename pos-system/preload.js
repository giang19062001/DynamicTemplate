// Reload desktop app after web app finished loading
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  doSomething: () => ipcRenderer.send('do-something'),
});