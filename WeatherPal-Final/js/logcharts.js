// loads log data

var logsRef;
var windbarb= [];
var windgust =[];
var mintemp = [];
var maxtemp = [];
var avgtemp = [];
var rainfall = [];
var pressure = [];
var humidity = [];
var pm10 = [];
var pm25 = [];
var aqi10 = [];
var aqi25 = [];
var startdate = -1;
//retrieve logs and store in object
function loadLogData(stationid){
  logsRef=db.collection("weather_stations").doc(stationid).collection("logs");
  logsRef.get().then(function(querySnapshot) {
     let allData = {}
    querySnapshot.forEach(function(doc) {
        Object.assign(allData,doc.data());
    });
    extractData(allData)
});
}//load


//
// logsRef.doc('Apr_2020').get().then(function(doc) {
//     if (doc.exists) {
//         //console.log(doc.data())
//       extractData(doc.data())
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// })

//convert wind direction to cardinal direction
function degtocard(deg){
    if (deg>11.25 && deg<33.75){
        return "NNE";
    }else if (deg>33.75 && deg<56.25){
        return "ENE";
    }else if (deg>56.25 && deg<78.75){
        return "E";
    }else if (deg>78.75 && deg<101.25){
        return "ESE";
    }else if (deg>101.25 && deg<123.75){
        return "ESE";
    }else if (deg>123.75 && deg<146.25){
        return "SE";
    }else if (deg>146.25 && deg<168.75){
        return "SSE";
    }else if (deg>168.75 && deg<191.25){
        return "S";
    }else if (deg>191.25 && deg<213.75){
        return "SSW";
    }else if (deg>213.75 && deg<236.25){
        return "SW";
    }else if (deg>236.25 && deg<258.75){
        return "WSW";
    }else if (deg>258.75 && deg<281.25){
        return "W";
    }else if (deg>281.25 && deg<303.75){
        return "WNW";
    }else if (deg>303.75 && deg<326.25){
        return "NW";
    }else if (deg>326.25 && deg<348.75){
        return "NNW";
    }else{
        return "N";
    }
}

function extractData(dataset)
{
    // hours = {"zero": 0, "one" : 1,  "two" : 2, "three" : 3,  "four" : 4, "five" : 5,
    //     "six" : 6, "seven" : 7,  "eight": 8, "nine" : 9 , "ten" : 10, "eleven" : 11,
    //     "twelve": 12, "thirteen": 13,  "fourteen" : 14, "fifteen": 15, "sixteen": 16, "seventeen": 17,
    //     "eighteen": 18, "nineteen": 19, "twenty": 20, "twenty_one": 21, "twenty_two": 22,  "twenty_three" : 23, },
    //
    //
    // days = {"one" : 1,  "two" : 2, "three" : 3,  "four" : 4, "five" : 5, "six" : 6,
    //     "seven" : 7,  "eight": 8, "nine" : 9 , "ten" : 10, "eleven" : 11, "twelve": 12,
    //     "thirteen": 13,  "fourteen" : 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
    //     "nineteen": 19, "twenty": 20, "twenty_one": 21, "twenty_two": 22,  "twenty_three" : 23, "twenty_four": 24,
    //     "twenty_five": 25, "twenty_six": 26, "twenty_seven": 27, "twenty_eight": 28, "twenty_nine": 29, "thirty": 30,
    //     "thirty_one": 31};
    //
    // months = ["jan", "feb", "mar", "apr", "may", "jun",
    //     "jul", "aug", "sep", "oct", "nov", "dec"];

    // let month_keys = Object.keys(dataset);
    // for(let i = 0; i< month_keys.length;i++)
    // {
    //     let month = month_keys[i];
    //     // console.log("Month: " + month);
    //     // console.log(dataset[month_keys[i]]);
    //     let monthly_data = dataset[month_keys[i]];
    // let day_keys = Object.keys(dataset);
    // for(let j = 0; j < day_keys.length;j++)
    // {
    //     let day = day_keys[j]
    //     if (start_day > days[day_keys[j]])
    //     {
    //         start_day = days[day_keys[j]]
    //         day_index = j
    //     }
    //     let daily_data = dataset[day_keys[j]];
    //     let hour_keys = Object.keys(daily_data);
    //     for(let k = 0; k < hour_keys.length;k++)
    //     {
    //         let hour = hour_keys[k];
    //         if (day_index === j) if (start_hour > hours[hour_keys[k]])start_hour = hours[hour_keys[k]]
    //         let hourly_data = daily_data[hour_keys[k]];
    //         let value_keys = Object.keys(hourly_data);
    //         windgust.push(hourly_data['l']);
    //         windbarb.push([hourly_data['m'],hourly_data['k']]);
    //     }

    let timestamps = Object.keys(dataset).sort((a, b) => a - b);
        for(let k = 0; k < timestamps.length;k++)
        {
            let timestamp = timestamps[k];
            if(startdate === -1 ) startdate = timestamp;
            else if (startdate > timestamp)startdate = timestamp;
            let hourly_data = dataset[timestamps[k]];
            let value_keys = Object.keys(hourly_data);
            pm10.push([timestamp, hourly_data['a']]);
            pm25.push([timestamp, hourly_data['b']]);
            aqi10.push([timestamp, hourly_data['c']]);
            aqi25.push([timestamp, hourly_data['d']]);
            mintemp.push([timestamp, hourly_data['e']]);
            maxtemp.push([timestamp, hourly_data['f']]);
            avgtemp.push([timestamp, hourly_data['g']]);
            pressure.push([timestamp, hourly_data['h']]);
            humidity.push([timestamp, hourly_data['i']]);
            rainfall.push([timestamp, hourly_data['j']]);
            windgust.push([hourly_data['l'],hourly_data['k']]);
            windbarb.push([hourly_data['m'],hourly_data['k']]);
        }

    startdate = startdate *1000
    console.log(startdate);


    loadchart();

}
// function groupData(data, period)
// {
//     var weeklydata = []
//     var startts = new Date(0);
//     startts.setUTCSeconds(data[0]);
//     var currts, sum1 =0, sum2=0, count=0;
//     if(period === "week")
//     {
//         for(let i = 0; i < data.length;i++)
//         {
//             currts = new Date(0);
//             currtts.setUTCSeconds(data[i]);
//             if(currtts.getDay() === 0)
//             {
//                 weeklydata.push()
//                 sum1 = data[i][0];
//                 sum2 = data[i][0][0];
//                 count =0
//             }
//             else
//             {
//                 sum1 = data[i][0];
//                 sum2 = data[i][0][0];
//             }
//             while
//             console.log(startts);
//
//             weeklydata.push()
//         }
//
//     }
// }

function timestamp_todate(ts)
{
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(ts);
    return d
}

function loadchart()
{
    //Air Quality Chart

    Highcharts.stockChart('airqualitychart', {
        chart: {
            events: {
            },
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 1000 * 3600, // tick every hour
        },

        plotOptions: {
            series: {
                pointStart: startdate,
                pointInterval: 1000 * 3600, // data every hour
                turboThreshold: 10000
            }
        },
        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '24hr'
            },
                {
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            selected: 0
        },
        legend : {
            enabled : true,
        },

        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',

            },
            title: {
                text: '<b>Air Quality Index</b>',

            },
            opposite: true
        }, { // Secondary yAxis
            title: {
                text: '<b>Air Quality (µg/m^3)</b>',
            },
            labels: {
                format: '{value}',

            },
            opposite: false
        }],
        tooltip: {
            shared: true
        },

        title: {
            text: 'Hourly Air Quality...'
        },

        subtitle: {
            text: 'Subtitle goes here'
        },

        series: [{
            type: 'column',
            yAxis: 1,
            name: 'PM 10',
            data: pm10,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[10],
            dataGrouping: {
                approximation: 'average',
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: 'µg/m^3'
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        },
            {
                type: 'column',
                yAxis: 1,
                name: 'PM 2.5',
                data: pm25,
                keys: ['timestamp', 'y'],
                color: Highcharts.getOptions().colors[11],
                dataGrouping: {
                    approximation: 'average',
                    units: [
                        ['hour', [1]],
                        ['day', [1]],
                        ['week', [1]],
                        ['month', [1]],
                        ['year', null]
                    ],
                    groupPixelWidth: 100
                },
                showInNavigator: true,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: 'µg/m^3'
                },states: {
                    inactive: {
                        opacity: 1
                    }
                }
            },
            {
                type: 'spline',
                name: 'AQI 10',
                data: aqi10,
                keys: ['timestamp', 'y'],
                color: Highcharts.getOptions().colors[14],
                dataGrouping: {
                    approximation: 'average',
                    units: [
                        ['hour', [1]],
                        ['day', [1]],
                        ['week', [1]],
                        ['month', [1]],
                        ['year', null]
                    ],
                    groupPixelWidth: 100
                },
                showInNavigator: true,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: ''
                },states: {
                    inactive: {
                        opacity: 1
                    }
                }
            },
            {
                type: 'spline',
                name: 'AQI 25',
                data: aqi25,
                keys: ['timestamp', 'y'],
                color: Highcharts.getOptions().colors[5],
                dataGrouping: {
                    approximation: 'average',
                    units: [
                        ['hour', [1]],
                        ['day', [1]],
                        ['week', [1]],
                        ['month', [1]],
                        ['year', null]
                    ],
                    groupPixelWidth: 100
                },
                showInNavigator: true,
                tooltip: {
                    valueDecimals: 1,
                    valueSuffix: ''
                },states: {
                    inactive: {
                        opacity: 1
                    }
                }
            }

        ]

    });
    //Pressure & Humidity Chart

    Highcharts.stockChart('pressurechart', {
        chart: {
            events: {
            },
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 1000 * 3600, // tick every hour
        },

        plotOptions: {
            series: {
                pointStart: startdate,
                pointInterval: 1000 * 3600, // data every hour
                turboThreshold: 10000
            }
        },
        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '24hr'
            },
                {
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            selected: 0
        },
        legend : {
            enabled : true,
        },

        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
            },
            title: {
                text: '<b>Humidity (%)</b>',
            },
            opposite: false
        }, { // Secondary yAxis
            title: {
                text: '<b>Pressure (hPa)</b>',
            },
            labels: {
                format: '{value}',
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },

        title: {
            text: 'Hourly Pressure & Humidity...'
        },

        subtitle: {
            text: 'Subtitle goes here'
        },

        series: [{
            type: 'spline',
            yAxis: 1,
            name: 'Pressure',
            data: pressure,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[4],
            dataGrouping: {
                approximation: 'average',
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: 'hPa'
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        },
        {
            type: 'column',
            name: 'Humidity',
            yAxis: 0,
            data: humidity,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[7],
            dataGrouping: {
                approximation: 'average',
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: ''
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        }

        ]

    });

    //Rainfall Chart

    Highcharts.stockChart('rainfallchart', {
        chart: {
            events: {
            },
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 1000 * 3600, // tick every hour
        },

        plotOptions: {
            series: {
                pointStart: startdate,
                pointInterval: 1000 * 3600, // data every hour
                turboThreshold: 10000
            }
        },
        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '24hr'
            },
                {
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            selected: 0
        },
        legend : {
            enabled : true
        },

        yAxis: {
            title: {
                text: '<b>Rainfall (mm)</b>'
            }
        },

        title: {
            text: 'Hourly Rainfall...'
        },

        subtitle: {
            text: 'Subtitle goes here'
        },

        series: [{
            type: 'column',
            name: 'Rainfall',
            data: rainfall,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[6],
            dataGrouping: {
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: 'mm'
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        },
        ]

    });

    //Temperature Chart

    Highcharts.stockChart('tempchart', {
        chart: {
            events: {
            },
            zoomType: 'x',
            panning: true,
            panKey: 'shift'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 1000 * 3600, // tick every hour
        },

        plotOptions: {
            series: {
                pointStart: startdate,
                pointInterval: 1000 * 3600, // data every hour
                turboThreshold: 10000,
                shadow: false
            }
        },
        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '24hr'
            },
            {
                type: 'day',
                count: 3,
                text: '3d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 0
        },
        legend : {
            enabled : true
        },

        yAxis: {
            title: {
                text: '<b>Temperature (°C)</b>'
            }
        },

        title: {
            text: 'Hourly temperatures...'
        },

        subtitle: {
            text: 'Subtitle goes here'
        },

        series: [{
            name: 'Min Temperature',
            data: mintemp,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[3],
            dataGrouping: {
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        },{
            name: 'Max Temperature',
            data: maxtemp,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[8],
            dataGrouping: {
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            },
            states: {
                inactive: {
                    opacity: 1
                }
            }
        },{
            name: 'Average Temperature',
            data: avgtemp,
            keys: ['timestamp', 'y'],
            color: Highcharts.getOptions().colors[12],
            dataGrouping: {
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueDecimals: 1,
                valueSuffix: '°C'
            },states: {
                inactive: {
                    opacity: 1
                }
            }
        }
        ]

    });


//Wind Chart
    Highcharts.StockChart('windchart', {

        title: {
            text: 'Highcharts Wind Barbs'
        },
        subtitle: {
            text: 'Subtitle goes here'
        },
        chart: {
            type: 'windbarb',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
        },
        xAxis: {
            type: 'datetime',
            //offset: 40,
            tickInterval: 1000 * 3600, // tick every hour
        },
        yAxis: {
            title: {
                text: '<b>Speed (km/h)</b>'
            }
        },
        plotOptions: {
            series: {
                pointStart: startdate,
                pointInterval: 1000 * 3600, // data every hour
                turboThreshold: 10000
            }
        },

        rangeSelector: {

            buttons: [{
                type: 'day',
                count: 1,
                text: '24hr'
            },
                {
                    type: 'day',
                    count: 3,
                    text: '3d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            selected: 0
        },
        legend : {
            enabled : true
        },

        series: [ {
            type: 'line',
            keys: ['y', 'rotation'], // rotation is not used here
            data: windbarb,

            color: Highcharts.getOptions().colors[0],
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [
                        1,
                        Highcharts.color(Highcharts.getOptions().colors[0])
                            .setOpacity(0.25).get()
                    ]
                ]
            },

            name: 'Wind Speed',
            dataGrouping: {
                units: [
                    ['hour', [1]],
                    ['day', [1]],
                    ['week', [1]],
                    ['month', [1]],
                    ['year', null]
                ],
                groupPixelWidth: 100
            },
            showInNavigator: true,
            tooltip: {
                valueSuffix: ' km/h'
            },
            states: {
                inactive: {
                    opacity: 1
                }
            }
        },
            {
                type: 'line',
                keys: ['y','rotation'], // rotation is not used here
                data: windgust,

                color: Highcharts.getOptions().colors[2],
                fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        [0, Highcharts.getOptions().colors[2]],
                        [
                            1,
                            Highcharts.color(Highcharts.getOptions().colors[2])
                                .setOpacity(0.25).get()
                        ]
                    ]
                },
                name: 'Wind Gust',
                dataGrouping: {
                    units: [
                        ['hour', [1]],
                        ['day', [1]],
                        ['week', [1]],
                        ['month', [1]],
                        ['year', null]
                    ],
                    groupPixelWidth: 100
                },
                showInNavigator: true,
                tooltip: {
                    valueSuffix: ' km/h'
                },
                states: {
                    inactive: {
                        opacity: 1
                    }
                }
            },
            // {
            //     type: 'windbarb',
            //     data: windbarb,
            //     name: 'Wind Direction',
            //     color: Highcharts.getOptions().colors[1],
            //     showInLegend: true,
            //     dataGrouping: {
            //         units: [
            //             ['hour', [1]],
            //             ['day', [1]],
            //             ['week', [1]],
            //             ['month', [1]],
            //             ['year', null]
            //         ],
            //         groupPixelWidth: 100
            //     },
            //     tooltip: {
            //         valueDecimals: 1,
            //         pointFormatter: function() {
            //
            //             return  this.series.name + ':<b>' + (degtocard(Math.abs(this.direction))) + ' ' + this.direction + ' (' + this.beaufort + ')</b><br/>'
            //         }
            //
            //     }
            // }
            ]

    });

}
