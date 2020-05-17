//holds account functions
firebase.auth(); //call to firebase authentication to prevent issues where waiting for call causes problems.
//allows a user to delete their account
function deleteAccount(){  
  try{
    firebase.auth().currentUser.delete();
  }catch(exception){return false;}
  return true;
}

//checks if the user has properly logged in(prevents page bypassing)
function checkLogin(callBack){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
      callBack(true);
    else
      callBack(false);   
  });
}

//allows the user to change their password
function changePassword(newPassword){
  try{
    firebase.auth().currentUser.updatePassword(newPassword);
  }catch(exception){return false;}
  return true;
}

//sign out of account and send to login screen
function signout(){	
  try{
    firebase.auth().signOut();
  }catch(exception){return false;}
   return true;
}