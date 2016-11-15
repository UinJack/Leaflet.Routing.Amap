L.Routing = L.Class.extend({
    includes: [L.Mixin.Events],

    initialize: function (map) {
        this.map = map;
        this.routeLayer = new L.featureGroup();
        this.routeLayer.addTo(this.map);
        this.route = [];
    },
    getRoute: function (how, from, to) {
        var route = new L.Routing[how](this.routeLayer);
        route.makeParams(from, to);
        route._getRoute();
        this.route.push(route);
    }

})

L.Routing.BYWALK = "Bywalk";
L.Routing.BYBUS = "Bybus";
L.Routing.BYCAR = "Bycar";