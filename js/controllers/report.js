(function (app) {
	'use strict';
	app.controller('Report', function ($scope, $route, geolocation, fileReader, api) {
		var params = $route.current.params;

		$scope.form = {};
		if (params && params.name) {
			$scope.form.name = params.name;
		}
		$scope.getPos = function (){
			geolocation.getCurrentPosition(function (pos) {
				$scope.form.lat = Math.round(pos.coords.latitude  * 10000) / 10000;
				$scope.form.lon = Math.round(pos.coords.longitude * 10000) / 10000;
			});
		};
		$scope.getFile = function () {
			$scope.progress = 0;
			fileReader
				.readAsDataUrl($scope.file, $scope)
				.then(function (result) {
					$scope.form.imageSrc = result;
				});
		};

		$scope.submit = function () {
			api.send('report', {
				data: $scope.form
			});
		};

		$scope.getPos();
	});
}(angular.module('botanApp')));