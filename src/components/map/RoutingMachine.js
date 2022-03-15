import { createControlComponent } from "@react-leaflet/core";
var L = require('leaflet');
require('leaflet-routing-machine');


const createRoutingMachineLayer = (props) => {
    let lineColor = "#6FA1EC"
    if(props.lineColor){
        lineColor=props.lineColor
    }
    const instance = L.Routing.control({
        //router: new L.Routing.TomTom('your TomTom API key', options),
        router: L.Routing.mapbox('pk.eyJ1IjoiY29ybWFjZG95bGUiLCJhIjoiY2wwbDZpd3ExMHJsOTNlcHd5MzE5ZzUyMCJ9.zqfnM4yIOUXZUR8PDF1STw'),
        waypoints: props.waypoints,
        createMarker: function() { return null; },
        lineOptions: {
            styles: [{ color: lineColor, weight: 7 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
    //instance.options.router

    if(props.routeTravelMode==="walking"){
        instance.options.router.options.profile= "mapbox/walking"
    }else{
        instance.options.router.options.profile= "mapbox/driving"
    }

    console.log(instance.options.router.options.profile);

    return instance;
};


const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;

