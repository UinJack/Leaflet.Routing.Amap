# Leaflet.Routing.Amap

## Description

Input location plan your suitable route to go and use in Amap service .


## Examples

 ### [Demo](http://gdyblog.com/Demo/Leaflet.Routing.Amap/)###

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


|option name |default|comment|
|----------- |-------  |------------|
| transform  |  "WGS84"| In China have a diffrent situation,so use diffrent map you need get you projection transformed first.input projection default is GCJ02.|
|colorfulLine| true    |     this properties doesn't important, it can make you route get colorful |
| isZoom	   | true	   |   if you don't want to you map zoom to result when result callback,you could set "false"      |


