L.Routing.Bywalk = L.Routing.Reader.extend({
    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
    },
    setParams: function (from, to) {
        this.params = {
            origin: from[1] + "," + from[0],
            destination: to[1] + "," + to[0],
            output: "json",
            key: this.key
        }


        this.url = this.url + "direction/walking";
    },
    callback: function (a, b, c) {

        var steps = b.route.paths[0].steps;
        var distance = b.route.paths[0].distance;
        var duration = b.route.paths[0].duration;

        var myIcon = L.divIcon({
            className: 'my-div-icon',
            html: "<p id='circle'></p>",
            iconSize: [10, 10],
            iconAnchor: [8, 20],
            popupAnchor: [0, 0],
        });

        debugger;
        for (var i in steps) {
            var polyline = this._lineReader(steps[i].polyline).addTo(this.layer);
            var marker = new L.marker(polyline.getLatLngs()[0], {icon: myIcon});
            marker.addTo(this.layer).bindPopup(steps[i].instruction);
        }

        this.layer._map.fitBounds(this.layer.getLayers()[0].getBounds());


        var time = (duration / 60) / 60
        console.log("需要花费:" + time + "小时");
        console.log("距离:" + (distance / 1000) + "公里");
    },
    clean:function(){
        this.layer.clean();
    }

})