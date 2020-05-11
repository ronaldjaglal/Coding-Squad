var ui=new firebaseui.auth.AuthUI(firebase.auth());
//adapted from firebase documentation


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User has signed in
      
      return true;
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
 
 //allows sign in via a popup instead of redirecting to another page
 //on success, go to index
  signInFlow: 'popup',
  signInSuccessUrl: 'index.html', 
  signInOptions: [
    // List of authentication providers(social media accounts and otherwise)
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ]
  };
ui.start("#firebaseui-auth-container", uiConfig);  