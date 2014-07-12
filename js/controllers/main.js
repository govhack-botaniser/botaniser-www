(function (app) {
	'use strict';
	app.controller('MainCtrl', function ($scope, geolocation) {
		$scope.pos = {};
		geolocation.getCurrentPosition(function (pos) {
			$scope.pos = pos;
		});
	});
}(angular.module('botanApp')));