var countyMapsControllers = angular.module('countyMapsControllers', []);

countyMapsControllers.controller('mainCtrl', ['$rootScope', '$scope', '$window', function($rootScope, $scope, $window){
	angular.element($window).bind('resize', $rootScope.drawMaps);
        
        //function called when a terrirory bubble is moused over, displays popup same as the states
        //parameters are the territory code, territory name to display, and a boolean indicating whether the mouse event was mousein or mouseout
        $scope.territoryHover = function(territoryCode, territoryName, mouseIn){
            var $el = $('#us-map-container .datamaps-hoverover');
            if(mouseIn){
                var data = $rootScope.instance.currentValues.usMapData[territoryCode];
                $el.html('<div class="hoverinfo">' +
                                '<h3>' + territoryName + '</h3>' +
                                '<p class="popup-rate">Total Pop: ' + (data && data.data ? $rootScope.normalizeNumber(data.data) : 'Insufficient Data') + '</p>' +
                                ($rootScope.instance.currentValues.filterString.length > 0 ? ('<p class="popup-rate">' + $rootScope.instance.currentValues.filterString + ': ' + (data && data.dataFiltered ? data.dataFiltered : 'Insufficient Data') + '</p>') : '') + 
                            '</div>');
                $el.css({
                    display: 'block',
                    top: 'auto',
                    bottom: '0',
                    left: '45%'
                });
            } else {
                $el.css({
                    display: 'none',
                    bottom: 'auto'
                });
            }
        };
        
        //function is called when data table is toggled, either displays or collapses table and announces for accessibility
        //parameter isStateTable is a boolean indicating whether the state or county table was toggled
        $scope.dataTableToggle = function(isStateTable){
            if(isStateTable){
                $scope.showStateTable = !$scope.showStateTable;
                $rootScope.instance.currentValues.accessibilityText = 'Data Table ' + ($scope.showStateTable ? 'Displayed' : 'Collapsed');
            } else {
                $scope.showCountyTable = !$scope.showCountyTable;
                $rootScope.instance.currentValues.accessibilityText = 'Data Table ' + ($scope.showCountyTable ? 'Displayed' : 'Collapsed');
            }
        };
}]);