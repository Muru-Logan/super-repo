var db = require('../db')

var Post = db.model('Post', {
	id:{type:String},
	username : {type: String, required:true},
	body: {type:String, required:true},
	createdby: {type:String},
	date:{type:Date, required:true, default: Date.now}
})

module.exports = Post
