var db=getFirestoreInstance(); //necessary for firestore functions
var stationRef=db.collection("weather_stations");
var stationsList=document.getElementById("stationslist");
var listHeader=document.getElementById("listheader");

//listen for "enter key" on search bar to run functions
var searchBar=document.getElementById("searchbar");	
searchbar.addEventListener("keyup",function(event){
if(event.keyCode===13){  	
  event.preventDefault(); 
  var criteria=document.getElementById("searchcriteria").value;
  var value=searchbar.value;
  searchbar.value="";  			//clear search bar and list
  if(criteria==="search by:name")
	  searchByName(value,value); //search by station criteria
  else
	  forwardGeo(value, locationFunc); 
}	
});

//makes station list
function toEntries(value, list){
	stationsList.innerHTML="";
	listHeader.innerHTML='Results for '+'"'+value+'"';
	list.forEach(function(doc){	
	  var stationData=document.createElement("p");	
      stationData.innerHTML="id:"+doc.id+" name:"+doc.data().name;
	  stationData.onclick=function(){ updatePages(doc);};//update condition reading on pages
	  stationsList.appendChild(stationData);   //present in list to user
	});
}

//search for station by specified criteria
function searchByName(name, value){
  var found=[];
  stationRef.where("name", "==", value).get().then(function(querySnapshot){//querying function
	  querySnapshot.forEach(function(doc){ 
		found.push(doc);		
	  });//query
     toEntries(name, found);	//place in list  
	}).catch(function(error){	    
	});//catch 
}

//get all stations
function getAll(){	
  var found=[];	
  stationRef.get().then(function(query){//grab the stations and then push them into an array
    query.forEach(function(station){
		found.push(station);
    });
	toEntries("All stations", found);  //call to function to display stations list
  }).catch(function(error){
  });	  
}

//get favourite stations
function getFavouriteStations(){
  var favouriteArray=[];
  var found=[];
  //retrieve stations from web storage
  try{
    var favouriteList=localStorage.getItem("favourites");
	favouriteArray=favouriteList.split(",");
  }catch(err){}
  //retrieve stations from firestore
  favouriteArray.forEach(function(value){
    searchByName("favourites", value);
  });
}

//called by location function
function getStationByLocation(locationName, lat, lon, rad=2){ //rad(radius) of 2 is approximately 222km
  var found=[];	
  stationRef.get().then(function(query){//grab the stations and then push them into an array
    query.forEach(function(station){ //check if latitude and logitude are within a radius limit, append if condition is met
      var difflat=station.data().location.latitude-lat;
      var difflon=station.data().location.longitude-lon;
	  if(difflat<=rad && difflat>=-rad ) {
	    if(difflon<=rad && difflon>=-rad){
		  found.push(station);
		}//difflon
	  }//difflat
    });
	toEntries(locationName, found);
  });
}

//passed into forward geoencoding to receive its data
var locationFunc=function(data){
    var lat=data.results[0].geometry.lat;
	var lon=data.results[0].geometry.lng;
	var place=data.results[0].formatted;
	getStationByLocation(place, lat, lon);
};

//get stations nearest to user
function getNearest(){
  if(navigator.geolocation){ //check if geolocation is available to this browser
    navigator.geolocation.getCurrentPosition(function(position){
      getStationByLocation("Nearest", position.coords.latitude, position.coords.longitude); //get the stations by location
    });
  }else{
    alert("This browser cannot use geolocation.");     
  }			  
}