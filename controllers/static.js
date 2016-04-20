var express = require('express')
var router = express.Router()

router.get('/', function(req, res)
	{
	 //res.sendFile( '/play/mean/sample/layouts/posts.html')
	 res.sendFile( '/play/mean/sample/layouts/app.html')
	}
)

router.use(express.static(__dirname + "/../assets"))
router.use('/templates', express.static(__dirname + "/../templates"))

module.exports = router