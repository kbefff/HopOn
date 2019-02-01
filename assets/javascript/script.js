// iffy Brewery API
(function () {
    var queryURL = "https://api.openbrewerydb.org/breweries?by_state=WA";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (results) {
        for (var i = 0; i < 10; i++) {
            // set up brewery browse page
            var name = (results[i].name);
            var $column = $('<div>').addClass("three column width").text(name + " " + results[i].website_url);
            $('#brewGallery').append($column);
        }
    });



})();


// navigate to browse breweries page
$('#browse-button').on('click', function () {
    window.location.replace('browse.html')

});

// navigate to search by location
$('#by-location-button').on('click', function () {
    console.log('click');
    window.location.replace('location.html')

});


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow, geocoder, latlang;

// my apartment lat/lang endpoint
var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlang + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 47.637612499999996,
            lng: -122.32353949999998
        },
        zoom: 13
    });
    infoWindow = new google.maps.InfoWindow;


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            latlang = pos.lat + "," + pos.lng;
            console.log(pos);
            // console.log(latlang);
            // // TODO: getter for pos??
            // var geoAPIKey = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latlang + "&key=AIzaSyAo6UHq_FVsEuafC_nHi57NG1e6X1wEOcY";

            // console.log(geoAPIKey);
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}