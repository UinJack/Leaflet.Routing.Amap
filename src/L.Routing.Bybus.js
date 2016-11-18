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

        console.log("查询出:" + b.count + "种方案");
        console.log("距离:" + (b.route.distance / 1000) + "公里");
        console.log("打车预计花费：" + b.route.taxi_cost + "元");
        console.log("这里展示第一种方案");

        var route = b.route.transits[0];

        console.log("此方案需要步行：" + (route.walking_distance / 1000) + "公里");
        console.log("此方案预计需要：" + (route.duration / 60) / 60 + "小时");


        var walkingArr = [];
        for (var index in route.segments) {
            walkingArr.push(route.segments[index].walking);
            for (var i in route.segments[index].walking.steps) {
                this._lineReader(route.segments[index].walking.steps[i].polyline).addTo(this.layer);
            }
        }

        var busArr = []
        for (var index in route.segments) {
            busArr.push(route.segments[index].bus.buslines);
            for (var i in route.segments[index].bus.buslines) {
                this._lineReader(route.segments[index].bus.buslines[i].polyline).addTo(this.layer);
            }
        }

        this.layer._map.fitBounds(this.layer.getLayers()[0].getBounds());

        //var time = (duration / 60) / 60
        //console.log("需要花费:" + time + "小时");
        //console.log("距离:" + (distance / 1000) + "公里");
    }

})