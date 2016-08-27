var user = {};
user.name="sujit";
user.id ="001";
exports.get = function(req,res){
	res.json(user);
}