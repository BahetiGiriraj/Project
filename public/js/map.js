
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({

    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
    });

// console.log('Coordinates:', coordinates);
const popupOffsets = {
    'top': [0, 25],
    'bottom': [0, -25],
    'left': [25, 0],
    'right': [-25, 0]
  };
  
// console.log(coordinates);
const marker = new mapboxgl.Marker({color: 'red'} )
.setLngLat(listing.geometry.coordinates)
.setPopup( new mapboxgl.Popup({offset: popupOffsets})
.setHTML("<p>Exact Location provided after booking!<p>"))
.addTo(map);
