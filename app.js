document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([35.77011,-81.55876], 13); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    var routingControl = L.Routing.control({
        waypoints: [
            L.latLng(35.77011,-81.55876), 
            L.latLng(35.77350,-81.54649)  
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);
});
