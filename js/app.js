var countyMapsApp = angular.module('countyMapsApp', ['countyMapsControllers']);

countyMapsApp.run(function($rootScope, $http) {
    $rootScope.loading = true;
    $rootScope.states = {"Delaware":{"code":"10","lat":39.1498,"long":-75.5148,"scale":7000,"abbrev":"DE"},"Florida":{"code":"12","lat":27.8333,"long":-83.917,"scale":1700,"abbrev":"FL"},"Georgia":{"code":"13","lat":32.9866,"long":-83.6487,"scale":2700,"abbrev":"GA"},"Hawaii":{"code":"15","lat":21.1098,"long":-157.5311,"scale":2000,"abbrev":"HI"},"Idaho":{"code":"16","lat":45.7394,"long":-114.5103,"scale":1300,"abbrev":"ID"},"Illinois":{"code":"17","lat":39.8363,"long":-89.0022,"scale":2000,"abbrev":"IL"},"Indiana":{"code":"18","lat":39.8647,"long":-86.2604,"scale":2700,"abbrev":"IN"},"Iowa":{"code":"19","lat":42.0046,"long":-93.214,"scale":2100,"abbrev":"IA"},"Kansas":{"code":"20","lat":38.5111,"long":-98.3005,"scale":1800,"abbrev":"KS"},"Kentucky":{"code":"21","lat":37.669,"long":-85.6514,"scale":2000,"abbrev":"KY"},"Louisiana":{"code":"22","lat":31.1801,"long":-91.8749,"scale":2300,"abbrev":"LA"},"Maine":{"code":"23","lat":45.3074,"long":-69.3977,"scale":2500,"abbrev":"ME"},"Maryland":{"code":"24","lat":39.0724,"long":-77.4902,"scale":2700,"abbrev":"MD"},"Massachusetts":{"code":"25","lat":42.2373,"long":-71.5314,"scale":2700,"abbrev":"MA"},"Michigan":{"code":"26","lat":43.3504,"long":-84.5603,"scale":1300,"abbrev":"MI"},"Minnesota":{"code":"27","lat":46.7326,"long":-93.9196,"scale":1600,"abbrev":"MN"},"Mississippi":{"code":"28","lat":32.7673,"long":-89.6812,"scale":2700,"abbrev":"MS"},"Missouri":{"code":"29","lat":38.4623,"long":-92.302,"scale":2000,"abbrev":"MO"},"Montana":{"code":"30","lat":46.9048,"long":-110.3261,"scale":1100,"abbrev":"MT"},"Nebraska":{"code":"31","lat":41.1289,"long":-99.7883,"scale":1600,"abbrev":"NE"},"Nevada":{"code":"32","lat":38.4199,"long":-117.1219,"scale":1300,"abbrev":"NV"},"New Hampshire":{"code":"33","lat":43.9108,"long":-71.5653,"scale":3700,"abbrev":"NH"},"New Jersey":{"code":"34","lat":40.314,"long":-74.5089,"scale":4000,"abbrev":"NJ"},"New Mexico":{"code":"35","lat":34.8375,"long":-106.2371,"scale":2000,"abbrev":"NM"},"New York":{"code":"36","lat":43.1497,"long":-75.9384,"scale":2000,"abbrev":"NY"},"North Carolina":{"code":"37","lat":35.6411,"long":-79.8431,"scale":1600,"abbrev":"NC"},"North Dakota":{"code":"38","lat":47.5362,"long":-100.393,"scale":2000,"abbrev":"ND"},"Ohio":{"code":"39","lat":40.3736,"long":-82.7755,"scale":2700,"abbrev":"OH"},"Oklahoma":{"code":"40","lat":35.5376,"long":-98.9247,"scale":1600,"abbrev":"OK"},"Oregon":{"code":"41","lat":43.5672,"long":-121.1269,"scale":1600,"abbrev":"OR"},"Pennsylvania":{"code":"42","lat":40.5773,"long":-77.264,"scale":2000,"abbrev":"PA"},"Rhode Island":{"code":"44","lat":41.6772,"long":-71.5101,"scale":7000,"abbrev":"RI"},"South Carolina":{"code":"45","lat":33.8191,"long":-80.9066,"scale":2000,"abbrev":"SC"},"South Dakota":{"code":"46","lat":44.2853,"long":-100.4632,"scale":2000,"abbrev":"SD"},"Tennessee":{"code":"47","lat":35.7449,"long":-85.7489,"scale":1700,"abbrev":"TN"},"Texas":{"code":"48","lat":31.106,"long":-99.9475,"scale":1000,"abbrev":"TX"},"Utah":{"code":"49","lat":39.1135,"long":-111.8535,"scale":2000,"abbrev":"UT"},"Vermont":{"code":"50","lat":44.0407,"long":-72.7093,"scale":3700,"abbrev":"VT"},"Virginia":{"code":"51","lat":37.768,"long":-79.2057,"scale":1800,"abbrev":"VA"},"Washington":{"code":"53","lat":47.3917,"long":-120.5708,"scale":1900,"abbrev":"WA"},"West Virginia":{"code":"54","lat":38.968,"long":-80.4696,"scale":2700,"abbrev":"WV"},"Wisconsin":{"code":"55","lat":44.7563,"long":-89.9385,"scale":2400,"abbrev":"WI"},"Wyoming":{"code":"56","lat":42.7475,"long":-107.2085,"scale":1800,"abbrev":"WY"},"Alabama":{"code":"01","lat":32.799,"long":-86.8073,"scale":2700,"abbrev":"AL"},"Alaska":{"code":"02","lat":61.385,"long":-152.2683,"scale":300,"abbrev":"AK"},"Arizona":{"code":"04","lat":33.7712,"long":-111.3877,"scale":1800,"abbrev":"AZ"},"Arkansas":{"code":"05","lat":34.9513,"long":-92.3809,"scale":2700,"abbrev":"AR"},"California":{"code":"06","lat":36.17,"long":-119.7462,"scale":1000,"abbrev":"CA"},"Colorado":{"code":"08","lat":39.0646,"long":-105.3272,"scale":1800,"abbrev":"CO"},"Connecticut":{"code":"09","lat":41.5834,"long":-72.7622,"scale":7000,"abbrev":"CT"}};
    var instanceName = cdcCommon.getCallParam('instanceName');

    if (!instanceName) {
        $rootScope.error = true;
        $rootScope.loading = false;
    } else {
        $http.get('instances/' + instanceName + '.json').then(
                function(response) {
                    $rootScope.instance = response.data;
                    $rootScope.instance.data = {};
                    $rootScope.instance.currentInputs = {};
                    $rootScope.instance.currentValues = {};
                    $rootScope.instance.pendingCallbacks = 0;

                    $rootScope.instance.currentInputs.disease = Object.keys($rootScope.instance.datasets)[0];
                    $rootScope.instance.currentInputs.state = 'Alabama'; //TODO read from query string
                    $rootScope.instance.currentInputs.filters = {};
                    for (filter in $rootScope.instance.filters) {
                        $rootScope.instance.currentInputs.filters[filter] = Object.keys($rootScope.instance.filters[filter].values)[0];
                    }

                    $http.get('data/counties.json').then(
                            function(response) {
                                $rootScope.mapData = response.data;
                                $rootScope.geometries = {};
                                $rootScope.geometries['us'] = response.data.objects.cb_2015_us_county_500k.geometries;
                                for (stateName in $rootScope.states) {
                                    $rootScope.geometries[stateName] = ($.grep(response.data.objects.cb_2015_us_county_500k.geometries, function(el) {
                                        return el.properties.state === $rootScope.states[stateName].code;
                                    }));
                                }
                                if ($rootScope.instance.pendingCallbacks === 0) {
                                    $rootScope.init();
                                }
                            },
                            function(error) {
                                console.log(error);
                                $rootScope.loading = false;
                                $rootScope.error = true;
                            }
                    );

                    for (datasetName in $rootScope.instance.datasets) {
                        if (!$rootScope.instance.datasets[datasetName]['county']) {
                            console.log('must provide county dataset');
                            break;
                        }

                        if ($rootScope.instance.datasets[datasetName]['state']) {
                            $rootScope.getDataset($rootScope.instance.datasets[datasetName]['state'].url, datasetName, 'state');
                            $rootScope.getDataset($rootScope.instance.datasets[datasetName]['county'].url, datasetName, 'county');
                        } else {
                            $rootScope.getDataset($rootScope.instance.datasets[datasetName]['county'].url, datasetName, 'both');
                        }
                    }
                },
                function(error) {
                    console.log(error);
                    $rootScope.error = true;
                    $rootScope.loading = false;
                }
        );
    }

    $rootScope.getDataset = function(datasetUrl, datasetName, datasetType) {
        $rootScope.instance.pendingCallbacks++;
        $http.get(datasetUrl).then(
                function(response) {
                    if(!$rootScope.instance.data[datasetName]){
                        $rootScope.instance.data[datasetName] = {};
                    }
                    if (datasetType === 'both') {
                        $rootScope.instance.data[datasetName]['state'] = response.data;
                        $rootScope.instance.data[datasetName]['county'] = response.data;
                    } else {
                        $rootScope.instance.data[datasetName][datasetType] = response.data;
                    }

                    $rootScope.instance.pendingCallbacks--;
                    if ($rootScope.instance.pendingCallbacks === 0 && $rootScope.geometries) {
                        $rootScope.init();
                    }
                }, function(error) {
            console.log(error);
            $rootScope.instance.pendingCallbacks--;
            if ($rootScope.instance.pendingCallbacks === 0 && $rootScope.geometries) {
                $rootScope.init();
            }
        }
        );
    };

    $rootScope.init = function() {
        console.log($rootScope.instance.data);
        $rootScope.updateData();

    };

    $rootScope.updateData = function() {
        var state, matchesFilter, matchesNoFilter;
        $rootScope.instance.data[$rootScope.instance.currentInputs.disease].state.forEach(
            function(datapoint){
                state = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.stateColumn].toLowerCase();
                
                if(state === 'us' || state === 'united states'){
                    matchesFilter = true;
                    matchesNoFilter = true;
                    for(filter in $rootScope.instance.filters){
                        if(datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter].noFilter){
                            matchesNoFilter = false;
                        } else if(datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter][$rootScope.instance.currentInputs[filter]]){
                            matchesFilter = false;
                        }
                    }
                    if(matchesNoFilter){
                        $rootScope.instance.currentValues.us = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.dataColumn];
                    }
                    if(matchesFilter){
                        $rootScope.instance.currentValues.usFiltered = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.dataColumn];
                    }
                }
                
                
            }
        );

        $rootScope.instance.data[$rootScope.instance.currentInputs.disease].county.forEach(
            function(datapoint){
                state = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].county.stateColumn].toLowerCase();
                if(state === $rootScope.instance.currentInputs.state.toLowerCase() || state === $rootScope.states[$rootScope.instance.currentInputs.state].abbrev.toLowerCase()){
                    matchesFilter = true;
                    matchesNoFilter = true;
                    for(filter in $rootScope.instance.filters){
                        if(datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter].noFilter){
                            matchesNoFilter = false;
                        } else if(datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter][$rootScope.instance.currentInputs[filter]]){
                            matchesFilter = false;
                        }
                    }
                    if(matchesNoFilter){
                        $rootScope.instance.currentValues.state = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.dataColumn];
                    }
                    if(matchesFilter){
                        console.log(datapoint);
                        $rootScope.instance.currentValues.stateFiltered = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.dataColumn];
                    }
                }
                
                
            }
        );

        $rootScope.drawMaps();
    };

    $rootScope.drawMaps = function() {
        //TODO rewrite for angular
        $('#us-map-container').empty();

        if ($('#us-map-container').width() < 465) {
            $('#us-map-container').height($('#us-map-container').width() * .7);
        } else {
            $('#us-map-container').height(275);
        }

        $rootScope.usMap = new Datamap({
            scope: 'usa',
            element: document.getElementById('us-map-container'),
            geographyConfig: {
                highlightBorderWidth: 5,
                popupTemplate: function(geo) {
                    return '<div class="hoverinfo">' +
                            '<h3>' + geo.properties.name + '</h3>' +
                            '<p class="popup-rate">State Rate: TODO</p>' +
                            '</div>';
                }
            },
            setProjection: function(element) {
                var projection = d3.geo.albers()
                        .scale($('#us-map-container').width() < 465 ? $('#us-map-container').width() / 465 * 600 : 600) // TODO rewrite to angular
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                path = d3.geo.path()
                        .projection(projection);

                return {path: path, projection: projection};
            }
        });

        // TODO draw us legend
        
        var state = $rootScope.states[$rootScope.instance.currentInputs.state];
        
        $('#state-map-container').empty(); // TODO rewrite in angular

        $rootScope.mapData.objects.cb_2015_us_county_500k.geometries = $rootScope.geometries[$rootScope.instance.currentInputs.state];

        $rootScope.stateMap = new Datamap({
            element: document.getElementById('state-map-container'),
            geographyConfig: {
                dataJson: $rootScope.mapData,
                highlightBorderWidth: 5,
                popupTemplate: function(geo) {
                    return '<div class="hoverinfo">' +
                            '<h3>' + geo.properties.name + '</h3>' +
                            '<p class="popup-rate">County Rate: TODO</p>' +
                            '</div>';
                }
            },
            scope: 'cb_2015_us_county_500k',
            setProjection: function(element) {
                var projection = d3.geo.mercator()
                        .center([state.long, state.lat])
                        .scale(state.scale)
                        .translate([(element.offsetWidth / 2), (element.offsetHeight / 2)]);

                path = d3.geo.path()
                        .projection(projection);

                return {path: path, projection: projection};
            }
        });

        // TODO draw statelegend
    };

    //https://t.cdc.gov/api/v2/resources/data/kztq-p2jf?appkey=5ZPXABI9
    //
    //https://chronicdata.cdc.gov/resource/sjad-c2fj.json?$$app_token=IgJZnWf9KtwcLeOvqC1LuIGCu


});

angular.bootstrap(document.body, ['countyMapsApp']);