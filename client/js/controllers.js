app.controller('LoginCtrl', function($scope, $rootScope, $http, $state,ajaxservice) {
    $scope.loginuser = {};
    $scope.loginTap = function() {
        $('#LoadingIndicator').modal('show');
        ajaxservice.authenticate($scope.loginuser).then(function(response) {
            $('#LoadingIndicator').modal('hide');
            if(response.data.success == 'true') {
                $state.go('notification',{authToken:response.data.token,userDetails:response.data.userDetails});
            }else {
                alert(response.data.message);
            }
        }).catch(function(err) {
            $('#LoadingIndicator').modal('hide');
        	console.log(err);
            alert(err);
        })
    };
    $scope.registerTap = function () {
		$state.go('register');
	}
});
app.controller('RegisterationCtrl', function($scope, $http, $rootScope,$state,ajaxservice) {
	$scope.newuser = {};
    $scope.doRegister = function() {
        $('#LoadingIndicator').modal('show');
        ajaxservice.register($scope.newuser).then(function(response) {
            $('#LoadingIndicator').modal('hide');
            var responseMsg = response.data.message || response.data.errmsg;
            if(response.data.errmsg) {
                if(response.data.code == 11000) {
                    alert("User Name already found,Please enter unique username!!!");
                }else{
                    alert(responseMsg);
                }                
            }else {
                $state.go('login');
                alert(responseMsg);
            }
        	console.log(response);
        }).catch(function(err) {
            $('#LoadingIndicator').modal('hide');
        	console.log(err);
        })
    };
    $scope.navBack = function () {
        $state.go('login');
    }
});
app.controller('MainCtrl', function($scope, $http, $rootScope,$state,$stateParams,ajaxservice) {
    $scope.notification = {};
    if($stateParams.authToken) {
        $rootScope.authToken = $stateParams.authToken
        $scope.userDetails = $stateParams.userDetails
    }
    $scope.sendNotification = function() {
        $('#LoadingIndicator').modal('show');
        ajaxservice.sendNotification($scope.notification).then(function(response) {
            console.log(response);
            $('#LoadingIndicator').modal('hide');
            if(response.data.success == 'true') {
                alert('Notification send to registered devices!!!');
                $scope.notification.title = '';
                $scope.notification.content = '';
            }else {
                alert('Failed to send Notification '+response.data.message);
            }
            
        }).catch(function(err) {
            $('#LoadingIndicator').modal('hide');
            console.log(err);
            alert(err);
        })
    };

    $scope.doLogout = function() {
        $rootScope.authToken = null;
        $state.go('login');
    };
});
