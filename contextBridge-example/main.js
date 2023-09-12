const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// test function defined in main.js triggered when responding to invoke message sent by the renderer
function respondToRenderer(data) {
  // create a test response object
  const res = {
    msg: data,
    response:
      "This is the response to 'invoke-handle-message'. Send from main.js and isolated in customized function",
  };
  // return method automatically sends
  return res;
}

// event listener for when Electron application is ready
// note the values of nodeIntegration and contextIsolation which are currently the best practice
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 600,
    webPreferences: {
      nodeIntegration: false, // default in Electron >= 5
      contextIsolation: true, // default in Electron >= 12
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // handles the invoke method triggered by the renderer
  // calls the function respondToRenderer() defined in main.js
  // returns the response of the fuction back to the renderer
  ipcMain.handle("invoke-handle-message", (event, arg) => {
    console.log("invoke-handle-message", arg);
    // call custom fuction to process the messge in main.js
    const myRes = respondToRenderer(arg);
    // print response object in main.js
    console.log("invoke-handle-message", myRes);
    // note that "return" in the context of "ipcMain.handle" automatially sends the response to the renderer
    return myRes;
  });

  // listener for asynchronous-message
  ipcMain.on("asynchronous-message", (event, arg) => {
    // prints message send by renderer in main
    console.log("asynchronous-message: ", arg);
    event.sender.send("asynchronous-reply", "pong asynchronous reply");
  });

  // listener for synchronous-message
  ipcMain.on("synchronous-message", (event, arg) => {
    // prints message sent by renderer
    console.log("synchronous-message: ", arg);
    event.returnValue = "pong synchronous message reply";
  });

  // load html template file
  mainWindow.loadFile("index.html");
});
