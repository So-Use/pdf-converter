const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs');

const pdf = require('./pdf.js');

const jsonParser = bodyParser.json()

const claimSharedkey = process.env.CLAIM_SHAREDKEY;
const otoroshiExchangeProtocolEnabled = claimSharedkey && claimSharedkey !== "";
if (otoroshiExchangeProtocolEnabled) {
  console.log("Otoroshi exchange protocol is enabled");
  app.use(function(req, res, next) {
    const otoroshiState = req.header("Otoroshi-State")
    if (otoroshiState) {
      res.header("Otoroshi-State-Resp", otoroshiState)
      next();
    } else {
      res.status(400).send("Bad Request");
    }
    
  });
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/ping', (req, res) => {
  res.send('pong')
})

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