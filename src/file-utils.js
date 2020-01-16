const fs = require('fs')

const deleteSilently = (file) => {
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.info(`File ${file} deleted!`)
    }
  })
}

module.exports = {
  deleteSilently
}
