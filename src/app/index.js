const { ipcMain, app, BrowserWindow, Menu } = require('electron');
const path = require("path");
const client = require(__dirname+'/src/app/drp.js')('635084414543462412');

function createWindow () {
  const win = new BrowserWindow({
	backgroundColor: '#7289da',
	show: false,
    width: 500,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    titleBarStyle: 'customButtonsOnHover', frame: false,
  })

  win.loadFile(__dirname+'/src/render/loading.html');
  win.once('ready-to-show', () => {
  win.show();
  //then create the main page
  const mainwin = new BrowserWindow({
	backgroundColor: '#36393f',
	show: false,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
	titleBarStyle: 'hiddenInset',
	//frame: false,
  });
  mainwin.webContents.on('new-window', function(e, url) {
	e.preventDefault();
	require('electron').shell.openExternal(url);
  });
  mainwin.loadFile(__dirname+'/src/render/index.html');
  mainwin.once('ready-to-show', () => {
    win.close();
    mainwin.show();
	try{
		client.updatePresence({
			state: 'Idling',
			details: 'A Bot maker for Discord',
			largeImageKey: 'logo-big',
			instance: true,
		});
	}catch{
	console.log("Failed");
	}
  });
});
}

app.whenReady().then(()=>{
	createWindow();
	setMainMenu();
	})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('close-me', (evt, arg) => {
  app.quit();
})

function setMainMenu() {
  const template = [
    {
      label: 'App',
      submenu: [
        {
          label: 'About',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
              console.log('About')
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
