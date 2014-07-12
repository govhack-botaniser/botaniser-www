(function (app) {
	'use strict';

	var protocol = 'http://localhost:9292/',
		routes   = {
			'bulkSearch': 'bie.ala.org.au/ws/species/lookup/bulk',
			'byLocation': 'biocache.ala.org.au/ws/occurrences/search'
			//'byLocation': 'http://localhost:9292/biocache.ala.org.au/ws/occurrence/facets'
		};

	app.factory('api', function ($rootScope, $http) {
		return {
			fetch: function(loc, config, method) {
				if (method === 'POST') {
					return $http.post(protocol + routes[loc], config.data || {}, config);
				} else {
					return $http.get(protocol + routes[loc], config);
				}
			}
		};
	});
}(angular.module('botanApp')));