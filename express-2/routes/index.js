var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/zhuche";

var http=require('http')

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,use:req.session.user});
});*/
router.get('/register',function(req,res,next){
	res.render('register',{})
})
router.get('/denglu',function(req,res,next){
	res.render('denglu',{})
})


router.get('/tuichu',function(req,res,next){
	req.session.destroy(function(err){
		if(!err){
				res.redirect('/')
		}
	})
})

router.get('/liuyan',function(req,res,next){
	

			
			var findData=function(db,callback){
				var conn=db.collection('liuyan')
				conn.find({}).toArray(function(err,result){
										callback(result);
				})
					
				
			}
			mongodb.connect(db_str,function(err,db){
				if(err){
					
				}else{
					console.log('success')
					findData(db,function(result){
									res.render('liuyan',{result:result})
									
									
					})
				}
			})
	
})
router.get('/rizhi',function(req,res,next){
	var finddata=function(db,callback){
		var conn=db.collection('rizhi')
		conn.find({}).toArray(function(err,result){
			callback(result);
		})
	}
	mongodb.connect(db_str,function(err,db){
		if(err){
			
		}else{
			console.log('success')
			finddata(db,function(result){
				res.render('rizhi',{result:result})
			})
		}
	})
})
router.get('/',function(req,res,next){
	res.render('shouye',{shouye:'@恒爱的博客'})
})
router.get('/xiangche',function(req,res,next){
	res.render('xiangche',{})
})

http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8',"Access-Control-Allow-Origin":'*'})
	if(req.url!='/favicon.ico'){
		res.write('你好美')
		}
		res.end()
}).listen(3000,'10.8.158.23')

module.exports = router;
