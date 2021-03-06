var Post = require('../../models/post')
var ws = require('../../websockets')
var router= require('express').Router()

router.get('/', function(req, res, next)
{
	console.log("get received")
	Post.find(function(err, posts)
	{
		if (err)
		{
			console.log(err)
		     return next(err)
		}
		//console.log(posts)
		res.status(200).json(posts)
	})

})

router.post('/', function(req,res, next)
{
	console.log('Post received');
	var post = new Post(
		{
		  id: 1,
		  username : req.body.username,
		  body : req.body.body,
		  createdby: req.body.createdby
		})
	//console.log(post.username)
	//console.log(post.body)
	
	post.save(function(err, post)
		{
		  if (err)
		  { 
			console.log('error')
			return next(err)
		 }
		 
		 /*var new_post = {
			 								id: post.id,
											 username: post.username,
											 body: post.body,
											 createdby : post.createdby
		 }*/
		 		 
		  ws.broadcast('new_post', post)	 
		  res.status(201).json(post)	
		})

	
})

module.exports = router