const { contextBridge, ipcRenderer } = require("electron");

// Define customized API fuctions that can be called from renderer.js
contextBridge.exposeInMainWorld("BBB_API", {
  sendToMain: (msg) =>
    ipcRenderer.invoke("invoke-handle-message", msg).then((reply) => {
      return reply;
    }),
});

// other examples

// sends asynchronous message to main
// prints "pong synchronous message reply" on renderer
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

// listener for "asynchronous-reply" message from main
// prints "pong asynchronous reply" on renderer
ipcRenderer.on("asynchronous-reply", (_, ...args) => console.log(...args));

// sends asynchronous message to main
// prints "pong asynchronous reply"
ipcRenderer.send("asynchronous-message", "ping");
