
var User = require('../../models/user')
var jwt = require('jwt-simple')
var router = require('express').Router()

var key = 'secretKey'

router.post('/generate', function(req,res,next)
{
    var usr = req.body.username
    var pwd = req.body.password
    
    console.log(usr + pwd)
            
    //var token = jwt.encode({username: usr}, key)
    //res.json(token)
            
    User.findOne({username: usr}, function(err, user) {
                    if (err){
                        console.log(err)
                        return  next(err)
                    }
                    
                    if (!user){
                        return res.status(200).json({"token":"", "err":"user not found"});
                    }
                    
                    if (pwd != user.password){
                        return res.status(200).json({"token":"", "err":"Invalid username/password, please try again"});
                    }
                    
                    console.log("password" + user.password)
                    console.log("username:" + user.username)
                    var token = jwt.encode({username: usr}, key)
                    res.status(200).json({"token":token, "err":""})
                    
                })
})

router.post('/validate', function(req,res)
{
    var token = req.headers['authorization']
    //console.log(token)
    //console.log(key)
    var auth = jwt.decode(token, key)
    //console.log(auth)
    User.findOne({username: auth.username}, function(err,user)
    {
        res.status(200).json(user)
    })
    
})

module.exports = router
