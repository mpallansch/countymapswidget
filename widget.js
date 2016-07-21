(function(window, document, $, undefined) {

	window.CDC = window.CDC || {};
	window.CDC.Widget = window.CDC.Widget || {};
	window.CDC.Widget.load = function () {

		// ADD POINTER/SHORTCUT FOR COMMON
		window.cdcCommon = window.CDC.Widget.Common;

		// ADD POINTER/SHORTCUT FOR METRICS
		window.cdcMetrics = window.cdcCommon.metrics;

		var callParams = window.cdcCommon.runtime.callParams;

		// New Addtions
		var strCallingPageUrl = window.cdcCommon.getCallParam('chost') + window.cdcCommon.getCallParam('cpath') + window.cdcCommon.getCallParam('csearch');
		// YOUR VAR NAME = CALLING PAGE HOST + CALLING PAGE PATH

		var strCallingHost = window.cdcCommon.getCallParam('chost');

		var strCallingPageTitle = window.cdcCommon.getCallParam('ctitle');
		// YOUR VAR NAME = CALLING PAGE TITLE


		// SET YOUR EMBED CODE HERE (INT PRE FORMAT [&gt;] instead of [>] etc.)
		cdcCommon.events.setEmbedCode('&lt;div data-cdc-widget="sampleIframe"&gt;&lt;/div&gt;\n&lt;script src="https://tools.cdc.gov/1M1B"&gt;&lt;/script&gt;');

		// INIT METRICS
		cdcMetrics.init({
			useMetrics : 'false'
		});
                
                // LOAD CONTROLLERS
		cdcCommon.loadScript('./js/controllers.js', function(){
			cdcCommon.loadScript('./js/app.js', function(){
				// CALLBACK AFTER APP LOAD (IF NEEDED)
			});
		});

	};

} (window, document, jQuery));