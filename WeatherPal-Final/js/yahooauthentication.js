//login to Yahoo
function yahooLogin(){
var provider = new firebase.auth.OAuthProvider('yahoo.com');//get provider
//additional options
provider.setCustomParameters({
  prompt: 'login',
  language: 'en'
});

//sign in
firebase.auth().signInWithPopup(provider).then(function(result){
	}).catch(function(exception){
		alert(exception);
		});
}