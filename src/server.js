const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

const pdf = require('./pdf.js')

const jsonParser = bodyParser.json()

const claimSharedkey = process.env.CLAIM_SHAREDKEY
const otoroshiExchangeProtocolEnabled = claimSharedkey && claimSharedkey !== ''
if (otoroshiExchangeProtocolEnabled) {
  console.log('Otoroshi exchange protocol is enabled')
  app.use((req, res, next) => {
    const otoroshiState = req.header('Otoroshi-State')
    if (otoroshiState) {
      res.header('Otoroshi-State-Resp', otoroshiState)
      next()
    } else {
      res.status(400).send('Bad Request')
    }
  })
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.post('/convert/pdf/', jsonParser, (req, res) => {
  const content = req.body.content
  const name = req.body.name
  pdf.generatePDF(content, name, (outputFileName) => {
    console.log(outputFileName + ' generated')
    const headers = {
      'headers': {
        'Content-Type': 'application/pdf'
      }
    }
    res.sendFile(outputFileName, headers, () => {
      fs.unlink(outputFileName, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})

const port = process.env.PORT || 3001
app.listen(port, () => console.log('Server listening on port', port))
