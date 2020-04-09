const fs = require('fs')
const path = require('path')
const RenderPDF = require('chrome-headless-render-pdf')

const { deleteSilently } = require('./file-utils')

const generatePDF = (inputAsHTML, name, options, callback) => {
  const fileName = new Date().getTime()
  const pathFileName = path.resolve(__dirname, `../inputs/html/${name}-${fileName}.html`)
  const outputPathFileName = path.resolve(__dirname, `../outputs/pdf/${name}-${fileName}.pdf`)

  fs.writeFile(pathFileName, inputAsHTML, (err) => {
    if (err) {
      callback(err, null)
    } else {
      RenderPDF.generateSinglePdf(`file://${pathFileName}`, outputPathFileName, options || {})
        .then(() => {
          deleteSilently(pathFileName)
          callback(null, outputPathFileName)
        })
        .catch((err) => {
          callback(err, null)
        })
    }
  })
}

module.exports = {
  generatePDF
}
