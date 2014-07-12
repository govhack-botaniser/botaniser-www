(function (app) {
	'use strict';
	app.controller('Report', function ($scope, geolocation, fileReader) {
		$scope.form = {};
		$scope.getPos = function (){
			geolocation.getCurrentPosition(function (pos) {
				$scope.form.lat = pos.coords.latitude;
				$scope.form.lon = pos.coords.longitude;
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
	});
}(angular.module('botanApp')));