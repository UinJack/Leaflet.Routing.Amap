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
        url: "http://restapi.amap.com/v3/direction/",
        key: "1ce5f4aef24df9b3315632813c7fcaa2",
        dictionary: [
            ["", ""],
            ["", ""]
        ]


    };
    // implement your plugin

    // return your plugin when you are done
    return L.Routing.Conf;
}, window));
