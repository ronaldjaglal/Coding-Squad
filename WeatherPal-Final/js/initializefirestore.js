//firebase config used in order to access firebase functions
var firebaseConfig = {
    apiKey: "AIzaSyDk89w1bx6kZTmIcYEw79sUDfmFLYeIAoY",
    authDomain: "weatherpal-f300b.firebaseapp.com",
    databaseURL: "https://weatherpal-f300b.firebaseio.com",
    projectId: "weatherpal-f300b",
    storageBucket: "weatherpal-f300b.appspot.com",
    messagingSenderId: "291721522633",
    appId: "1:291721522633:web:84aa7f85de968fbb194c18",
    measurementId: "G-S4C6D8JDD5"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getFirestoreInstance(){		
  return firebase.firestore();
}