(function (app) {
	'use strict';
	app.controller('NearMe', function ($scope, geolocation, api) {
		$scope.pos = {};
		$scope.radius = 2;
		$scope.species = [];
		geolocation.getCurrentPosition(function (pos) {
			$scope.pos = pos;
			$scope.refresh();
		});

		$scope.refresh = function () {
			if ($scope.pos.coords) {
				api.fetch('byLocation', {
					params: {
							'fq': 'kingdom:Plantae',
							'pageSize': 0,
							'flimit'  : 2000,
							//'sort'  : 'count',
							'radius': $scope.radius,
							'lat'   : $scope.pos.coords.latitude,
							'lon'   : $scope.pos.coords.longitude,
							'facets': 'taxon_name'
						}
					}).success(function(data, status, headers, config) {
						var results = data.facetResults[0].fieldResult;
						var species = results.reduce(function (res, item){
							if (item.count < 100 && specieMap[item.label] && specieMap[item.label].occurrenceCount < 100) {
								item.totalCount = specieMap[item.label].occurrenceCount;
								res.push(item);
							}
							return res;
						}, []);
						species = species.sort(function (a, b) {
							if (a.totalCount < b.totalCount) {
								return -1;
							} else if (a.totalCount > b.totalCount) {
								return 1;
							}
							return 0;
						});

						$scope.species = species.splice(0, 20);
	    			}).error(function(data, status, headers, config) {
						console.log('Error', arguments);
					});
			} else {
				//not ready todo retry
			}
		};
	});
}(angular.module('botanApp')));