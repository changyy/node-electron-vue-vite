# Usage

- html: Electron Renderer Web UI code
- main: Electron main process
- reload: Electron preload script
- renderer: Electron Renderer (BrowserWindow) UI setup

```
% tree src 
src
├── html
│   └── mainRenderer
│       ├── index.html
│       ├── src
│       │   ├── App.vue
│       │   ├── components
│       │   │   └── HelloWorld.vue
│       │   └── main.js
│       └── vite.config.js
├── main
│   └── index.js
├── preload
│   └── mainRenderer.js
└── renderer
    ├── index.js
    └── mainRenederer.js

7 directories, 9 files
```
---

# Build / Pack

html: Using Vue.js 3 and Vite 

```
% source env_nvm.sh 
Now using node v16.15.1 (npm v8.11.0)

% npm run clean

> simple-electron-app-with-vue-vite@1.0.0 clean
> concurrently -g "npm:clean-dist" "npm:clean-bundle"

[clean-dist] 
[clean-dist] > simple-electron-app-with-vue-vite@1.0.0 clean-dist
[clean-dist] > node -e "require('fs-extra').removeSync('./dist/');"
[clean-dist] 
[clean-dist] npm run clean-dist exited with code 0
[clean-bundle] 
[clean-bundle] > simple-electron-app-with-vue-vite@1.0.0 clean-bundle
[clean-bundle] > node -e "require('fs-extra').removeSync('./bundle/');"
[clean-bundle] 
[clean-bundle] npm run clean-bundle exited with code 0

% npm run pack 

> simple-electron-app-with-vue-vite@1.0.0 pack
> concurrently -g "npm:pack-electron-structure" "npm:pack-renderer-html"

[pack-electron-structure] 
[pack-electron-structure] > simple-electron-app-with-vue-vite@1.0.0 pack-electron-structure
[pack-electron-structure] > node -e "require('fs-extra').copySync('src','bundle',{overwrite:true});"
[pack-electron-structure] 
[pack-electron-structure] npm run pack-electron-structure exited with code 0
[pack-renderer-html] 
[pack-renderer-html] > simple-electron-app-with-vue-vite@1.0.0 pack-renderer-html
[pack-renderer-html] > vite build --config src/html/mainRenderer/vite.config.js --base './' --emptyOutDir --outDir ../../../bundle/html/mainRenderer/ src/html/mainRenderer/
[pack-renderer-html] 
[pack-renderer-html] vite v3.1.0 building for production...
[pack-renderer-html] transforming...
[pack-renderer-html] ✓ 27 modules transformed.
[pack-renderer-html] rendering chunks...
[pack-renderer-html] ../../../bundle/html/mainRenderer/index.html                  0.53 KiB
[pack-renderer-html] ../../../bundle/html/mainRenderer/assets/index.0f0c24eb.css   0.34 KiB / gzip: 0.18 KiB
[pack-renderer-html] ../../../bundle/html/mainRenderer/assets/index.e141c403.js    52.23 KiB / gzip: 21.14 KiB
[pack-renderer-html] npm run pack-renderer-html exited with code 0

% tree bundle 
bundle
├── html
│   └── mainRenderer
│       ├── assets
│       │   ├── index.0f0c24eb.css
│       │   └── index.e141c403.js
│       └── index.html
├── main
│   └── index.js
├── preload
│   └── mainRenderer.js
└── renderer
    ├── index.js
    └── mainRenederer.js

6 directories, 7 files

% cat bundle/html/mainRenderer/index.html 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Vite App</title>
    <script type="module" crossorigin src="./assets/index.e141c403.js"></script>
    <link rel="stylesheet" href="./assets/index.0f0c24eb.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

% npm run build-mac

> simple-electron-app-with-vue-vite@1.0.0 build-mac
> electron-builder --mac

  • electron-builder  version=23.3.3 os=21.6.0
  • description is missed in the package.json  appPackageFile=/path/node-electron-vue-vite/package.json
  • writing effective config  file=dist/builder-effective-config.yaml
  • packaging       platform=darwin arch=x64 electron=20.1.3 appOutDir=dist/mac
  • default Electron icon is used  reason=application icon is not set
  • skipped macOS application code signing  reason=cannot find valid "Developer ID Application" identity or custom non-Apple code signing certificate, it could cause some undefined behaviour, e.g. macOS localized description not visible, see https://electron.build/code-signing allIdentities=     0 identities found
                                                Valid identities only
     0 valid identities found
  • building        target=macOS zip arch=x64 file=dist/simple-electron-app-with-vue-vite-1.0.0-mac.zip
  • building        target=DMG arch=x64 file=dist/simple-electron-app-with-vue-vite-1.0.0.dmg
  • building block map  blockMapFile=dist/simple-electron-app-with-vue-vite-1.0.0.dmg.blockmap
  • building block map  blockMapFile=dist/simple-electron-app-with-vue-vite-1.0.0-mac.zip.blockmap

% tree dist -L 1
dist
├── builder-debug.yml
├── builder-effective-config.yaml
├── latest-mac.yml
├── mac
├── simple-electron-app-with-vue-vite-1.0.0-mac.zip
├── simple-electron-app-with-vue-vite-1.0.0-mac.zip.blockmap
├── simple-electron-app-with-vue-vite-1.0.0.dmg
└── simple-electron-app-with-vue-vite-1.0.0.dmg.blockmap

1 directory, 7 files
```

---

# Development / Hot Reload / Hot Module Reloading (HMR)

```
% npm run dev

> simple-electron-app-with-vue-vite@1.0.0 dev
> concurrently -g "npm:dev-vue" "npm:dev-vue-electron"

[dev-vue] 
[dev-vue] > simple-electron-app-with-vue-vite@1.0.0 dev-vue
[dev-vue] > vite ./src/html/mainRenderer/
[dev-vue] 
[dev-vue] 
[dev-vue]   VITE v3.1.0  ready in 537 ms
[dev-vue] 
[dev-vue]   ➜  Local:   http://localhost:5173/
[dev-vue]   ➜  Network: use --host to expose
```
