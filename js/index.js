const { app, BrowserWindow, Menu, Tray } = require('electron');
const { autoUpdater } = require('electron-updater');

let window;
let template = 'index.html';
let fileName;
let tray = null;
let isQuitting = false;
function createWindow(){
    window = new BrowserWindow({width: 1200, height: 900});
    window.loadFile(template);
    if(typeof fileName !== "undefined"){
        window.webContents.on('did-finish-load', () => {
            window.webContents.send('image-msg', fileName);
        })
    }
    window.on('minimize', (event) =>{
        event.preventDefault();
        window.hide();
    });

    window.on('close', (event) => {
        if(!isQuitting) {
            event.preventDefault();
            window.hide();
        }
    });
}

app.on('ready', () => {
    createWindow();
    tray = new Tray('./resources/trayicon.png');
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => {
            window.show();
        }},
        {label: 'Exit', click: () => {
            isQuitting = true;
            app.quit();
        }},
    ])
    tray.setToolTip("Shoumi - Image viewer");
    tray.setContextMenu(contextMenu);
    autoUpdater.checkForUpdatesAndNotify();
});




