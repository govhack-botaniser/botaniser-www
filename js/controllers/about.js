'use strict';

/**
 * @ngdoc function
 * @name wwwApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the wwwApp
 */
angular.module('botanApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
