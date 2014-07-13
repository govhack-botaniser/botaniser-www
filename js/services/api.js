(function (app) {
	'use strict';

	var protocol = 'http://localhost:9292/',
		routes   = {
			'singleSpecies': 'bie.ala.org.au/ws/species/{guid}.json',
			'specieDetail' : 'biocache.ala.org.au/ws/occurrences/search',
			'report'       : 'local.botaniser.com:8080/reports/add',
			'bulkSearch'   : 'bie.ala.org.au/ws/species/lookup/bulk',
			'byLocation'   : 'biocache.ala.org.au/ws/occurrences/search'
			//'byLocation': 'http://localhost:9292/biocache.ala.org.au/ws/occurrence/facets'
		};

	app.factory('api', function ($rootScope, $http) {
		return {
			fetch: function(loc, config, method) {
				if (loc.indexOf('singleSpecies') === 0) {
					var guid = loc.split('|')[1];
					loc = protocol + routes.singleSpecies;
					loc = loc.replace('{guid}', guid);
				} else {
					loc = protocol + routes[loc];
				}
				if (method === 'POST') {
					return $http.post(loc, config.data || {}, config);
				} else {
					return $http.get(loc, config);
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