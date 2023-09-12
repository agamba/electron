# Test Electron communication between Main and Renderer Processes

This test application provides an example of the current approaches in communication between Main process, which in on the sisde of Nodejs, and te Renderer Process run in the Electron container.

The role(s) of each of the files is as follows:

## main.js

- nodejs Main file
- creates electron window
- defines nodeIntegration and contextIsolation preferences
- defines path to **preload.js** file, nodeIntegration and contextIsolation preferences
- defines event listeners for Inter-Process Communication(IPC)

## preload.js

- The preload.js file in responsible of exposing nodejs modules to Electron's Renderer Process. For this reason, this file has access to **require** method
- This file must define the Inter-Process Communication(IPC) API that will be used by the **renderer.js** file

## index.html

- html file loaded by the renderer process
- note that this file contains is responnsible of loading the **renderer.js** file
- in this scope, there is no access to nodejs modules, only the functmionality or API exposed to the renderer in **preload.js**

# Key aspects of IPC

- Both Synchronous and Asynchronous messages can be send between Main and Renderer processes
- Asynchronous methods:
  - ipcRenderer.invoke
  - ipcRenderer.invoke
  -
- Synchronous methods
  - ipcRenderer.sendSync

# Additional information

https://electronjs.org/docs/api/ipc-main
https://electronjs.org/docs/api/ipc-renderer
