var user = {};
user.name="sujit";
user.id ="042";
exports.get = function(req,res){
	res.json(user);
}