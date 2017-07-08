angular.module('app.routes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/app/views/pages/home.html',
            controller : 'homeCtrl',
            controllerAs : 'home'
        })

        //login page
        .when('/login', {
            templateUrl : '/app/views/pages/login.html',
        	controller   : 'mainController',
        	controllerAs   : 'login'
        })
        .when('/charts', {
            templateUrl: 'app/views/pages/charts/chartjs.html',
            controller: 'chartController',
            controllerAs: 'charts'
        })
        .when('/morris', {
            templateUrl: 'app/views/pages/charts/morris.html',
            controller: 'morrisChartController',
            controllerAs: 'charts'
        });
    // get rid of the hash in the URL
    $locationProvider.html5Mode(true);
});
