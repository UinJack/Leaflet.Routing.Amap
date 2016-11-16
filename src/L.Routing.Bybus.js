L.Routing.Bybus = L.Routing.Reader.extend({
    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
    },
    setParams: function (from, to) {
        this.params = {
            origin: from[1] + "," + from[0],
            destination: to[1] + "," + to[0],
            city: "北京",
            output: "json",
            key: this.key
        }


        this.url = this.url + "direction/transit/integrated";
    },
    callback: function (a, b, c) {
        debugger;
        var steps = b.route.paths[0].steps;
        var distance = b.route.paths[0].distance;
        var duration = b.route.paths[0].duration;
        for (var i in steps) {
            this._lineReader(steps[i].polyline).addTo(this.layer);
        }

        this.layer._map.fitBounds(this.layer.getBounds());

        var time = (duration / 60) / 60
        console.log("需要花费:" + time + "小时");
        console.log("距离:" + (distance / 1000) + "公里");
    }

})