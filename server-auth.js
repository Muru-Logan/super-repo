var express = require('express')
var jwt = require('jwt-simple')
var logger = require('morgan')
var user = require('./models/user')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/api/users', require('./controllers/api/users'))
app.use('/api/token', require('./controllers/api/token'))

app.listen(2002, function()
{
    console.log('server running successfully on 2002')
})
