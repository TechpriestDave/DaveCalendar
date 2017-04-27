import { app, Tray, Menu, BrowserWindow, ipcMain } from "electron";
const fs = require("fs");
const path = require("path");


app.setName("DaveCalendar");
let mainWindow;
let tray;
require("./context.js");

if (!fs.existsSync(path.join(app.getPath("userData"), "tasks.min.json"))) {
  fs.writeFileSync(path.join(app.getPath("userData"), "tasks.min.json"), "[]");
}

const winURL = process.env.NODE_ENV === "development"
  ? `http://localhost:${require("../../../config").port}`
  : `file://${__dirname}/index.html`;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 740,
    width: 460,
    frame: false,
    show: false,
    // transparent: true,
  });

  tray = new Tray(`${__dirname}/icon.png`);
  tray.setToolTip("DaveDo");
  tray.on("click", showWindow);
  const contextMenu = Menu.buildFromTemplate([
		{ label: "Show", type: "normal", click: showWindow },
		{ type: "separator" },
		{ label: "Exit", type: "normal", click: closeApp },
  ]);
  tray.setContextMenu(contextMenu);
	// var mb = menubar({tray: tray});


  ipcMain.on("action", (event, arg) => {
    switch (arg.action) {
      case "exit":
        closeApp();
        break;
      case "hide":
        mainWindow.hide();
        break;
      case "minimize":
        mainWindow.minimize();
        break;
      case "toggleDevTools":
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools();
        } else {
          mainWindow.webContents.openDevTools();
        }
        break;
      default:

    }
  // event.sender.send('asynchronous-reply', 'pong')
  });

  mainWindow.loadURL(winURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // eslint-disable-next-line no-console
  console.log("mainWindow opened");
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function showWindow() {
  if (!mainWindow.isVisible()) {
    mainWindow.show();
  }
}

function closeApp() {
  tray.destroy();
  process.exit();
}
