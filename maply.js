var address;
var latitude = 37.8145384;
var longitude = -82.8071054;
var lat;
var long;
var city;
var state;
var cityState;
var map;
var num = 1;

$(document).ready(function () {
    $(document).on("click", "#add", function () {
        setTimeout(function () {
            createCard();
        }, 1000);
    });
});

function createCard() {
    $("#box").append('<div class="col-md-3 col-sm-12 col-xs-12" style="margin: 10px"><table><thead><tr><th><div style="style="width: 350px;"><h4 style="text-align: center; color: black">' + cityState + '</h4></div></th></tr></thead><tbody><tr><td><div id="map ' + num + '" style="height: 400px; width: 300px; border: 2px solid black;"></div> <script> var map; var myLatLng = {lat: ' + lat + ', lng: ' + long + '}; function initMap() { map = new google.maps.Map(document.getElementById("map ' + num + '"), { center: {lat: ' + lat + ', lng: ' + long + '}, zoom: 8 }); var marker = new google.maps.Marker({ position: myLatLng, map: map, title: "My Location!" }); } </script> <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVsRDkBuTTQawIiBcs2xrMmMjRARYIHWw&callback=initMap" async defer></script></div></td></tr></tbody></table><br />');

    num++

}

function lookupLatLong_Complete(result) {
    lat = result.results["0"].geometry.location.lat;
    long = result.results["0"].geometry.location.lng;
    city = result.results[0].formatted_address;
    cityState = city;
    console.log("The lat and long is " + latitude + ", " + longitude);
}

function lookupLatLong(city, state, postalCode) {
    var address = "";
    if (postalCode.length != 0) {
        address = postalCode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return;
    }


    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";

    var request = {
        url: googleUrl,
        success: lookupLatLong_Complete
    };

    $.ajax(request);
}

/*function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat, long},
          zoom: 8
        });
      }*/

function add_Click() {
    var pcode = $("#postalCode").val();
    lookupLatLong("", "", pcode);
}

$(function () {
    $("#add").on("click", add_Click)
});