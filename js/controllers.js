var countyMapsControllers = angular.module('countyMapsControllers', []);

countyMapsControllers.controller('mainCtrl', ['$rootScope', '$scope', '$window', function($rootScope, $scope, $window){
	angular.element($window).bind('resize', $rootScope.drawMaps);
}]);