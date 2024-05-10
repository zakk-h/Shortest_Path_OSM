document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([37.7749, -122.4194], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var routingControl = L.Routing.control({
        waypoints: [
            L.latLng(37.7749, -122.4194), 
            L.latLng(37.7892, -122.4101)  
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);
});
