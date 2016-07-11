var app = angular.module('pushnotificationdemo', ['ui.router']);

app.run(function($rootScope) {

});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'LoginCtrl',
            abstract: false,
            templateUrl: 'templates/login.html',

        })
        .state('register', {
            url: '/register',
            controller: 'RegisterationCtrl',
            abstract: false,
            templateUrl: 'templates/register.html'
        })
        .state('notification', {
            url: '/notification',
            controller: 'MainCtrl',
            abstract: false,
            templateUrl: 'templates/notification.html',
            params: {
                authToken: '',
                userDetails: ''
            },
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
