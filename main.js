const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
    const window = new BrowserWindow({
        icon: 'build/icono.ico',
        width: 500,
        height: 300,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    window.loadFile("./assets/window.html");
})