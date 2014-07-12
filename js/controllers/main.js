'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wwwApp
 */
angular.module('botanApp')
  .controller('MainCtrl', function ($scope, geolocation) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.pos = {};
    geolocation.getCurrentPosition(function (pos) {
    	$scope.pos = pos;
    	console.log(pos);
    });
  });
