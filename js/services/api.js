(function (app) {
	'use strict';
	var routes  = {
		'byLocation': 'http://localhost:9292/biocache.ala.org.au/ws/occurrences/search'
		//'byLocation': 'http://localhost:9292/biocache.ala.org.au/ws/occurrence/facets'
	};

	app.factory('api', function ($rootScope, $http) {
		return {
			fetch: function(loc, config) {
				return $http.get(routes[loc], config);
			}
		};
	});
}(angular.module('botanApp')));