(function (app) {
	'use strict';

	var protocol = 'http://',
		routes   = {
			'report'    : 'local.botaniser.com:8080/reports/add',
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
			},
			send: function(loc, config, method) {
				if (method) {
					return $http(method, protocol + routes[loc], config.data || {}, config);
				} else {
					return $http.post(protocol + routes[loc], config.data, config);
				}
			}
		};
	});
}(angular.module('botanApp')));