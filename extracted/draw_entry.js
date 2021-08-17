const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 1600,
		height: 1000,
		webPreferences: {
			// nodeIntegration: true,
			// nodeIntegrationInWorker: true,
			// contextIsolation: false,
			webSecurity: false,
			autoplayPolicy: 'no-user-gesture-required',
		},
	})

	win.loadFile('draw_entry.html')
	win.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
