var expect = chai.expect;

describe('坐标转换测试,Projection Test', function () {
    it('GCJ02 to WGS84 is OK', function () {
        var location= L.ChinaProj.gcj_To_Gps84(39.908697, 116.39748)
        expect(location[0]).to.be.equal(39.90729350518241);
        expect(location[1]).to.be.equal(116.39123643166657);
    });

    it('WGS84 to GCJ02 is OK', function () {
        var location= L.ChinaProj.gps84_To_Gcj02(39.90729350518241, 116.39123643166657)
        expect(location[0]).to.be.equal(39.90869474182323);
        expect(location[1]).to.be.equal(116.39747755357901);
    });

});