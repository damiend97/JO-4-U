// app.js

var map, infowindow;

function initMap() {
	// map options
	var options = {
		center: {lat:40.4377345,lng:-105.0336179},
		zoom: 13
	}

	// DOM element
	var element = document.getElementById('mapContainer');
	
	// map
		map = new google.maps.Map(element, options);

	// request
	var request = {
		location: map.center,
		radius: 5000,
		types: ["cafe"]
	};

	// info window
	infowindow = new google.maps.InfoWindow();

	// service
	var service = new google.maps.places.PlacesService(map);

	// search
	service.nearbySearch(request, callback);
}

// search callback function
function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

// create marker function
function createMarker(place) {
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,
		animation: google.maps.Animation.DROP
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name+ '<br>' + place.vicinity);
		infowindow.open(map, this);
	});
}