var countyMapsControllers = angular.module('countyMapsControllers', []);

countyMapsControllers.controller('mainCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
        $scope.loading = true;
        //contains information about each state, latitiude, longitude, geocode, so it can be rendered correctly
        $scope.states = {"Guam": {"abbrev": "GU"}, "Puerto Rico": {"abbrev": "PR"}, "Virgin Islands": {"abbrev": "VI"}, "Delaware": {"code": "10", "lat": 39.1498, "long": -75.5148, "scale": 7000, "abbrev": "DE"}, "Florida": {"code": "12", "lat": 27.8333, "long": -83.917, "scale": 1700, "abbrev": "FL"}, "Georgia": {"code": "13", "lat": 32.9866, "long": -83.6487, "scale": 2700, "abbrev": "GA"}, "Hawaii": {"code": "15", "lat": 21.1098, "long": -157.5311, "scale": 2000, "abbrev": "HI"}, "Idaho": {"code": "16", "lat": 45.7394, "long": -114.5103, "scale": 1300, "abbrev": "ID"}, "Illinois": {"code": "17", "lat": 39.8363, "long": -89.0022, "scale": 2000, "abbrev": "IL"}, "Indiana": {"code": "18", "lat": 39.8647, "long": -86.2604, "scale": 2700, "abbrev": "IN"}, "Iowa": {"code": "19", "lat": 42.0046, "long": -93.214, "scale": 2100, "abbrev": "IA"}, "Kansas": {"code": "20", "lat": 38.5111, "long": -98.3005, "scale": 1800, "abbrev": "KS"}, "Kentucky": {"code": "21", "lat": 37.669, "long": -85.6514, "scale": 2000, "abbrev": "KY"}, "Louisiana": {"code": "22", "lat": 31.1801, "long": -91.8749, "scale": 2300, "abbrev": "LA"}, "Maine": {"code": "23", "lat": 45.3074, "long": -69.3977, "scale": 2500, "abbrev": "ME"}, "Maryland": {"code": "24", "lat": 39.0724, "long": -77.4902, "scale": 2700, "abbrev": "MD"}, "Massachusetts": {"code": "25", "lat": 42.2373, "long": -71.5314, "scale": 2700, "abbrev": "MA"}, "Michigan": {"code": "26", "lat": 43.3504, "long": -84.5603, "scale": 1300, "abbrev": "MI"}, "Minnesota": {"code": "27", "lat": 46.7326, "long": -93.9196, "scale": 1600, "abbrev": "MN"}, "Mississippi": {"code": "28", "lat": 32.7673, "long": -89.6812, "scale": 2700, "abbrev": "MS"}, "Missouri": {"code": "29", "lat": 38.4623, "long": -92.302, "scale": 2000, "abbrev": "MO"}, "Montana": {"code": "30", "lat": 46.9048, "long": -110.3261, "scale": 1100, "abbrev": "MT"}, "Nebraska": {"code": "31", "lat": 41.1289, "long": -99.7883, "scale": 1600, "abbrev": "NE"}, "Nevada": {"code": "32", "lat": 38.4199, "long": -117.1219, "scale": 1300, "abbrev": "NV"}, "New Hampshire": {"code": "33", "lat": 43.9108, "long": -71.5653, "scale": 3700, "abbrev": "NH"}, "New Jersey": {"code": "34", "lat": 40.314, "long": -74.5089, "scale": 4000, "abbrev": "NJ"}, "New Mexico": {"code": "35", "lat": 34.8375, "long": -106.2371, "scale": 2000, "abbrev": "NM"}, "New York": {"code": "36", "lat": 43.1497, "long": -75.9384, "scale": 2000, "abbrev": "NY"}, "North Carolina": {"code": "37", "lat": 35.6411, "long": -79.8431, "scale": 1600, "abbrev": "NC"}, "North Dakota": {"code": "38", "lat": 47.5362, "long": -100.393, "scale": 2000, "abbrev": "ND"}, "Ohio": {"code": "39", "lat": 40.3736, "long": -82.7755, "scale": 2700, "abbrev": "OH"}, "Oklahoma": {"code": "40", "lat": 35.5376, "long": -98.9247, "scale": 1600, "abbrev": "OK"}, "Oregon": {"code": "41", "lat": 43.5672, "long": -121.1269, "scale": 1600, "abbrev": "OR"}, "Pennsylvania": {"code": "42", "lat": 40.5773, "long": -77.264, "scale": 2000, "abbrev": "PA"}, "Rhode Island": {"code": "44", "lat": 41.6772, "long": -71.5101, "scale": 7000, "abbrev": "RI"}, "South Carolina": {"code": "45", "lat": 33.8191, "long": -80.9066, "scale": 2000, "abbrev": "SC"}, "South Dakota": {"code": "46", "lat": 44.2853, "long": -100.4632, "scale": 2000, "abbrev": "SD"}, "Tennessee": {"code": "47", "lat": 35.7449, "long": -85.7489, "scale": 1700, "abbrev": "TN"}, "Texas": {"code": "48", "lat": 31.106, "long": -99.9475, "scale": 1000, "abbrev": "TX"}, "Utah": {"code": "49", "lat": 39.1135, "long": -111.8535, "scale": 2000, "abbrev": "UT"}, "Vermont": {"code": "50", "lat": 44.0407, "long": -72.7093, "scale": 3700, "abbrev": "VT"}, "Virginia": {"code": "51", "lat": 37.768, "long": -79.2057, "scale": 1800, "abbrev": "VA"}, "Washington": {"code": "53", "lat": 47.3917, "long": -120.5708, "scale": 1900, "abbrev": "WA"}, "West Virginia": {"code": "54", "lat": 38.968, "long": -80.4696, "scale": 2700, "abbrev": "WV"}, "Wisconsin": {"code": "55", "lat": 44.7563, "long": -89.9385, "scale": 2400, "abbrev": "WI"}, "Wyoming": {"code": "56", "lat": 42.7475, "long": -107.2085, "scale": 1800, "abbrev": "WY"}, "Alabama": {"code": "01", "lat": 32.799, "long": -86.8073, "scale": 2700, "abbrev": "AL"}, "Alaska": {"code": "02", "lat": 61.385, "long": -152.2683, "scale": 300, "abbrev": "AK"}, "Arizona": {"code": "04", "lat": 33.7712, "long": -111.3877, "scale": 1800, "abbrev": "AZ"}, "Arkansas": {"code": "05", "lat": 34.9513, "long": -92.3809, "scale": 2700, "abbrev": "AR"}, "California": {"code": "06", "lat": 36.17, "long": -119.7462, "scale": 1000, "abbrev": "CA"}, "Colorado": {"code": "08", "lat": 39.0646, "long": -105.3272, "scale": 1800, "abbrev": "CO"}, "Connecticut": {"code": "09", "lat": 41.5834, "long": -72.7622, "scale": 7000, "abbrev": "CT"}};
        $scope.alphabetizedStates = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];

        //reads the instance name property from embedding container, then loads the json file with that instance name
        $scope.instanceName = cdcCommon.getCallParam('instanceName');
        if (!$scope.instanceName) {
            $scope.error = true;
            $scope.loading = false;
        } else {
            $http.get('instances/' + $scope.instanceName + '.json').then(
                    function(response) {
                        //sets up data from response, initializes objects
                        $scope.instance = response.data;
                        $scope.instance.data = {};
                        $scope.instance.currentInputs = {};
                        $scope.instance.currentValues = {};
                        $scope.instance.pendingCallbacks = 0;

                        //sets the default inputs that will be displayed in the dropdowns
                        $scope.instance.currentInputs.state = cdcCommon.getCallParam('defaultState') ? cdcCommon.getCallParam('defaultState') : 'Alabama';
                        
                        $scope.instance.currentInputs.stateSortBy = 'state';
                        $scope.instance.currentInputs.countySortBy = 'location';
                        $scope.instance.currentInputs.countyReverse = false;
                        $scope.instance.currentInputs.stateReverse = false;
                        
                        //requests the topojson data for rendering counties, then filters the counties so they can be rendered one state at a time
                        $http.get('data/counties.json').then(
                                function(response) {
                                    $scope.mapData = response.data;
                                    $scope.geometries = {};
                                    $scope.geometries['us'] = response.data.objects.cb_2015_us_county_500k.geometries;
                                    for (stateName in $scope.states) {
                                        $scope.geometries[stateName] = ($.grep(response.data.objects.cb_2015_us_county_500k.geometries, function(el) {
                                            return el.properties.state === $scope.states[stateName].code;
                                        }));
                                    }
                                    if ($scope.instance.pendingCallbacks === 0) {
                                        $scope.init();
                                    }
                                },
                                function(error) {
                                    console.log(error);
                                    $scope.loading = false;
                                    $scope.error = true;
                                }
                        );

                        //iterates through each dataset defined in the json and makes the request for the data
                        for (datasetName in $scope.instance.datasets) {
                            if (!$scope.instance.datasets[datasetName].url) {
                                console.log('URL not provided for ' + datasetName);
                                break;
                            }

                            $scope.getDataset($scope.instance.datasets[datasetName].url, datasetName);
                        }
                    },
                    function(error) {
                        console.log(error);
                        $scope.error = true;
                        $scope.loading = false;
                    }
            );
        }

        //given a url and name this function will fetch a dataset and store it 
        //in the root scope associated with the name of the dataset
        //once all of the datasets are finished being requested, init() is called
        $scope.getDataset = function(datasetUrl, datasetName) {
            $scope.instance.data[datasetName] = {};
            $scope.instance.pendingCallbacks++;
            $http.get(datasetUrl).then(
                    function(response) {
                        $scope.instance.data[datasetName] = response.data;

                        $scope.instance.pendingCallbacks--;
                        if ($scope.instance.pendingCallbacks === 0 && $scope.geometries) {
                            $scope.init();
                        }
                    }, function(error) {
                console.log(error);
                $scope.instance.pendingCallbacks--;
                if ($scope.instance.pendingCallbacks === 0 && $scope.geometries) {
                    $scope.init();
                }
            }
            );
        };

        //after the data has been loaded, this function takes care of data processing that will only
        //need to happen one time, and then calls the updateData function, which processes data by
        //the filters that are currently set
        $scope.init = function() { //only shows dataset selector if there is more than one
            if (Object.keys($scope.instance.data).length < 2) {
                $scope.instance.currentValues.showSelector = false;
            } else {
                $scope.instance.currentValues.showSelector = true;
            }

            //sets default value for dataset select element
            $scope.instance.currentInputs.datasetName = Object.keys($scope.instance.data)[0];

            //sets default values for filter select element
            $scope.instance.currentInputs.filters = {};
            for (filter in $scope.instance.filters) {
                $scope.instance.currentInputs.filters[filter] = Object.keys($scope.instance.filters[filter].values)[0];
            }

            //iterates through each dataset, normalizing the state and county names to the id's in the topojson file
            //and finding the non-filtered values that will be displayed in the hover popup
            var state, location;
            for (dataset in $scope.instance.data) {
                $scope.instance.data[dataset].noFilter = {};

                $scope.instance.data[dataset].forEach(
                        function(datapoint) {
                            state = datapoint[$scope.instance.datasets[dataset].stateColumn];
                            state = state.charAt(0).toUpperCase() + state.slice(1);
                            location = datapoint[$scope.instance.datasets[dataset].locationColumn];
                            if ($scope.states[location]) {
                                datapoint.countyMapsStateFlag = true;
                            } else {
                                location = location.replace(/ - |county|parish/gi, '').replace(/DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY|AL|AK|AZ|AR|CA|CO|CT/g, '');
                            }
                            location = location.trim();
                            datapoint[$scope.instance.datasets[dataset].locationColumn] = location;

                            if ($scope[state]) {
                                state = $scope.states[state].abbrev;
                                datapoint[$scope.instance.datasets[dataset].stateColumn] = state;
                            }

                            if ($scope.matchesFilter(datapoint, true)) {
                                if (state.toLowerCase() === 'us' || state.toLowerCase() === 'united states') {
                                    $scope.instance.data[dataset].noFilter['US'] = datapoint[$scope.instance.datasets[dataset].dataColumn];
                                } else if (datapoint.countyMapsStateFlag) {
                                    $scope.instance.data[dataset].noFilter[datapoint[$scope.instance.datasets[dataset].stateColumn]] = datapoint[$scope.instance.datasets[dataset].dataColumn];
                                } else {
                                    $scope.instance.data[dataset].noFilter[state + ' ' + location] = datapoint[$scope.instance.datasets[dataset].dataColumn];
                                }
                            }
                        }
                );
            }

            $scope.updateData();

        };

        //this function processes the data with the current filters, and will be called any time a filter value changes
        $scope.updateData = function() {
            $scope.loading = true;
            $scope.instance.currentValues.usCurrentData = [];
            $scope.instance.currentValues.stateCurrentData = [];
            $scope.instance.currentValues.usMapData = {};
            $scope.instance.currentValues.stateMapData = {};
            
            $('#style').html('.widget-header, #footer-section, #map-controls select { background-color: ' + $scope.instance.datasets[$scope.instance.currentInputs.datasetName].colors[0] + ' !important;}');

            //sets the current unfiltered values displayed in the legend from the unfiltered values determined in init()
            $scope.instance.currentValues.us = $scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter['US'];
            $scope.instance.currentValues.state = $scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter[$scope.states[$scope.instance.currentInputs.state].abbrev];

            //determines the filter string that will be displayed in the legend and hover popup
            var filterValue, noFilters = true;
            $scope.instance.currentValues.filterString = '';
            for (filter in $scope.instance.currentInputs.filters) {
                for (name in $scope.instance.filters[filter].values) {
                    if (name === $scope.instance.currentInputs.filters[filter]) {
                        filterValue = $scope.instance.filters[filter].values[name];
                        break;
                    }
                }
                if ($scope.instance.filters[filter].noFilter !== filterValue) {
                    noFilters = false;
                    $scope.instance.currentValues.filterString = $scope.instance.currentValues.filterString + $scope.instance.currentInputs.filters[filter] + ' ';
                }
            }
            $scope.instance.currentValues.filterString = $scope.instance.currentValues.filterString.trim();
            if (noFilters) {
                $scope.instance.currentValues.filterString = '';
            } else {
                window.cdcCommon.metrics.trackEvent('Filter Selected', $scope.instance.currentValues.filterString);
            }

            //initializes variables, including the column names for the state and data defined in the instance json file
            var state, location, value, numIntervals, intervalWidth,
                    stateColumn = $scope.instance.datasets[$scope.instance.currentInputs.datasetName].stateColumn,
                    locationColumn = $scope.instance.datasets[$scope.instance.currentInputs.datasetName].locationColumn,
                    dataColumn = $scope.instance.datasets[$scope.instance.currentInputs.datasetName].dataColumn;

            //initalizes legend values to an empty array
            $scope.instance.currentValues.stateLegend = [];
            $scope.instance.currentValues.countyLegend = [];

            //iterates through each datapoint in the current dataset and adds datapoints with the current filter
            //values to the appropriate currentData objects
            $scope.instance.data[$scope.instance.currentInputs.datasetName].forEach(
                    function(datapoint) {
                        state = datapoint[stateColumn];
                        location = datapoint[locationColumn];
                        value = datapoint[dataColumn];

                        if (state.toLowerCase() === 'us' || state.toLowerCase() === 'united states') {
                            if ($scope.matchesFilter(datapoint)) {
                                $scope.instance.currentValues.usFiltered = value;
                            }
                        } else if (datapoint.countyMapsStateFlag) {
                            if ($scope.statesMatch(state, $scope.instance.currentInputs.state)) {
                                if ($scope.matchesFilter(datapoint)) {
                                    $scope.instance.currentValues.stateFiltered = value;
                                }
                            }
                            if ($scope.matchesFilter(datapoint)) {
                                if (value) {
                                    $scope.instance.currentValues.usCurrentData.push(datapoint);
                                } else {
                                    $scope.instance.currentValues.usMapData[state] = {
                                        state: state,
                                        data: $scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter[state]
                                    };
                                }
                            }
                        } else {
                            if ($scope.statesMatch(state, $scope.instance.currentInputs.state) && $scope.matchesFilter(datapoint)) {
                                if (value) {
                                    $scope.instance.currentValues.stateCurrentData.push(datapoint);
                                } else {
                                    $scope.instance.currentValues.stateMapData[location] = {
                                        location: location,
                                        data: $scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter[state + ' ' + location]
                                    };
                                }
                            }
                        }
                    }
            );

            //sorts the filtered data from lowest to highest data value
            $scope.instance.currentValues.usCurrentData.sort($scope.compareDatapoints);
            $scope.instance.currentValues.stateCurrentData.sort($scope.compareDatapoints);

            //iterates through current us map data, assigning each datapoint to the appropriate interval, and determining the upper and 
            //lower limits of each interval to display in the legend
            numIntervals = Math.min($scope.instance.datasets[$scope.instance.currentInputs.datasetName].colors.length, $scope.instance.currentValues.usCurrentData.length);
            intervalWidth = $scope.instance.currentValues.usCurrentData.length / numIntervals;
            $scope.instance.currentValues.usCurrentData.forEach(function(datapoint, index) {
                if (Math.floor(index % intervalWidth) === 0) {
                    $scope.instance.currentValues.stateLegend.push($scope.normalizeNumber(datapoint[dataColumn]));
                } else if (index === $scope.instance.currentValues.usCurrentData.length - 1) {
                    $scope.instance.currentValues.stateLegend.push($scope.normalizeNumber(datapoint[dataColumn]));
                }

                $scope.instance.currentValues.usMapData[datapoint[stateColumn]] = {
                    state: datapoint[stateColumn],
                    data: $scope.normalizeNumber($scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter[datapoint[stateColumn]]),
                    dataFiltered: $scope.normalizeNumber(datapoint[dataColumn]),
                    fillColor: $scope.instance.datasets[$scope.instance.currentInputs.datasetName].colors[Math.floor(index / intervalWidth)]
                };
            });

            //repeats same process above for state map data
            numIntervals = Math.min($scope.instance.datasets[$scope.instance.currentInputs.datasetName].colors.length, $scope.instance.currentValues.stateCurrentData.length);
            intervalWidth = $scope.instance.currentValues.stateCurrentData.length / numIntervals;
            $scope.instance.currentValues.stateCurrentData.forEach(function(datapoint, index) {
                if (Math.floor(index % intervalWidth) === 0) {
                    $scope.instance.currentValues.countyLegend.push($scope.normalizeNumber(datapoint[dataColumn]));
                } else if (index === $scope.instance.currentValues.stateCurrentData.length - 1) {
                    $scope.instance.currentValues.countyLegend.push($scope.normalizeNumber(datapoint[dataColumn]));
                }

                $scope.instance.currentValues.stateMapData[datapoint[locationColumn]] = {
                    location: datapoint[locationColumn],
                    data: $scope.normalizeNumber($scope.instance.data[$scope.instance.currentInputs.datasetName].noFilter[datapoint[stateColumn] + ' ' + datapoint[locationColumn]]),
                    dataFiltered: $scope.normalizeNumber(datapoint[dataColumn]),
                    fillColor: $scope.instance.datasets[$scope.instance.currentInputs.datasetName].colors[Math.floor(index / intervalWidth)]
                };
            });

            $scope.drawMaps();
            $scope.loading = false;
        };

        //function takes a floating point number and rounds to a consistent number of decimal places to display on the map and legend
        $scope.normalizeNumber = function(number) {
            if (typeof number !== 'number') {
                number = parseInt(number);
            }
            return number;
        };

        //compares data values of two datapoints, used to sort the data
        $scope.compareDatapoints = function(a, b) {
            var valA = a[$scope.instance.datasets[$scope.instance.currentInputs.datasetName].dataColumn];
            var valB = b[$scope.instance.datasets[$scope.instance.currentInputs.datasetName].dataColumn];
            if (typeof valA !== 'number') {
                valA = parseFloat(valA);
            }
            if (typeof valB !== 'number') {
                valB = parseFloat(valB);
            }
            if (valA < valB) {
                return -1;
            } else if (valA > valB) {
                return 1;
            } else {
                return 0;
            }
        };

        //determins if two strings are representative of the same state, either by abbreviation or full state name
        $scope.statesMatch = function(state1, state2) {
            if ((state1.toLowerCase() === state2.toLowerCase()) ||
                    ($scope.states[state1] !== undefined && ($scope.states[state1].abbrev.toLowerCase() === state2.toLowerCase())) ||
                    ($scope.states[state2] !== undefined && ($scope.states[state2].abbrev.toLowerCase() === state1.toLowerCase()))) {
                return true;
            } else {
                return false;
            }
        };

        //if noFilters is false or not provided, this function determines if the datapoint object matches the current filters
        //if noFilters is true, this function determines if this datapoint object matches having no filters
        $scope.matchesFilter = function(datapoint, noFilters) {
            for (filter in $scope.instance.filters) {
                if (noFilters && datapoint[$scope.instance.filters[filter].column] !== $scope.instance.filters[filter].noFilter) {
                    return false;
                } else if (!noFilters && datapoint[$scope.instance.filters[filter].column] !== $scope.instance.filters[filter].values[$scope.instance.currentInputs.filters[filter]]) {
                    return false;
                }
            }
            return true;
        };

        //this function draws both maps, and will be called when the filters are updated, or when the page is resized
        $scope.drawMaps = function() {
            //if the map data or instance have not loaded, do not attempt to draw maps
            if (!$scope.mapData || !$scope.instance || !$scope.instance.data || !$scope.instance.currentInputs.datasetName) {
                return;
            }

            //erases old map
            var usMapContainer = $('#us-map-container');
            usMapContainer.empty();

            //resizes map container to maintain aspect ratio
            if (usMapContainer.width() < 465) {
                usMapContainer.height(usMapContainer.width() * .7);
            } else {
                usMapContainer.height(275);
            }

            //creates map passing appropriate parameters
            $scope.usMap = new Datamap({
                scope: 'usa',
                element: usMapContainer[0],
                geographyConfig: {
                    borderColor: 'black',
                    borderWidth: .3,
                    highlightBorderColor: $scope.instance.datasets[$scope.instance.currentInputs.datasetName].mapHighlightColor,
                    highlightBorderWidth: 3,
                    popupTemplate: function(geo, data) {
                        return '<div class="hoverinfo">' +
                                '<h3>' + geo.properties.name + '</h3>' +
                                '<p class="popup-rate">Total Pop: ' + (data && data.data ? $scope.normalizeNumber(data.data) : 'Insufficient Data') + '</p>' +
                                ($scope.instance.currentValues.filterString.length > 0 ? ('<p class="popup-rate">' + $scope.instance.currentValues.filterString + ': ' + (data && data.dataFiltered ? data.dataFiltered : 'Insufficient Data') + '</p>') : '') +
                                '</div>';
                    }
                },
                setProjection: function(element) {
                    var projection = d3.geo.albersUsa()
                            .scale($(element).width() < 465 ? $(element).width() / 465 * 600 : 600)
                            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                    path = d3.geo.path()
                            .projection(projection);

                    return {path: path, projection: projection};
                },
                fills: {
                    defaultFill: 'rgb(225, 225, 225)'
                },
                data: $scope.instance.currentValues.usMapData
            });

            //gets the current state object for latitude and longitude
            var state = $scope.states[$scope.instance.currentInputs.state];

            //erases the old map
            $('#state-map-container').empty();

            //searches geometries loaded in counties.json for only counties in the current state
            $scope.mapData.objects.cb_2015_us_county_500k.geometries = $scope.geometries[$scope.instance.currentInputs.state];

            //creates the map passing appropriate parameters
            $scope.stateMap = new Datamap({
                scope: 'cb_2015_us_county_500k',
                element: document.getElementById('state-map-container'),
                geographyConfig: {
                    dataJson: $scope.mapData,
                    borderColor: 'black',
                    borderWidth: .3,
                    highlightBorderColor: $scope.instance.datasets[$scope.instance.currentInputs.datasetName].mapHighlightColor,
                    highlightBorderWidth: 3,
                    popupTemplate: function(geo, data) {
                        return '<div class="hoverinfo">' +
                                '<h3>' + geo.properties.name + '</h3>' +
                                '<p class="popup-rate">Total Pop: ' + (data && data.data ? $scope.normalizeNumber(data.data) : 'Insufficient Data') + '</p>' +
                                ($scope.instance.currentValues.filterString.length > 0 ? ('<p class="popup-rate">' + $scope.instance.currentValues.filterString + ': ' + (data && data.dataFiltered ? data.dataFiltered : 'Insufficient Data') + '</p>') : '') +
                                '</div>';
                    }
                },
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
                    defaultFill: 'rgb(225, 225, 225)'
                },
                data: $scope.instance.currentValues.stateMapData
            });
            
            if($scope.instance.currentValues.currentHighlight){
                $scope.stateMap.svg.selectAll('path.datamaps-subunit.' + $scope.instance.currentValues.currentHighlight).style('stroke', 'yellow').style('stroke-width', '3');
            }
        };

        //function called when a terrirory bubble is moused over, displays popup same as the states
        //parameters are the territory code, territory name to display, and a boolean indicating whether the mouse event was mousein or mouseout
        $scope.territoryHover = function(territoryCode, territoryName, mouseIn) {
            var $el = $('#us-map-container .datamaps-hoverover');
            if (mouseIn) {
                var data = $scope.instance.currentValues.usMapData[territoryCode];
                $el.html('<div class="hoverinfo">' +
                        '<h3>' + territoryName + '</h3>' +
                        '<p class="popup-rate">Total Pop: ' + (data && data.data ? $scope.normalizeNumber(data.data) : 'Insufficient Data') + '</p>' +
                        ($scope.instance.currentValues.filterString.length > 0 ? ('<p class="popup-rate">' + $scope.instance.currentValues.filterString + ': ' + (data && data.dataFiltered ? data.dataFiltered : 'Insufficient Data') + '</p>') : '') +
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
        $scope.dataTableToggle = function(isStateTable) {
            if (isStateTable) {
                $scope.showStateTable = !$scope.showStateTable;
                $scope.instance.currentValues.accessibilityText = 'Data Table ' + ($scope.showStateTable ? 'Displayed' : 'Collapsed');
            } else {
                $scope.showCountyTable = !$scope.showCountyTable;
                $scope.instance.currentValues.accessibilityText = 'Data Table ' + ($scope.showCountyTable ? 'Displayed' : 'Collapsed');
            }
        };
        
        $scope.sortBy = function(name, county){
            if(county){
                if($scope.instance.currentInputs.countySortBy === name){
                    $scope.instance.currentInputs.countyReverse = !$scope.instance.currentInputs.countyReverse;
                } else {
                    $scope.instance.currentInputs.countySortBy = name;
                    $scope.instance.currentInputs.countyReverse = false;
                }
            } else {
                if($scope.instance.currentInputs.stateSortBy === name){
                    $scope.instance.currentInputs.stateReverse = !$scope.instance.currentInputs.stateReverse;
                } else {
                    $scope.instance.currentInputs.stateSortBy = name;
                    $scope.instance.currentInputs.stateReverse = false;
                }
            }
        };
        
        //function is called when a column in the table is selected, highlights that count on the map
        $scope.countyHighlight = function(obj){
            if($scope.instance.currentValues.currentHighlight === obj.location){
                $scope.instance.currentValues.currentHighlight = undefined;
            } else {
                $scope.instance.currentValues.currentHighlight = obj.location;
            }
            
            $scope.drawMaps();
        };

        //function provides interface to cdcMetrics object to capture events
        $scope.trackEvent = function(interaction, value){
            cdcMetrics.trackEvent(interaction, value);
        };
        
        
        angular.element($window).bind('resize', $scope.drawMaps);
    }]);