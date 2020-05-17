//array of stored realtime data retrieved from firestore
function getRealtimeDataArray(data){
  var array=[data.airQuality["aqi10"], data.airQuality["aqi2_5"],
             data.airQuality["pm10"], data.airQuality["pm2_5"],
             data.airTemperature, data.barometricPressure, 
			 data.updatedAt.toDate(), data.humidity, data.rainfall, data.uvIndex, 
			 data.windDirection, data.windSpeed, data.alertConfig,
             "lat:"+data.location.latitude+"<br/>lon:"+data.location.longitude, 
			 data.name, data.owner, data.status];
  return array;		  
}


function toLog(log){//convert log data to readable format
  var attributes=[log.airQuality["aqi10"], log.airQuality["aqi2_5"],
                  log.airQuality["pm10"], log.airQuality["pm2_5"],
			      log.airTemperature, log.barometricPressure, log.createdAt.toDate(),
                  log.humidity, log.rainfall, log.uvIndex,
                  log.windDirection, log.windSpeed];				  
  var row=document.createElement("tr"); //table row for log data
  attributes.forEach(function(value){
    var attributeValue=document.createElement("td");
    attributeValue.innerHTML=value;
    row.appendChild(attributeValue);	
  });
  return row;
}

//stores relevant attribute names as string arrays

//log attributes
var attributeNames=[
  "airQualityi10",
  "airQualityi2_5",
  "partical mass10",
  "partical mass2_5",  
  "airTemperature",
  "barometricPressure",
  "createdAt",
  "humidity",
  "rainfall",
  "uvIndex",
  "windDirection",
  "windSpeed"
	  ];
	  
//station attributes	  
var rtNames=[
  "airQualityi10",
  "airQualityi2_5",
  "partical mass10",
  "partical mass2_5",
  "airTemperature",
  "barometricPressure",
  "updatedAt",
  "humidity",
  "rainfall",
  "uvIndex",
  "windDirection",
  "windSpeed",
  "alertConfig",
  "location",
  "name",
  "owner",
  "status"
];