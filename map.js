var map = L.map('map',{
    center: [-7.69157, 111.24137],
    zoom: 15.2
    });


var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });



var baseMaps = {
    "Peta OSM": OpenStreetMap_Mapnik,
    "Citra Satelit": esri
};


var ngeluh = L.marker([-7.99304, 110.55793]).bindPopup('Ngeluh'),
    ngrejeng = L.marker([-7.68980, 110.34037]).bindPopup('Ngrejeng'),
    prendetan = L.marker([-7.89450, 110.32896]).bindPopup('Prendetan'),
    klaten = L.marker([-7.89450, 110.32896]).bindPopup('Klaten'),
    puntukdoro = L.marker([-7.84304, 110.10363]).bindPopup('Puntukdoro');

var namadusun = L.layerGroup([ngeluh, ngrejeng, prendetan, klaten, puntukdoro]);

var overlayMaps = {
    "dusun": namadusun
};


L.control.layers(baseMaps, overlayMaps).addTo(map);

L.Control.geocoder().addTo(map);

L.easyPrint({
    title: 'My awesome print button',
    position: 'topright',
    sizeModes: ['A4Portrait', 'A4Landscape']
}).addTo(map);


var graphicScale = L.control.graphicScale({
    fill: "fill",
    doubleLine: "true",
    showSubunits: "true"
}).addTo(map);

function cari(){
    alert('tombol ditekan!');
    map.locate({setView: true, maxZoom: 16});
    
    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);
    
}

