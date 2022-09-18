const { BrowserWindow, Menu } = require('electron')
const path = require('path')

const createWindow = (width, height, preloadFilePath, htmlFilePath) => {
  const filePreload = typeof preloadFilePath !== 'undefined' ? preloadFilePath : path.join(__dirname, '..', 'preload', 'mainRenderer.js')
  const fileHTML = typeof htmlFilePath !== 'undefined' ? htmlFilePath : path.join(__dirname, '..', 'html', 'mainRenderer', 'index.html')
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: filePreload,
    },
  });

  if (fileHTML.indexOf("http://") != -1 || fileHTML.indexOf("https://") != -1)
    win.loadURL(fileHTML);
  else
    win.loadFile(fileHTML);
  return win;
}

const setupMenu = (name, win) => {
  // https://www.electronjs.org/docs/latest/api/menu
  const isMac = process.platform === 'darwin'
  const menu = Menu.buildFromTemplate([
    ...(isMac ? [
      {
        label: name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }
    ] : []),
    {
        label: 'File',
        submenu: [
          isMac ? { role: 'close' } : { role: 'quit' },
          {
            // https://www.electronjs.org/docs/latest/tutorial/application-debugging
            click: () => win.webContents.openDevTools(),
            label: 'DevTool On',
          },
          {
            click: () => win.webContents.closeDevTools(),
            label: 'DevTool Off',
          },
        ]
    },
  ])
  Menu.setApplicationMenu(menu)
}

// CommonJS
module.exports = {
  createWindow,
  setupMenu,
}
