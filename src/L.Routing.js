L.Routing = L.Class.extend({
    includes: [L.Mixin.Events],

    options: {
        // 3 options for transform ,depend on the map:
        // WGS84,BD09,NONE
        transform: "WGS84",
        colorfulLine: true,
        isZoom: true
    },

    initialize: function (map, options) {
        this.map = map;
        this.routeLayer = new L.featureGroup();
        this.routeLayer.addTo(this.map);

        this.queryLayer = new L.featureGroup();
        this.queryLayer.addTo(this.map);

        L.setOptions(this, options);

        //initialize method ,avoid repeat statement this.
        this.Bywalk = new L.Routing.Bywalk(this.routeLayer, this.options);
        this.Bybus = new L.Routing.Bybus(this.routeLayer, this.options);
        this.Bycar = new L.Routing.Bycar(this.routeLayer, this.options);

        this.query = new L.Routing.Query(this.queryLayer, this.options);
    },
    getRoute: function (how, from, to) {

        this[how].setParams(from, to);
        this[how].getRoute();
    },
    getTarget: function (keyword) {
        var center = map.getCenter();
        var centerStr = center.lng + "," + center.lat;
        this.query.setParams(keyword, centerStr);
        this.query.getPOI();
    }
})

L.Routing.BYWALK = "Bywalk";
L.Routing.BYBUS = "Bybus";
L.Routing.BYCAR = "Bycar";