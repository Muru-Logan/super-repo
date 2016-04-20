var User = require('../../models/user')
var router= require('express').Router()

router.get('/', function(req, res, next)
{
    console.log("get received")
    User.find(function(err, users)
    {
        if (err)
        {
            console.log(err)
             return next(err)
        }
        res.status(200).json(users)
    })

})

router.post('/', function(req,res, next)
{
    console.log('received');
    var user = new User(
        {
          username : req.body.username,
          password : req.body.password
        })
    //console.log(post.username)
    //console.log(post.body)
    
    user.save(function(err, user)
        {
          if (err) { 
            console.log('error')
            return next(err)
             }
          res.status(201).json(user)    
        })


    //console.log(req.body.username)
    //console.log(req.body.body)
    //res.sendStatus(201)
})

module.exports = router