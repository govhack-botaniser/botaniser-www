'use strict';

angular
	.module('botanApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl'
			})
			.when('/nearMe', {
				templateUrl: 'views/nearMe.html',
				controller: 'NearMe'
			})
			.when('/report', {
				templateUrl: 'views/report.html',
				controller: 'Report'
			})
			.when('/species/:speciesId', {
				templateUrl: 'views/speciesDetailCtrl.html',
				controller: 'SpeciesDetailCtrl'
			})
			.when('/species/:speciesId/:radius', {
				templateUrl: 'views/speciesDetailCtrl.html',
				controller: 'SpeciesDetailCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}).run(function($rootScope, $window) {
		$rootScope.slide = '';
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.slide = 'slide-left';
		});
		$rootScope.$on('$routeChangeSuccess', function() {
			$rootScope.slide = '';
		});
	});