var countyMapsApp = angular.module('countyMapsApp', ['countyMapsControllers']);

countyMapsApp.run(function($rootScope, $http) {
    angular.element(document.getElementById('tp-widget-share-code')).text(cdcCommon.runtime.embedCode);
});

angular.bootstrap(document.body, ['countyMapsApp']);