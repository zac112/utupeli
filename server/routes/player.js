function changename(req, res){	
	console.log("player 2 trying to : change name",req.body);
	global.db.userSchema.findOne({key:req.body.userId}, (err,result) => {
		console.log("Found player",result)
		if(result == null){
			res.json({});
		}else{
			result.name=req.body.name;
			result.save();
			res.json({success:true});
		}
	});

}

module.exports = {
	namechange:changename
};