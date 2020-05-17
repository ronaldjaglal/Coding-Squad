//for running the service worker
window.onload = () => { 
'use strict';     
if ('serviceWorker' in navigator) {  //check if serviceworker exists   
navigator.serviceWorker  
.register('/sw.js');  
} 
}
console.log("service worker running");

