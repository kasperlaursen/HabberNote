// const { app, BrowserWindow } = require('electron');
import { app, BrowserWindow, ipcMain, Tray, nativeImage } from "electron";
import * as path from "path";

let tray = undefined;
let window = undefined;

// Don't show the app in the doc
//app.dock.hide();
app.on("ready", () => {
  createTray();
  createWindow();
});

const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    width: 320,
    height: 320,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.webContents.openDevTools()

  // and load the index.html of the app.
  window.loadFile("index.html");

  // Hide the window when it loses focus
  window.on("blur", () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
};

const createTray = () => {
  const iconPath = path.join(__dirname, "icon.png");
  let trayIcon = nativeImage.createFromPath(iconPath);

  tray = new Tray(trayIcon);

  tray.on("click", (event) => {
    toggleWindow();
  });
};

const toggleWindow = () => {
  window.isVisible() ? window.hide() : showWindow();
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
};

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2
  );
  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  return { x: x, y: y };
};
