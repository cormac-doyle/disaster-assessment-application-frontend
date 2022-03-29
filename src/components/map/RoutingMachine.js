import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "./animate.css"


const createRoutingMachineLayer = (props) => {

    var lineColor = "#6FA1EC"
    if(props.lineColor){
        lineColor=props.lineColor
    }
    var lineWeight=7
    if(props.lineWeight){
        lineWeight = props.lineWeight
    }

    var instance;
   
    instance = L.Routing.control({
            router: L.Routing.mapbox('pk.eyJ1IjoiY29ybWFjZG95bGUiLCJhIjoiY2wwbDZpd3ExMHJsOTNlcHd5MzE5ZzUyMCJ9.zqfnM4yIOUXZUR8PDF1STw'),
            waypoints: props.waypoints,
            createMarker: function() { return null; },
            lineOptions: {
                styles: [{color:lineColor, weight:lineWeight, className: props.animationClassName }]
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




const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
