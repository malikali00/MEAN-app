angular.module('userApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'userService',
	'chartsService',
	'mainCtrl',
	'chartsCtrl'
	])
.config(function($httpProvider)	{	
	//attach our auth inteceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');
});