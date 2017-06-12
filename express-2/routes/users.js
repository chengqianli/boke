var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/zhuche";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/form',function(req,res,next){
			var zh=req.body['zh']
			var pass=req.body['pass']
			
			var insertData=function(db,callback){
				var conn=db.collection('info')
				var data=[{user:zh,pass:pass}]
				conn.insert(data,function(err,result){
					callback(result);
				})
			}
			mongodb.connect(db_str,function(err,db){
				if(err){
					
				}else{
					console.log('success')
					insertData(db,function(result){
						console.log(result)
						res.redirect('/')
						db.close()
					})
				}
			})
})




router.post('/denglu',function(req,res,next){
			var zh=req.body['zh']
			var pass=req.body['pass']
			
			var findData=function(db,callback){
				var conn=db.collection('info')
				var data={user:zh,pass:pass}
				conn.find(data).toArray(function(err,result){
										callback(result);
				})
					
				
			}
			mongodb.connect(db_str,function(err,db){
				if(err){
					
				}else{
					console.log('success')
					findData(db,function(result){
									if(result.length>0){
										req.session.user=result[0].user
										res.redirect('/')
										db.close()
									}else{
										res.redirect('/denglu')
										db.close()
									}
									})
				}
			})
})



router.post('/liuyan',function(req,res,next){
	if(req.session.user){
			var bt=req.body['bt']
			var txt=req.body['txt']
			
			var insertData=function(db,callback){
				var conn=db.collection('liuyan')
				var data=[{title:bt,con:txt}]
				conn.insert(data,function(err,result){
					callback(result);
				})
			}
			mongodb.connect(db_str,function(err,db){
				if(err){
					
				}else{
					console.log('success')
					insertData(db,function(result){
						console.log(result)
						res.redirect('/liuyan')
						db.close()
					})
				}
			})
			}else{
				res.send('您的session账号已经过期')
				
			}
})
router.post('/rizhi',function(req,res,next){
						var bt1=req.body['bt1']
						var txt1=req.body['txt1']
						var insertdata=function(db,callback){
							var conn=db.collection('rizhi')
							var data=[{title:bt1,con:txt1}]
							conn.insert(data,function(err,result){
								callback(result);
							})
						}
						mongodb.connect(db_str,function(err,db){
							if(err){
								
							}else{
								console.log('success')
								insertdata(db,function(result){
									console.log(result)
									res.redirect('/rizhi')
									db.close()
								})
							}
						})
})					
module.exports = router;
