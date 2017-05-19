(function(window, document, $, undefined) {

	window.CDC = window.CDC || {};
	window.CDC.Widget = window.CDC.Widget || {};
	window.CDC.Widget.load = function () {

		// ADD POINTER/SHORTCUT FOR COMMON
		window.cdcCommon = window.CDC.Widget.Common;

		// ADD POINTER/SHORTCUT FOR METRICS
		window.cdcMetrics = window.cdcCommon.metrics;

		// INIT METRICS
		cdcMetrics.init({
			c32 : "widget-134",
                        pageName: cdcCommon.getCallParam('instanceName') ? ('County Maps - ' + cdcCommon.getCallParam('instanceName')) : 'County Maps',
			useMetrics : 'true'
		});
                
                // LOAD CONTROLLERS
		cdcCommon.loadScript('./js/controllers.js', function(){
			cdcCommon.loadScript('./js/app.js', function(){
				// CALLBACK AFTER APP LOAD (IF NEEDED)
			});
		});

	};

} (window, document, jQuery));