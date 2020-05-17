//OpenCage code
//no hard-linking to other code, simply pass in a function to use to operate on the data retrieved
function forwardGeo(placeName, retrieveFunction){
  var apikey="455fa49704864cc3aa119bdb6a74c54b";   //necessary for making retrieving data
  var api_url="https://api.opencagedata.com/geocode/v1/json";  //call to site
  var request_url=api_url
  +"?"
  +"key=" +apikey 
  +"&q="+encodeURIComponent(placeName)
  +"&pretty=1"
  +"&no_annotations=1";  //url for calling for data

  var request= new XMLHttpRequest(); //send a request for the function
  request.open("GET", request_url, true);

  //handle call made to retrieve geocode
  request.onload=function(){
    if(request.status==200){
      var data=JSON.parse(request.responseText); //data from JSON file retrieved
	  retrieveFunction(data);              //function to call to send data to
    }else if(request.status<=500){
      alert("unable to geocode! Response code: "+request.status); //error 
	  var data=JSON.parse(request.responseText);
   	  alert(data.status.message);   //error message
    }else{
      alert("server error");  
    }
  };
  
  request.onerror=function(){//connection error
	alert("unable to connect to server");	
  }
  request.send();
}  