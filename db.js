var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/social", function()
{
			console.log("mongo db connected")
})

module.exports = mongoose