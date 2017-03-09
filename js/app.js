var countyMapsApp = angular.module('countyMapsApp', ['countyMapsControllers']);

countyMapsApp.run(function($rootScope, $http) {
    angular.element(document.getElementById('tp-widget-share-code')).text(cdcCommon.runtime.embedCode);
});

countyMapsApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

angular.bootstrap(document.body, ['countyMapsApp']);