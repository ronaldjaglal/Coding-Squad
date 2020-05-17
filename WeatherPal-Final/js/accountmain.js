//check for matching passwords
function checkMatch(){
	var newP=document.getElementById("newpassword").value;
	var conP=document.getElementById("confirmpassword").value;
	if(newP===conP){
		return true;
	}
	alert("password don't match");
	return false;
}

//check if fields are empty
function checkEmpty(){
  var newP=document.getElementById("newpassword").value;
  var conP=document.getElementById("confirmpassword").value;
  if(newP==="" || conP===""){
    alert("fields cannot be empty");
    return true;
  }
  return false;	
}

//make changes to password after validating fields
function confirmChange(){
  if(checkMatch() && !checkEmpty()){ 
    if(changePassword(document.getElementById('newpassword').value)){
	  alert('Password updated'); 
	  window.location.replace('login.html');
	}else{
	  alert('Error updating password, re-login and try again.');
	}
  }	
}

//runs the deletion function
function confirmDelete(){
  if(deleteAccount()){
    alert('Account deleted'); 
	window.location.replace('login.html');
  }else{
	  alert('Error deleting account, re-login and try again.');
  }	
}