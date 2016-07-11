app.factory('ajaxservice', function($http, $rootScope) {

    var requestObj = {
        method: "POST",
        url: '',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    }

    return {
        authenticate: function(data) {
            var reqObj = {
                url: '/api/authenticate',
                data: angular.extend({}, data)
            }
            var reqObjExt = angular.extend({}, requestObj, reqObj);
            return $http(reqObjExt);
        },
        register: function(data) {
            var reqObj = {
                url: '/api/register',
                data: angular.extend({}, data),
                headers: {
                    "x-access-token": $rootScope.authToken
                }
            }
            var reqObjExt = angular.extend({}, requestObj, reqObj);
            return $http(reqObjExt);
        },
        sendNotification: function(data) {
            var reqObj = {
                url: '/api/sendnotification',
                data: angular.extend({}, data),
                headers: {
                    "x-access-token": $rootScope.authToken
                }
            }
            var reqObjExt = angular.extend({}, requestObj, reqObj);
            return $http(reqObjExt);
        }
    };

});
