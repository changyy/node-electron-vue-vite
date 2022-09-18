const { app, BrowserWindow, ipcMain, screen, Menu } = require('electron')
const { env } = require('node:process')

const path = require('path')
const { mainRenderer } = require( path.join(__dirname, '..', 'renderer') )

let main_window_path_preload = path.join(__dirname, '..', 'preload', 'mainRenderer.js')
let main_window_path_html = path.join(__dirname, '..', 'html', 'mainRenderer', 'index.html')

if (typeof MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY !== 'undefined') {
  main_window_path_preload = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
} else if (typeof env.MAIN_WINDOW_PRELOAD_ENTRY !== 'undefined') {
  main_window_path_preload = env.MAIN_WINDOW_PRELOAD_ENTRY
}
if (typeof MAIN_WINDOW_WEBPACK_ENTRY !== 'undefined') {
  main_window_path_html = MAIN_WINDOW_WEBPACK_ENTRY
} else if (typeof env.MAIN_WINDOW_ENTRY !== 'undefined') { 
  main_window_path_html = env.MAIN_WINDOW_ENTRY
}

app.whenReady().then(() => {
  // https://github.com/electron/electron/blob/main/docs/api/screen.md
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const mainWin = mainRenderer.createWindow(width, height, main_window_path_preload, main_window_path_html)
  mainRenderer.setupMenu(app.name, mainWin)
  // https://www.electronjs.org/docs/latest/api/menu
  //Menu.setApplicationMenu(menu)

  // https://www.electronjs.org/docs/latest/tutorial/ipc#pattern-2-renderer-to-main-two-way
  ipcMain.handle('ping', () => 'pong')

  ipcMain.handle('detectNFCDevice', () => 'pong')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const mainWin = mainRenderer.createWindow(width, height, main_window_path_preload, main_window_path_html)
      mainRenderer.setupMenu(app.name, mainWin)
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
