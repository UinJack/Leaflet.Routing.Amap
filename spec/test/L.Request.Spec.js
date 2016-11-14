var expect = chai.expect;
var testURL = "http://restapi.amap.com/v3/geocode/geo";

describe('Http请求测试,Http request Test', function () {
    it('GET()', function (done) {
        L.Request.get(testURL, "address=" + "北京市朝阳区阜通东大街6号&" + "output=" + "JSON&" + "key=" + "1ce5f4aef24df9b3315632813c7fcaa2",
            function (a, b, c) {
                debugger;
                if (b) done();
                else done();
            })
    });

    it('POST()', function (done) {
        L.Request.get(testURL, {address: "北京市朝阳区阜通东大街6号", output: "JSON", key: "1ce5f4aef24df9b3315632813c7fcaa2"},
            function (a, b, c) {
                debugger;
                if (b) done();
                else done();
            })

    });

    it('JSONP()', function (done) {
        L.Request.JSONP(testURL, {address: "北京市朝阳区阜通东大街6号", output: "JSON", key: "1ce5f4aef24df9b3315632813c7fcaa2"},
            function (a, b, c) {
                debugger;
                if (b) done();
                else done();
            })

    });

});