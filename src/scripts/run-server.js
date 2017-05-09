const Debug = require('debug')
const express = require('express')
const paths = require('../config/paths')

const debug = Debug('server-production')
const app = express()

app.use(express.static(paths.serverRoot))

app.listen(3000, function () {
  debug('Server startet at http://localhost:3000')
})
