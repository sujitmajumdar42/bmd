angular.module('bmd',[]);
angular.module('bmd').controller("DefaultController",DefaultController);
DefaultController.$inject = ['$http'];
function DefaultController($http){
	var vm = this;
	vm.title = "sample title";
	$http.get('../user').then(function(response){
		vm.data = angular.toJson(response.data);
	},function(err){
		
	});
}