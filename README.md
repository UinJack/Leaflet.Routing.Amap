# Leaflet.Routing.Amap

## Description

 This is a routing implementation from AMap(高德地图),you need set a location points and key first,Leaflet.Routing.Amap will generates colorful route. Because of most china map use unique Projection , include AMap, this should be attention.so I import Project class for projection transform.


## Examples

[Demo](http://gdyblog.com/Demo/Leaflet.Routing.Amap/)

![demo](http://gdyblog.com/resource/website/routing.png)

## Getting Started

Install the dependencies:

```
npm install
```

## Usage

```javascript

 var route = new L.Routing(map,{
  		 transform: "WGS84",
        colorfulLine: true,
        isZoom: true
 });
 route.getRoute(L.Routing.BYWALK, [39.94185, 116.431549], [39.98974, 116.40683]);

```
### Initialize Options

|option name |default|comment|
|----------- |-------  |------------|
| transform  |  "WGS84"| In China have a diffrent situation,so use diffrent map you need get you projection transformed. this properties depend on you base map,if you base map is WGS84 ,you'v got get filling-in "WGS84",we support three options,is "WGS84","BD09" and "GCJ02",if you base map is another, just extend this method.|
|color| "RGBA(245, 224, 128, 1.0)"|Set route polyline color ,you can try to set "multi".will have a different impact.|
| isZoom| true|if you don't want to you map zoom to result when result callback,you could set "false"|
|isShowRoutePopup|true|routePopup is open or not|
|isShowQueryPopup|true|Query result popup is open or not.|


### Method

#### getRoute

> Beacuse of this methon is async so when you use this method , we just could put the result layer fill in the map.none return.but you can use event listener to listen this function.and getPOI too.

```javascript
	 
	getRoute(how, from, to);
	
```
|option name |describe|
|----------- |-------|
|how|has three options is "Bybus","Bywalk","Bycar"|
|from|point format is like [lat,lng]|
|to| point format is like [latlng]|

#### getPOI

```javascript
	 
	getPOI(keyword);
	
```
|option name |describe|
|----------- |------- |
|keyword |That is name about you look for|

### properties


|properties|describe|
|----------- |------- |
| routeLayer |Result of route request|
| queryLayer |Result of POI request|
| BYCAR |This is static method, for "getRoute" how option|
| BYBUS |This is static method, for "getRoute" how option|
| BYWALK |This is static method, for "getRoute" how option|


### Event

> You can listen event below that.

```javascript

	 var route = new L.Routing(map);
	 route.on("MARKCLICK", function (e) {		
	    //handing 
     }, this)
	 
```


|Event Name|describe|
|-----------|------- |
| MARKCLICK|When POI be clicked|
|WALKROUTEBACK|When walk route back |
|BUSROUTEBACK|When bus route back  |
|CARROUTEBACK|When car route back  |








