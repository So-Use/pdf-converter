const fs = require('fs');
const path = require('path')
const RenderPDF = require('chrome-headless-render-pdf');

function generatePDF(inputAsHTML, name, callback) {
    const fileName = new Date().getTime()
    var pathFileName = path.resolve(__dirname, `../inputs/html/${name}-${fileName}.html`)
    var outputPathFileName = path.resolve(__dirname, `../outputs/pdf/${name}-${fileName}.pdf`)
    fs.writeFile(pathFileName, inputAsHTML, (err) => {
        if (err) {
            console.log(err);
        } else {
            RenderPDF.generateSinglePdf(`file://${pathFileName}`, outputPathFileName, {
            }).then(() => {
                fs.unlink(pathFileName, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                callback(outputPathFileName);
            });
        }
    })
}

module.exports = {
    generatePDF
}