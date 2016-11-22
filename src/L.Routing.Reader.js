L.Routing.Reader = L.Class.extend({
    includes: [L.Mixin.Events],
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

    _pointReader: function (pointsString) {
        var lng = Number(pointsString.substr(0, pointsString.indexOf(",")));
        var lat = Number(pointsString.substr(pointsString.indexOf(",") + 1));
        var latlng = this._transform(lat, lng);
        var marker = new L.marker(latlng);
        marker.on('click', function (e) {
            this.fire("CLICK", e, this);
            //this.clickCallback(e);
        }, this);
        return marker;

    },

    _lineReader: function (lineString) {

        var line = lineString.split(";");
        var lineArray = [];
        for (var i in line) {
            var lng = Number(line[i].substr(0, line[i].indexOf(",")));
            var lat = Number(line[i].substr(line[i].indexOf(",") + 1));
            var latlng = this._transform(lat, lng);

            lineArray.push(latlng)
        }
        if (this.options.color == "multi") {
            var polyline = L.polyline(lineArray, {
                color: this._getRandomColor(),
                weight: 5,
                opacity: 0.8
            });
        } else {
            var polyline = L.polyline(lineArray, {
                color: this.options.color,
                weight: 8,
                opacity: 0.8
            });
        }
        polyline.on('click', function (e) {
            this.fire("CLICK", e, this);
            //this.clickCallback(e);
        }, this);

        return polyline;
    },
    _transform: function (lat, lng) {

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
    _untransform: function (lat, lng) {

        switch (this.options.transform) {
            case "WGS84":
                var gpsLatlng = L.ChinaProj.gps84_To_Gcj02(lat, lng);
                var latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "BD09":
                var gpsLatlng = L.ChinaProj.bd09_To_Gcj02(lat, lng);
                var latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "NONE":
                var latlng = new L.LatLng(lat, lng);
                break;
        }
        return latlng;
    },


    _getRandomColor: function () {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    },

    _SplitAndRound: function (a, n) {
        a = a * Math.pow(10, n);
        return (Math.round(a)) / (Math.pow(10, n));
    },
    _translate: function (text) {
        var result = text;
        for (var i in L.Routing.Conf.dictionary) {
            result = result.replace(L.Routing.Conf.dictionary[i][0], L.Routing.Conf.dictionary[i][1] + " ");
        }
        return result;
    }

});

