L.Routing.Reader = L.Class.extend({
    initialize: function (key) {
        this._map = map;
        this._popupPane = map._panes.popupPane;

        this._container = map.options.drawControlTooltips ? L.DomUtil.create('div', 'leaflet-draw-tooltip', this._popupPane) : null;
        this._singleLineLabel = false;
    },
    getRoute: function (from, to) {

    }
});