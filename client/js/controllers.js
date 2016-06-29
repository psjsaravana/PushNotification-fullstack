app.controller('LoginCtrl', function($scope, $rootScope, $http, $state) {
    $scope.loginuser = {};
    $scope.loginTap = function() {
        $http.post("/api/authenticate", $scope.loginuser).then(function(response) {
        	console.log(response);
        }).catch(function(err) {
        	console.log(err);
        })
    };
    $scope.registerTap = function () {
		$state.go('register');
	}
});
app.controller('RegisterationCtrl', function($scope, $http, $rootScope,$state) {
	$scope.newuser = {};
	
    $scope.doRegister = function() {
        $http.post("/api/register", $scope.newuser).then(function(response) {
        	console.log(response);
        }).catch(function(err) {
        	console.log(err);
        })
    };
});
