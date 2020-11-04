const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

const pathToServe = path.resolve(__dirname, 'dist')
const faviconFilesPath = path.resolve(__dirname, 'favicon-files')

const port = process.env.PORT || 3000

// Serving up the bundled code from pathToServe and all the favicon files from faviconFilesPath
app.use(serveStatic(pathToServe))
app.use(serveStatic(faviconFilesPath))

// As this is a SPA all requests should arrive at index.html page
app.get('*', (req, res) => {
  res.sendFile(path.join(pathToServe, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
