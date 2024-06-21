import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

navigator.geolocation.getCurrentPosition(successLocation,errorLocation,{
    enableHighAccuracy: true
})

function successLocation(position){
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(error){
    console.log(error.message);
    setupMap([76.95, 8.5])
}

function setupMap(center){

    var map = new maplibregl.Map({
        container: 'map',
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=RhjX0mDGqprpkICiETXV', // stylesheet location
        center: center,
        //center: [76.95, 8.5], // starting position [lng, lat]
        zoom: 10 // starting zoom
        })

    const nav = new maplibregl.NavigationControl()
    map.addControl(nav, 'top-right')

    
    map.on('load', function() {

        const directions = new MapLibreGlDirections(map, {
            // optional configuration
          });

        map.addSource('Thiruvananthapuram',{
            'type': 'geojson',
            'data': 'https://api.maptiler.com/data/1b341e5c-591f-4425-bb02-a097d0606deb/features.json?key=RhjX0mDGqprpkICiETXV'
        });
    
        map.addLayer({
            'id': 'polygons',
            'type': 'fill',
            'source': 'Thiruvananthapuram',
            'layout' : {},
            'paint': {
                'fill-color' : '#FFAA01',
                'fill-opacity' : 0.3,
                //'fill-outline-color' : '#000000'
            }
        });
    
        map.addLayer({
            'id': 'outline',
            'type': 'line',
            'source': 'Thiruvananthapuram',
            'layout' : {},
            'paint': {
                'line-color' : '#000000',
                'line-width' : 2
            }
        });
    
        map.on('click','polygons', function(e){
            new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(
                '<h3>'+'place:'+'</h3><p>'+e.features[0].properties.text+
                '<p>Capital of Kerala</p>'
            )
            .addTo(map);
        });
    });

}    


