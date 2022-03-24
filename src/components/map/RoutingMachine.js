import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";


var distance =-1
const createRoutingMachineLayer = (props) => {
    let distance = -1
    let lineColor = "#6FA1EC"
    if(props.lineColor){
        lineColor=props.lineColor
    }
    const instance = L.Routing.control({
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
    
    console.log("props.getDistance :" + props.getDistance)

    if(props.getDistance){
        console.log("trying to get dist")
        instance.on('routesfound', function (e) {
            distance = e.routes[0].summary.totalDistance
            console.log("Route Found");
            props.sendDistanceToParent(distance)
            
        });
    }
    
    return instance;
    
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
