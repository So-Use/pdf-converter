# PDF Converter

[![Build Status](https://travis-ci.com/Serli/pdf-converter.svg?branch=master)](https://travis-ci.com/Serli/pdf-converter)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple HTML to PDF converter, based on Chrome Headless and NodeJs.

## API

### GET `/ping`

```
curl -X GET http://localhost:3001/ping --include
```

### POST `/convert/pdf/`

```
curl -X POST -H "Content-Type: application/json" http://localhost:3001/convert/pdf/ -d '{
    "name": "test.pdf",
    "content": "<h1>PDF</h1><p>This is a test</p>"
}' --output test.pdf
```
