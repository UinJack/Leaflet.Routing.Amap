'use strict';

(function (factory, window) {

    // define an AMD module that relies on 'leaflet'
    if (typeof define === "function" && define.amd) {
        define(["leaflet"], factory);

        // define a Common JS module that relies on 'leaflet'
    } else if (typeof exports === "object") {
        module.exports = factory(require("leaflet"));
    }

    // attach your plugin to the global 'L' variable
    if (typeof window !== "undefined" && window.L) {
        L.Routing.Conf = factory(L);
    }
}(function (L) {
    L.Routing.Conf = {

        url: "http://restapi.amap.com/v3/",
        key: "1ce5f4aef24df9b3315632813c7fcaa2",
        style: {},
        dictionary: [
            ["沿", "through"],
            ["向前走", "go straight"],
            ["往前走", "go straight"],

            ["向东", "fece to east"],
            ["向西", "fece to west"],
            ["向南", "fece to south"],
            ["向北", "fece to north"],

            ["步行", "walk"],
            ["米", "meter"],
            ["左转", "turn left"],
            ["右转", "turn right"]
        ]
    };
    // implement your plugin

    // return your plugin when you are done
    return L.Routing.Conf;
}, window));
