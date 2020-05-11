var cacheName = 'weather-pal'; 
var filesToCache = [    
'/index.html',
'/Barometric_Pressure.html',
'/Dust_level.html',
'/Humidity.html',
'/Rainfall.html',
'/Temperature.html',
'/UV_index.html',
'/Wind_Direction.html',
'/Wind_Speed.html',
'/css/logcharts.css',
'/style.css',    
'/script.js',
'/js/main.js', 
'/js/initializefirestore.js',
'/js/stationfunctions.js',
'/js/logfunctions.js',
'/js/authenticationsetup.js',
'/js/searchfunctions.js'
 ];  
self.addEventListener('install', function(e) { 
e.waitUntil(
caches.open(cacheName).then(function(cache) { 
return cache.addAll(filesToCache);   
})    
);  
}); 
// Serve cached content when offline 
self.addEventListener('fetch', function(e) {  
e.respondWith(      caches.match(e.request).then(function(response) {  
return response || fetch(e.request);
})   
);  
});