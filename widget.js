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
			useMetrics : 'true'
		});

		cdcCommon.createEmbedCode(cdcCommon.getCallParam('wn'),['data-instance-name']);
                
                // LOAD CONTROLLERS
		cdcCommon.loadScript('./js/controllers.js', function(){
			cdcCommon.loadScript('./js/app.js', function(){
				// CALLBACK AFTER APP LOAD (IF NEEDED)
			});
		});

	};

} (window, document, jQuery));