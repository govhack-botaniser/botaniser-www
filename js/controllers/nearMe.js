(function (app, specieMap) {
	'use strict';
	var minimum_prize = 5;
	app.controller('NearMe', function ($scope, geolocation, api) {

		function bulkSearch(species) {
			api.fetch('bulkSearch', {
					data : JSON.stringify({
						'names': species.reduce(function (arr, item){arr.push(item.label); return arr;}, [])
					}),
					headers : {'contentType': 'application/json'}
				},
				'POST'
			).success(function(data, status, headers, config) {
				data.forEach(function (item, index) {
					var specie = species[index];
					specie.thumbnail = item.thumbnail;
					specie.image     = item.image;
					specie.score     = item.score;
				});
			}).error(function(data, status, headers, config) {
				console.log('Error', arguments);
			});
		}

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
								item.prize = specieMap[item.label].prize || minimum_prize;
								res.push(item);
							}
							return res;
						}, []);
						species = species.sort(function (a, b) { //desc sort by prize
							if (a.prize > b.prize) {
								return -1;
							} else if (a.prize < b.prize) {
								return 1;
							}
							return 0;
						});

						$scope.species = species.splice(0, 10);
						bulkSearch($scope.species);
	    			}).error(function(data, status, headers, config) {
						console.log('Error', arguments);
					});
			} else {
				//not ready todo retry
			}
		};
	});
}(angular.module('botanApp'), specieMap));