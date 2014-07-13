(function (app, specieMap) {
	'use strict';

	app.controller('SpeciesDetailCtrl', function($scope, $route, api, geolocation) {
		// Initialise geo-location
		var params = $route.current.params,
			species = specieMap[params.speciesId];

		$scope.pos         = {};
		$scope.zoom        = 8;
		$scope.radius      = $route.current.params.radius || 10;
		$scope.name        = params.speciesId;
		$scope.occurrences = {};
		$scope.center      = {
			lat: 0,
			lng: 0,
			zoom: $scope.zoom
		};

		console.log(species.guid);

		api.fetch('singleSpecies|' + species.guid, {})
		.success(function(data, status, headers, config) {
			console.log(data);
			if (data.images && data.images.length) {
				$scope.image = data.images[0].largeImageUrl;
			}
			if (data.simpleProperties && data.simpleProperties.length) {
				$scope.description = data.simpleProperties[0].value;
			}
		}).error(function(data, status, headers, config) {
			console.log('Error', arguments);
		});

		$scope.refresh = function () {
			params = $route.current.params;
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
					console.log(data.occurrences);
					$scope.occurrences = data.occurrences.reduce(function (obj, marker, index) { //we stupidly need a hash map Object here
						obj['m' + index] = {
							lat: marker.decimalLatitude,
							lng: marker.decimalLongitude,
							message: marker.collectionName,
							draggable: false
						};
						return obj;
					}, {});
					console.log($scope.occurrences);
				}).error(function(data, status, headers, config) {
					console.log('Error', arguments);
				});
			} else {
				//not ready todo retry
			}
		};

		geolocation.getCurrentPosition(function(pos) {
			$scope.pos = pos;
			$scope.center = {
				lat: $scope.pos.coords.latitude,
				lng: $scope.pos.coords.longitude,
				zoom: $scope.zoom
			};
			$scope.refresh();
		});

	});
}(angular.module('botanApp'), specieMap));