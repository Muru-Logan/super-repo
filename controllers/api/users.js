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
    var bCryptPwd = req.body.password
    var user = new User(
        {
          username : req.body.username,
          password : req.body.password
        })
    
    user.save(function(err, user)
        {
          if (err) { 
            console.log('error')
            return next(err)
             }
          res.status(201).json(user)    
        })
})

module.exports = router