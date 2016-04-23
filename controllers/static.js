var express = require('express')
var router = express.Router()

/*router.get('/', function(req, res)
	{
	 //res.sendFile( '/play/mean/sample/layouts/posts.html')
	 res.sendFile('/play/mean/sample/layouts/app.html')
	}
)*/


router.get('/', function(req, res){
	//router.use(express.static(__dirname + "/../layouts"))
	//router.use('/layouts', express.static(__dirname + "/../layouts"))
	//var appHtml =  __dirname + '/../layouts/app.html'
	//console.log(appHtml)
	//res.sendFile(appHtml)
	
	res.render('app.html.ejs')
})

router.use(express.static(__dirname + "/../assets"))
router.use('/templates', express.static(__dirname + "/../templates"))

module.exports = router