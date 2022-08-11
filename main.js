const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
    const window = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    window.loadFile("./window.html");
})