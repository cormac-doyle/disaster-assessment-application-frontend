import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";


const createRoutingMachineLayer = (props) => {
    let minDistance = 99999999999
    let lineColor = "#6FA1EC"
    if(props.lineColor){
        lineColor=props.lineColor
    }
    var instance;
   
    instance = L.Routing.control({
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
    

    
    if(props.routeTravelMode==="walking"){
        instance.options.router.options.profile= "mapbox/walking"
        //console.log("route distance: " + instance.router)
    }else{
        instance.options.router.options.profile= "mapbox/driving-traffic"
    }

    if(props.getDistance){
        instance.on('routesfound', function (e) {
            var distance = e.routes[0].summary.totalDistance
            console.log("Evac Route Found Distance: "+distance);
            props.handleDistance(distance,props.index)
        });
    }
    

    
    
    return instance;
    
};



const delay = ms => new Promise(res => setTimeout(res, ms));

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
