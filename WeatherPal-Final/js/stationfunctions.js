var data;//holds current station data
var stationid;
var db=getFirestoreInstance(); //necessary for firestore functions
var stationRef=db.collection("weather_stations");

//update the station referrence of pages for retrieving data
function updatePages(doc){
	listHeader.innerHTML="Navigate to get conditions at "+doc.data().name;
	stationsList.innerHTML="";
	stationid=doc.id;
	window.location.href="index.html?"+stationid;
	}
	
function receiveData(stationid, updater){//receive data from a station
	var ref=stationRef.doc(stationid);
	ref.get().then(function(doc){
		data=doc;
		var conditions=getRealtimeDataArray(doc.data());
		updater(conditions); //update condition at this page
		});
	receiveUpdates(stationid, updater);
	}

function receiveUpdates(stationid, updater){//sets up a listener that activates every time log data is updated
 	stationRef.doc(stationid).onSnapshot(function(doc){ //function to listen for updates
		data=doc;
		var conditions=getRealtimeDataArray(doc.data());//update
		updater(conditions);
	});		
}


//add station to favourites or removes station from favourites
function favouriteStation(name){	
  var favouriteArray=[];	
  try{  //try to retrieve item, remove it if it is
  var favouriteList=localStorage.getItem("favourites");	//retrieve from web storage
  favouriteArray=favouriteList.split(",");
  for(var i=0;i<favouriteArray.length;i++){
    if(favouriteArray[i]==name){
		favouriteArray[i]=favouriteArray[favouriteArray.length-1];
		favouriteArray.pop();
		localStorage.setItem("favourites", favouriteArray.toString()); //store in web storage
		alert("Removed from favourites");
	    return;
	}
  }
  }catch(err){}   
  favouriteArray.push(name);   //add to array if the item is not present in storage
  localStorage.setItem("favourites", favouriteArray.toString()); //store in web storage
  alert("Added to favourites");
}