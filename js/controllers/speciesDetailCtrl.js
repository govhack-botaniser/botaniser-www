(function (app, specieMap) {
	'use strict';

	app.controller('SpeciesDetailCtrl', function($scope, $route, api, geolocation) {
		// Initialise geo-location
		$scope.pos = {};
		$scope.radius = $route.current.params.radius || 10;
		$scope.occurrences = [];

		$scope.map = L.mapbox.map('map', 'chid.map-coyyfgk8', {
			attributionControl: false,
			zoomControl: false
		});

		$scope.refresh = function () {
			var params = $route.current.params,
				species = specieMap[params.speciesId];

			if ($scope.pos.coords) {
				api.fetch('specieDetail', {
					params: {
						'fq': 'species_guid:' + species.guid,
						'pageSize': 100,
						'flimit'  : 0,
						//'sort'  : 'count',
						'radius': $scope.radius,
						'lat'   : $scope.pos.coords.latitude,
						'lon'   : $scope.pos.coords.longitude,
						'facets': 'taxon_name'
					}
				}).success(function(data, status, headers, config) {
					$scope.occurrences = data.occurrences;
					debugger;
					var a = L.featureGroup($scope.occurrences);
					    a.bindPopup('Hello world!');
					    a.addTo($scope.map);
				}).error(function(data, status, headers, config) {
					console.log('Error', arguments);
				});
			} else {
				//not ready todo retry
			}
		};

		geolocation.getCurrentPosition(function(pos) {
			$scope.pos = pos;
			$scope.refresh();
		});

	});
}(angular.module('botanApp'), specieMap));