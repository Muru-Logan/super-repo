var express = require('express')
var parser = require('body-parser')
var logger = require('morgan')
var Post = require('./models/post')
var socket = require('./websockets')

var app = express()
app.use(parser.json())

app.use(logger('dev'))

app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/users', require('./controllers/api/users'))
app.use('/api/token', require('./controllers/api/token'))
app.use('/', require('./controllers/static'))

var server = app.listen(2273, function()
{
	console.log("Server is running successfully on 2273")
})
    
socket.connect(server)
