$(document).on('ready', function() {
    var stateMap, usMap, stateData;
    var geometries = {};
    var fills = [
        {
            defaultFill: 'red'
        },
        {
            defaultFill: 'purple'
        }
    ];
    
    $('#state-select').on('change', createStateMap);
    $('input').on('change', diseaseChange);
    $('#race-select').on('change', raceChange);
    $('#gender-select').on('change', genderChange);
    window.addEventListener('resize', function() {
        createStateMap();
        createUSMap();
    });

    
    $.ajax({
        url: 'data/counties.json',
        success: function(d) {
            stateData = d;

            geometries['us'] = stateData.objects.cb_2015_us_county_500k.geometries;
            for (code in states) {
                geometries[code] = ($.grep(stateData.objects.cb_2015_us_county_500k.geometries, function(el) {
                    return el.properties.state === code;
                }));
            }

            createStateMap();
        },
        error: function(err) {
            console.log('ajax fail: ' + err);
        }
    });

    createUSMap();

    function createUSMap() {
        $('#us-map-container').empty();

        if ($('#us-map-container').width() < 465) {
            $('#us-map-container').height($('#us-map-container').width() * .7);
        } else {
            $('#us-map-container').height(275);
        }

        usMap = null;
        usMap = new Datamap({
            scope: 'usa',
            element: document.getElementById('us-map-container'),
            geographyConfig: {
                highlightBorderWidth: 5,
                popupTemplate: function(geo) {
                    return '<div class="hoverinfo">' +
                            '<h3>' + geo.properties.name + '</h3>' +
                            '<p class="popup-rate">State Rate: TODO</p>' +
                            ($('.legend-race').eq(0).text() === '' && $('.legend-gender').eq(0).text() === '' ? '' : '<p class="popup-filtered-rate">' + $('.legend-race').eq(0).text() + ' ' + $('.legend-gender').eq(0).text() + ': TODO' + '</p>') +
                            '</div>';
                }
            },
            setProjection: function(element) {
                var projection = d3.geo.albers()
                        .scale($('#us-map-container').width() < 465 ? $('#us-map-container').width() / 465 * 600 : 600)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                path = d3.geo.path()
                        .projection(projection);

                return {path: path, projection: projection};
            },
            fills: ($('#heart').attr('checked') ? fills[0] : fills[1])
        });
    }

    function createStateMap() {
        var state = states[$('#state-select').val()];
        $('#legend-state-name').text(state.name);
        $('#state-map-container').empty();

        stateMap = null;

        stateData.objects.cb_2015_us_county_500k.geometries = geometries[state.code];

        stateMap = new Datamap({
            element: document.getElementById('state-map-container'),
            geographyConfig: {
                data: stateData,
                highlightBorderWidth: 5,
                popupTemplate: function(geo) {
                    return '<div class="hoverinfo">' +
                            '<h3>' + geo.properties.name + '</h3>' +
                            '<p class="popup-rate">County Rate: TODO</p>' +
                            ($('.legend-race').eq(0).text() === '' && $('.legend-gender').eq(0).text() === '' ? '' : '<p class="popup-filtered-rate">' + $('.legend-race').eq(0).text() + ' ' + $('.legend-gender').eq(0).text() + ': TODO' + '</p>') +
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
            fills: ($('#heart').attr('checked') ? fills[0] : fills[1])
        });
    }

    function diseaseChange() {
        if ($('#heart').attr('checked')) {
            $('.legend-disease').text('Heart Disease');
        } else {
            $('.legend-disease').text('Stroke');
        }
        createStateMap();
        createUSMap();
    }

    function raceChange() {
        if ($('#race-select').val() === 'all') {
            if ($('#gender-select').val() === 'all') {
                $('.legend-race').text('');
                $('.legend-gender').text('');
                $('#legend-us-filtered-rate').text('');
                $('#legend-state-filtered-rate').text('');
                $('.colon').hide();
            } else {
                $('.legend-race').text('');
                $('.colon').show();
                $('#legend-us-filtered-rate').text('TODO');
                $('#legend-state-filtered-rate').text('TODO');
            }
        } else {
            $('.legend-race').text($('#race-select option:selected').text());
            $('.colon').show();
            $('#legend-us-filtered-rate').text('TODO');
            $('#legend-state-filtered-rate').text('TODO');
        }

    }

    function genderChange() {
        if ($('#gender-select').val() === 'all') {
            if ($('#race-select').val() === 'all') {
                $('.legend-race').text('');
                $('.legend-gender').text('');
                $('#legend-us-filtered-rate').text('');
                $('#legend-state-filtered-rate').text('');
                $('.colon').hide();
            } else {
                $('.legend-gender').text('');
                $('.colon').show();
                $('#legend-us-filtered-rate').text('TODO');
                $('#legend-state-filtered-rate').text('TODO');
            }
        } else {
            $('.legend-gender').text($('#gender-select option:selected').text());
            $('.colon').show();
            $('#legend-us-filtered-rate').text('TODO');
            $('#legend-state-filtered-rate').text('TODO');
        }
    }
});