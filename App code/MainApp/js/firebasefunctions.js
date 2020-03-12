 firebase.remove
const firebaseConfig = {
  apiKey: "AIzaSyB3-Yc2_RugTBmvInq-lBy3Jv9PHr0phzs",
  authDomain: "pi-weather-station-project.firebaseapp.com",
  databaseURL: "https://pi-weather-station-project.firebaseio.com",
  projectId: "pi-weather-station-project",
  storageBucket: "pi-weather-station-project.appspot.com",
  messagingSenderId: "935321541140",
  appId: "1:935321541140:web:91bfa0076ee96f400f2501",
  measurementId: "G-D68R45GM82"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

db.collection("users").add({
	first:"Ada",
	last:"Lovelace",
	born:"1815"
}).then(function(docRef){
	console.log("Document written");
}).catch(function(error){
	console.error("Error adding document");
});

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
console.log("firebase functions running");