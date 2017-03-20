var countyMapsApp = angular.module('countyMapsApp', ['countyMapsControllers']);

countyMapsApp.run(function($rootScope, $http) {
    angular.element(document.getElementById('tp-widget-share-code')).text(cdcCommon.runtime.embedCode);
});

countyMapsApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [], floatCompare = true;
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    if(field === 'location' || field === 'state'){
        floatCompare = false;
    }
    filtered.sort(function (a, b) {
      if(floatCompare){
          return ((a[field] === undefined ? -1 : parseFloat(a[field])) > (b[field] === undefined ? -1 : parseFloat(b[field])) ? 1 : -1);
      } else {
          return (a[field] > b[field] ? 1 : -1);
      }
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});

angular.bootstrap(document.body, ['countyMapsApp']);