L.Routing.Query = L.Routing.Reader.extend({

    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
    },
    setParams: function (keywords, location) {
        this.params = {
            keywords: keywords,
            location: location,
            datatype: "poi",
            types: "050301",
            key: this.key
        }


        this.url = this.url + "assistant/inputtips";
    },
    callback: function (a, b, c) {
        var pointsArr = b.tips;
        for (var i in pointsArr) {
            var marker = this._pointReader(pointsArr[i].location)
            marker.addTo(this.layer);
        }
        this.layer._map.fitBounds(this.layer.getBounds());
    },
    clickCallback: function (e) {
        debugger;
        alert("Click");
    }

})