L.Routing.Reader = L.Class.extend({
    initialize: function (key) {
        this.key = L.Routing.Conf.key;
        this.url = L.Routing.Conf.url;
        this.dictionary = L.Routing.Conf.dictionary;
    },
    _getRoute: function () {

        L.Request.get(this.url, this.params, this.callback, this);
    },
    _lineReader: function (lineString) {
        debugger;
        var line = lineString.split(";");
        var lineArray = [];
        for (var i in line) {
            var lng = Number(line[i].substr(0, line[i].indexOf(",")));
            var lat = Number(line[i].substr(line[i].indexOf(",") + 1));
            var gpsLatlng = L.ChinaProj.gcj_To_Gps84(lat, lng);
            var latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
            lineArray.push(latlng)
        }
        var polyline = L.polyline(lineArray);
        return polyline;
    }

});