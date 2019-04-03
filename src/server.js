const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const fs = require('fs');

const pdf = require('./pdf.js');

var jsonParser = bodyParser.json()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/convert/pdf/', jsonParser, (req, res) => {
  var content = req.body.content
  var name = req.body.name;
  pdf.generatePDF(content, name, (outputFileName) => {
    console.log(outputFileName + ' generated')
    res.sendFile(outputFileName, {headers: {'Content-Type': 'application/pdf'}}, () => {
      fs.unlink(outputFileName, (err) => {
        if (err) {
          console.log(err)
        }
      });
    });
  })
})

app.listen(process.env.PORT || 3001, () => console.log('Server listening on port', process.env.PORT || '3001'));