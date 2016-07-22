var countyMapsApp = angular.module('countyMapsApp', ['countyMapsControllers']);

countyMapsApp.run(function($rootScope, $http) {
    $rootScope.loading = true;
    $rootScope.states = {"Delaware":{"code":"10","lat":39.1498,"long":-75.5148,"scale":7000,"abbrev":"DE"},"Florida":{"code":"12","lat":27.8333,"long":-83.917,"scale":1700,"abbrev":"FL"},"Georgia":{"code":"13","lat":32.9866,"long":-83.6487,"scale":2700,"abbrev":"GA"},"Hawaii":{"code":"15","lat":21.1098,"long":-157.5311,"scale":2000,"abbrev":"HI"},"Idaho":{"code":"16","lat":45.7394,"long":-114.5103,"scale":1300,"abbrev":"ID"},"Illinois":{"code":"17","lat":39.8363,"long":-89.0022,"scale":2000,"abbrev":"IL"},"Indiana":{"code":"18","lat":39.8647,"long":-86.2604,"scale":2700,"abbrev":"IN"},"Iowa":{"code":"19","lat":42.0046,"long":-93.214,"scale":2100,"abbrev":"IA"},"Kansas":{"code":"20","lat":38.5111,"long":-98.3005,"scale":1800,"abbrev":"KS"},"Kentucky":{"code":"21","lat":37.669,"long":-85.6514,"scale":2000,"abbrev":"KY"},"Louisiana":{"code":"22","lat":31.1801,"long":-91.8749,"scale":2300,"abbrev":"LA"},"Maine":{"code":"23","lat":45.3074,"long":-69.3977,"scale":2500,"abbrev":"ME"},"Maryland":{"code":"24","lat":39.0724,"long":-77.4902,"scale":2700,"abbrev":"MD"},"Massachusetts":{"code":"25","lat":42.2373,"long":-71.5314,"scale":2700,"abbrev":"MA"},"Michigan":{"code":"26","lat":43.3504,"long":-84.5603,"scale":1300,"abbrev":"MI"},"Minnesota":{"code":"27","lat":46.7326,"long":-93.9196,"scale":1600,"abbrev":"MN"},"Mississippi":{"code":"28","lat":32.7673,"long":-89.6812,"scale":2700,"abbrev":"MS"},"Missouri":{"code":"29","lat":38.4623,"long":-92.302,"scale":2000,"abbrev":"MO"},"Montana":{"code":"30","lat":46.9048,"long":-110.3261,"scale":1100,"abbrev":"MT"},"Nebraska":{"code":"31","lat":41.1289,"long":-99.7883,"scale":1600,"abbrev":"NE"},"Nevada":{"code":"32","lat":38.4199,"long":-117.1219,"scale":1300,"abbrev":"NV"},"New Hampshire":{"code":"33","lat":43.9108,"long":-71.5653,"scale":3700,"abbrev":"NH"},"New Jersey":{"code":"34","lat":40.314,"long":-74.5089,"scale":4000,"abbrev":"NJ"},"New Mexico":{"code":"35","lat":34.8375,"long":-106.2371,"scale":2000,"abbrev":"NM"},"New York":{"code":"36","lat":43.1497,"long":-75.9384,"scale":2000,"abbrev":"NY"},"North Carolina":{"code":"37","lat":35.6411,"long":-79.8431,"scale":1600,"abbrev":"NC"},"North Dakota":{"code":"38","lat":47.5362,"long":-100.393,"scale":2000,"abbrev":"ND"},"Ohio":{"code":"39","lat":40.3736,"long":-82.7755,"scale":2700,"abbrev":"OH"},"Oklahoma":{"code":"40","lat":35.5376,"long":-98.9247,"scale":1600,"abbrev":"OK"},"Oregon":{"code":"41","lat":43.5672,"long":-121.1269,"scale":1600,"abbrev":"OR"},"Pennsylvania":{"code":"42","lat":40.5773,"long":-77.264,"scale":2000,"abbrev":"PA"},"Rhode Island":{"code":"44","lat":41.6772,"long":-71.5101,"scale":7000,"abbrev":"RI"},"South Carolina":{"code":"45","lat":33.8191,"long":-80.9066,"scale":2000,"abbrev":"SC"},"South Dakota":{"code":"46","lat":44.2853,"long":-100.4632,"scale":2000,"abbrev":"SD"},"Tennessee":{"code":"47","lat":35.7449,"long":-85.7489,"scale":1700,"abbrev":"TN"},"Texas":{"code":"48","lat":31.106,"long":-99.9475,"scale":1000,"abbrev":"TX"},"Utah":{"code":"49","lat":39.1135,"long":-111.8535,"scale":2000,"abbrev":"UT"},"Vermont":{"code":"50","lat":44.0407,"long":-72.7093,"scale":3700,"abbrev":"VT"},"Virginia":{"code":"51","lat":37.768,"long":-79.2057,"scale":1800,"abbrev":"VA"},"Washington":{"code":"53","lat":47.3917,"long":-120.5708,"scale":1900,"abbrev":"WA"},"West Virginia":{"code":"54","lat":38.968,"long":-80.4696,"scale":2700,"abbrev":"WV"},"Wisconsin":{"code":"55","lat":44.7563,"long":-89.9385,"scale":2400,"abbrev":"WI"},"Wyoming":{"code":"56","lat":42.7475,"long":-107.2085,"scale":1800,"abbrev":"WY"},"Alabama":{"code":"01","lat":32.799,"long":-86.8073,"scale":2700,"abbrev":"AL"},"Alaska":{"code":"02","lat":61.385,"long":-152.2683,"scale":300,"abbrev":"AK"},"Arizona":{"code":"04","lat":33.7712,"long":-111.3877,"scale":1800,"abbrev":"AZ"},"Arkansas":{"code":"05","lat":34.9513,"long":-92.3809,"scale":2700,"abbrev":"AR"},"California":{"code":"06","lat":36.17,"long":-119.7462,"scale":1000,"abbrev":"CA"},"Colorado":{"code":"08","lat":39.0646,"long":-105.3272,"scale":1800,"abbrev":"CO"},"Connecticut":{"code":"09","lat":41.5834,"long":-72.7622,"scale":7000,"abbrev":"CT"}};
    console.log($rootScope.states);
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
                    $rootScope.instance.currentInputs.state = cdcCommon.getCallParam('defaultState') ? cdcCommon.getCallParam('defaultState') : 'Alabama';
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
                        if (!$rootScope.instance.datasets[datasetName]['county'] || !$rootScope.instance.datasets[datasetName]['state']) {
                            console.log('must provide both state and county datasets');
                            break;
                        }

                        $rootScope.getDataset($rootScope.instance.datasets[datasetName]['state'].url, datasetName, 'state');
                        $rootScope.getDataset($rootScope.instance.datasets[datasetName]['county'].url, datasetName, 'county');
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
        var state, county;
        for(dataset in $rootScope.instance.data){
            $rootScope.instance.data[dataset].noFilter = {};
            
            $rootScope.instance.data[dataset].state.forEach(
                function(datapoint){
                    state = datapoint[$rootScope.instance.datasets[dataset].state.stateColumn];
                    for(st in $rootScope.states){
                        if(state.toLowerCase() === st.toLowerCase() || state.toLowerCase() === $rootScope.states[st].abbrev.toLowerCase()){
                            datapoint[$rootScope.instance.datasets[dataset].state.stateColumn] = $rootScope.states[st].abbrev;
                        }
                    }
                    
                    if($rootScope.matchesFilter(datapoint, true)){
                        $rootScope.instance.data[dataset].noFilter[datapoint[$rootScope.instance.datasets[dataset].state.stateColumn]] = datapoint[$rootScope.instance.datasets[dataset].state.dataColumn];
                    }
                }
            );
            
            $rootScope.instance.data[dataset].county.forEach(
                function(datapoint){
                    county = datapoint[$rootScope.instance.datasets[dataset].county.countyColumn];
                    county = county.replace(/-/g, '').replace(/county/gi, '');
                    for(state in $rootScope.states){
                        county = county.replace(new RegExp($rootScope.states[state].abbrev, 'g'), '');
                    };
                    county = county.trim();
                    datapoint[$rootScope.instance.datasets[dataset].county.countyColumn] = county;
                    
                    if($rootScope.matchesFilter(datapoint, true)){
                        $rootScope.instance.data[dataset].noFilter[datapoint[$rootScope.instance.datasets[dataset].county.countyColumn]] = datapoint[$rootScope.instance.datasets[dataset].county.dataColumn];
                    }
                }
            );
        }
        
        $rootScope.updateData();

    };

    $rootScope.updateData = function() {
        $rootScope.loading = true;
        $rootScope.instance.currentValues.usMapData = {};
        $rootScope.instance.currentValues.stateMapData = {};
        
        $rootScope.instance.currentValues.us = $rootScope.instance.data[$rootScope.instance.currentInputs.disease].noFilter['US'];
        $rootScope.instance.currentValues.state = $rootScope.instance.data[$rootScope.instance.currentInputs.disease].noFilter[$rootScope.states[$rootScope.instance.currentInputs.state].abbrev];
        
        var state, county, value, paletteScale, 
                stateColumn = $rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.stateColumn,
                dataColumn = $rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].state.dataColumn;
        
        paletteScale = d3.scale.linear()
            .domain($rootScope.minMax('state'))
            .range(["#EFEFFF", $rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].color]);
        
        $rootScope.instance.data[$rootScope.instance.currentInputs.disease].state.forEach(
            function(datapoint){
                state = datapoint[stateColumn];
                value = datapoint[dataColumn];
                if(state.toLowerCase() === 'us' || state.toLowerCase() === 'united states'){
                    if($rootScope.matchesFilter(datapoint)){
                        $rootScope.instance.currentValues.usFiltered = value;
                    }
                } else {
                    if($rootScope.isCurrentState(state)){
                        if($rootScope.matchesFilter(datapoint)){
                            $rootScope.instance.currentValues.stateFiltered = value;
                        }
                    }
                    if($rootScope.matchesFilter(datapoint)){
                        $rootScope.instance.currentValues.usMapData[state] = {
                            data: $rootScope.instance.data[$rootScope.instance.currentInputs.disease].noFilter[state],
                            dataFiltered: value,
                            fillColor: value ? paletteScale(value) : 'gray'
                        };
                    }
                }
                
                
            }
        );

        paletteScale = d3.scale.linear()
            .domain($rootScope.minMax('county'))
            .range(["#EFEFFF",$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].color]);

        $rootScope.instance.data[$rootScope.instance.currentInputs.disease].county.forEach(
            function(datapoint){
                state = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].county.stateColumn].toLowerCase();
                county = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].county.countyColumn];
                if($rootScope.isCurrentState(state)){
                    if($rootScope.matchesFilter(datapoint)){
                        value = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease].county.dataColumn];
                        $rootScope.instance.currentValues.stateMapData[county] = {
                            data: $rootScope.instance.data[$rootScope.instance.currentInputs.disease].noFilter[county], 
                            dataFiltered: value,
                            fillColor: value ? paletteScale(value) : 'gray'
                        };
                    }
                } 
            }
        );

        $rootScope.drawMaps();
        $rootScope.loading = false;
    };
    
    $rootScope.minMax = function(type){
        var state, value, min = Number.MAX_VALUE, max = Number.MIN_VALUE;
        $rootScope.instance.data[$rootScope.instance.currentInputs.disease][type].forEach(
            function(datapoint){
                state = datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease][type].stateColumn].toLowerCase();
                value = parseInt(datapoint[$rootScope.instance.datasets[$rootScope.instance.currentInputs.disease][type].dataColumn]);
                if(type === 'state' || $rootScope.isCurrentState(state)){
                    if($rootScope.matchesFilter(datapoint)){
                        if(value < min){
                            min = value;
                        } 
                        if(value > max){
                            max = value;
                        }
                    }
                }
            }
        );
        return [min, max];
    };
    
    $rootScope.isCurrentState = function(state){
        return (state.toLowerCase() === $rootScope.instance.currentInputs.state.toLowerCase() || state.toLowerCase() === $rootScope.states[$rootScope.instance.currentInputs.state].abbrev.toLowerCase());
    };
    
    $rootScope.matchesFilter = function(datapoint, noFilters){
        for(filter in $rootScope.instance.filters){
            if(noFilters && datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter].noFilter){
                return false;
            } else if(!noFilters && datapoint[$rootScope.instance.filters[filter].column] !== $rootScope.instance.filters[filter].values[$rootScope.instance.currentInputs.filters[filter]]){
                return false;
            }
        }
        return true;
    };

    $rootScope.drawMaps = function() {
        if(!$rootScope.mapData || !$rootScope.instance || !$rootScope.instance.data){
            return;
        }
        
        var usMapContainer = $('#us-map-container');
        usMapContainer.empty();

        if (usMapContainer.width() < 465) {
            usMapContainer.height(usMapContainer.width() * .7);
        } else {
            usMapContainer.height(275);
        }

        $rootScope.usMap = new Datamap({
            scope: 'usa',
            element: usMapContainer[0],
            geographyConfig: {
                highlightBorderWidth: 5,
                popupTemplate: function(geo, data) {
                    return '<div class="hoverinfo">' +
                                '<h3>' + geo.properties.name + '</h3>' +
                                '<p class="popup-rate">Total: ' + (data && data.data ? data.data : 'No Data') + '</p>' +
                                '<p class="popup-rate">Filtered: ' + (data && data.dataFiltered ? data.dataFiltered : 'No Data') + '</p>' + 
                            '</div>';
                }
            },
            setProjection: function(element) {
                var projection = d3.geo.albers()
                        .scale($(element).width() < 465 ? $(element).width() / 465 * 600 : 600)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                path = d3.geo.path()
                        .projection(projection);

                return {path: path, projection: projection};
            },
            fills: {
                defaultFill: 'gray'
            },
            data: $rootScope.instance.currentValues.usMapData
        });
        
        var state = $rootScope.states[$rootScope.instance.currentInputs.state];
        
        $('#state-map-container').empty(); 

        $rootScope.mapData.objects.cb_2015_us_county_500k.geometries = $rootScope.geometries[$rootScope.instance.currentInputs.state];

        $rootScope.stateMap = new Datamap({
            element: document.getElementById('state-map-container'),
            geographyConfig: {
                dataJson: $rootScope.mapData,
                highlightBorderWidth: 5,
                popupTemplate: function(geo, data) {
                    return '<div class="hoverinfo">' +
                                '<h3>' + geo.properties.name + '</h3>' +
                                '<p class="popup-rate">' + (data && data.data ? data.data : 'No Data') + '</p>' +
                                '<p class="popup-rate">Filtered: ' + (data && data.dataFiltered ? data.dataFiltered : 'No Data') + '</p>' + 
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
            },
            fills: {
                defaultFill: 'gray'
            },
            data: $rootScope.instance.currentValues.stateMapData
        });
    };

    //Heart Disease State Dev: /widgets/heartdiseaseandstroke/heartdiseasestatedata.json
    //Heart Disease State Live: 
    //Heart Disease County Dev: https://chronicdata-stage.demo.socrata.com/resource/g7x7-9gp7.json?$$app_token=IgJZnWf9KtwcLeOvqC1LuIGCu&$select=locationabbr,data_value,locationdesc,stratification1,stratification2
    //Heart Disease County Live: 
    //Stoke State Dev: /widgets/heartdiseaseandstroke/strokestatedata.json
    //Stroke State Live:
    //Stroke County Dev: https://chronicdata-stage.demo.socrata.com/resource/ruk2-u6hd.json?$$app_token=IgJZnWf9KtwcLeOvqC1LuIGCu&$select=locationabbr,data_value,locationdesc,stratification1,stratification2
    //Stroke County Live:


});

angular.bootstrap(document.body, ['countyMapsApp']);