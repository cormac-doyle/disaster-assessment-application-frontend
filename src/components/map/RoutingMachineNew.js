import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

import "./css-polyline-animations/police.css"
import "./css-polyline-animations/fire.css"
import "./css-polyline-animations/ambulance.css"
import "./css-polyline-animations/army.css"
import "./css-polyline-animations/evacuation.css"
import "./css-polyline-animations/transport_services.css"



const createRoutingMachineLayer = (props) => {
    
    var lineColor = "#6FA1EC"
    if (props.lineColor) {
        lineColor = props.lineColor
    }
    var lineWeight = 10
    if (props.lineWeight) {
        lineWeight = props.lineWeight
    }

    var instance;

    instance = L.Routing.control({
        router: L.Routing.mapbox('pk.eyJ1IjoiY29ybWFjZG95bGUiLCJhIjoiY2wwbDZpd3ExMHJsOTNlcHd5MzE5ZzUyMCJ9.zqfnM4yIOUXZUR8PDF1STw'),
        waypoints: props.waypoints,
        createMarker: function () { return null; },
        lineOptions: {
            styles: [{ 
                color: lineColor, 
                weight: lineWeight, 
                className: props.animationClassName }]
        },

        show: false,
        fitSelectedRoutes: false,
        routeWhileDragging: true,
        waypointMode: "snap",
        addWaypoints: true
        //draggableWaypoints:false


    });
    

    if (props.routeTravelMode === "walking") {
        instance.options.router.options.profile = "mapbox/walking"
        //console.log("route distance: " + instance.router)
    } else {
        instance.options.router.options.profile = "mapbox/driving-traffic"
    }

    if (props.getDistance) {
        instance.on('routesfound', function (e) {
            var distance = e.routes[0].summary.totalDistance
            console.log("Evac Route Found Distance: " + distance);

            props.handleDistance(distance, props.index)
        });
    }

    if (props.getRouteCoords) {
        instance.on('routesfound', function (e) {
            var coordinates = e.routes[0].coordinates
            props.handleCoords(coordinates, props.getRouteCoords)
        });
    }


    if (props.getTime) {
        instance.on('routesfound', function (e) {
            var time = e.routes[0].summary.totalTime
            console.log("ES Route Time: " + Math.round(time % 3600 / 60) + " minutes");
            props.handleTime(time)
        });
    }

    return instance;

};

const RoutingMachineNew = createControlComponent(createRoutingMachineLayer);

export default RoutingMachineNew;
