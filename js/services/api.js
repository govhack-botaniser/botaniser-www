(function (app) {
	'use strict';
	app.factory('api', function ($rootScope, $http) {
		return {
			fetch: $http //just wrapping the normal http request for now
		};
	});
}(angular.module('botanApp')));