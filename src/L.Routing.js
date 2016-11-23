L.Routing = L.Class.extend({
    includes: [L.Mixin.Events],

    options: {
        // 3 options for transform ,depend on the map:
        // WGS84,BD09,GCJ02
        transform: "WGS84",
        //if color is "multi",the line will be colorful,general color view depend on you set.
        color: "RGBA(245, 224, 128, 1.0)",
        isShowRoutePopup: true,
        isShowQueryPopup: true,
        isZoom: true,
        //is very difficult for me ,this option is true you can see ,a part of the
        //describe about routing was be translated.
        isTranslate: true
    },

    initialize: function (map, options) {

        this.map = map;
        this.routeLayer = new L.featureGroup();
        this.routeLayer.addTo(this.map);

        this.queryLayer = new L.featureGroup();
        this.queryLayer.addTo(this.map);
        //default record last method to ues
        //this.lastWay = "Bywalk";

        L.setOptions(this, options);

        //initialize method ,avoid repeat statement this.
        this.Bywalk = new L.Routing.Bywalk(this.routeLayer, this.options);
        this.Bywalk.on("ROUTEBACK", function (e) {
            debugger;
            this.fire("WALKROUTEBACK", e, this);
        }, this)

        this.Bybus = new L.Routing.Bybus(this.routeLayer, this.options);
        this.Bybus.on("ROUTEBACK", function (e) {
            this.fire("BUSROUTEBACK", e, this);
        }, this)
        this.Bycar = new L.Routing.Bycar(this.routeLayer, this.options);
        this.Bycar.on("ROUTEBACK", function (e) {
            this.fire("CARROUTEBACK", e, this);
        }, this)

        this.query = new L.Routing.Query(this.queryLayer, this.options);
    },
    getRoute: function (how, from, to) {

        this.routeLayer.clearLayers();

        this.lastWay = how;

        this[how].setParams(from, to);
        this[how].getRoute();
    },
    getPOI: function (keyword) {
        var center = this.map.getCenter();
        var gcjCenter = this.query._untransform(center.lat, center.lng)
        var centerStr = gcjCenter.lng + "," + gcjCenter.lat;
        this.query.setParams(keyword, centerStr);
        this.query.getPOI();

        this.query.on("CLICK", function (e) {
            this.fire("MARKCLICK");
        }, this)
    }

})

L.Routing.BYWALK = "Bywalk";
L.Routing.BYBUS = "Bybus";
L.Routing.BYCAR = "Bycar";