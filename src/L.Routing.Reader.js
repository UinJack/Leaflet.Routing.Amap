L.Routing.Reader = L.Class.extend({
    initialize: function (options) {
        this.key = L.Routing.Conf.key;
        this.url = L.Routing.Conf.url;
        this.dictionary = L.Routing.Conf.dictionary;

        L.setOptions(this, options);
    },
    getRoute: function () {

        L.Request.JSONP(this.url, this.params, this.callback, this);
    },
    getPOI: function () {
        this.getRoute();
    },

    _lineReader: function (lineString) {
        debugger;
        var line = lineString.split(";");
        var lineArray = [];
        for (var i in line) {
            var lng = Number(line[i].substr(0, line[i].indexOf(",")));
            var lat = Number(line[i].substr(line[i].indexOf(",") + 1));
            var latlng = this._transform(lat, lng);

            lineArray.push(latlng)
        }
        if (this.options.colorfulLine) {
            var polyline = L.polyline(lineArray, {
                color: this._getRandomColor(),
                weight: 5,
                opacity: 0.8
            });
        } else {
            var polyline = L.polyline(lineArray);
        }
        polyline.on('click', this.clickCallback);

        return polyline;
    },
    _transform: function (lat, lng) {
        debugger;
        switch (this.options.transform) {
            case "WGS84":
                var gpsLatlng = L.ChinaProj.gcj_To_Gps84(lat, lng);
                var latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "BD09":
                var gpsLatlng = L.ChinaProj.gcj02_To_Bd09(lat, lng);
                var latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "NONE":
                var latlng = new L.LatLng(lat, lng);
                break;
        }
        return latlng;
    },
    _pointReader: function (pointsString) {
        var lng = Number(pointsString.substr(0, pointsString.indexOf(",")));
        var lat = Number(pointsString.substr(pointsString.indexOf(",") + 1));
        var latlng = this._transform(lat, lng);
        var marker = new L.marker(latlng);
        marker.on('click', this.clickCallback);
        return marker;

    },

    _getRandomColor: function () {

        return '#' +
            (function (color) {
                return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                && (color.length == 6) ? color : arguments.callee(color);
            })('');
    }

});

