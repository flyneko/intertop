function CustomMarker(latlng, map, args) {
    this.latlng = new google.maps.LatLng(latlng[0],latlng[1]);
    this.args = args;
    this.setMap(map);
}
CustomMarker.prototype.remove = function() { if (this.div) { this.div.parentNode.removeChild(this.div); this.div = null; } };
CustomMarker.prototype.getPosition = function() { return this.latlng; };

function createMap(elem, center, zoom) {
    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {
        var self = this;
        var div = this.div;
        if (!div) {
            div = this.div = document.createElement('div');
            div.style.position = 'absolute';
            div.className = 'count-marker';
            div.innerHTML = this.args.count;
            if (typeof(self.args.marker_id) !== 'undefined')
                div.dataset.marker_id = self.args.marker_id;

            google.maps.event.addDomListener(div, "click", function(event) {
                google.maps.event.trigger(self, "click");
            });

            var panes = this.getPanes();
            panes.overlayImage.appendChild(div);
        }

        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
        }
    };
    return new google.maps.Map(elem, {
        zoom: zoom,
        center: center,
        disableDefaultUI: true,
        gestureHandling: 'cooperative',
        styles: [{ "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "off"}]}, { "featureType": "poi", "stylers": [{ "visibility": "off"}]}, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off"}]}, { "featureType": "transit", "stylers": [{ "visibility": "off"}]}]
    });
}

function createSimpleMarker(position, map) {
    var pos = new google.maps.LatLng(position[0], position[1]);
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: {
            url: 'assets/img/map-pin-simple.svg',
            scaledSize: new google.maps.Size(60, 34), // scaled size
        },
    });
}