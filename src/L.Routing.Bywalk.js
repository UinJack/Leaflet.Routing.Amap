L.Routing.Bywalk = L.Routing.Reader.extend({
    initialize: function (layer) {
        L.Routing.Reader.prototype.initialize.call(this);
        this.layer = layer;
    },
    makeParams: function (from, to) {
        this.params =
            "origin=" + from[1] + "," + from[0] +
            "&destination=" + to[1] + "," + to[0] +
            "&output=json" +
            "&key=" + this.key;

        this.url = this.url + "walking";
    },
    callback: function (a, b, c) {
        debugger;
        var steps = b.route.paths[0].steps;
        for (var i in steps) {
            this._lineReader(steps[i].polyline).addTo(this.layer);
        }
    }

})