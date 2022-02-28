
import { createControlComponent } from "@react-leaflet/core";
var L = require('leaflet');
require('leaflet-routing-machine');
require("lrm-tomtom")

const createRoutingMachineLayer = (props) => {

    const instance = L.Routing.control({
        router: new L.Routing.TomTom('QqBwGI5EkL9fqOrncf0jZI1VUiYOtXbW',
        {
            serviceUrl: "https://api.tomtom.com/routing/1/calculateRoute",
            timeout: 30 * 1000,
            routeType: "fastest", // fastest, shortest, eco, thrilling
            language: "", // en-GB
            instructionsType: "", // coded, text, tagged
            traffic: true,
            avoid: "", // [tollRoads, motorways, ferries, unpavedRoads, carpools, alreadyUsedRoads]
            travelMode: "car", // car, truck, taxi, bus, van, motorcycle, bicycle, pedestrian
            vehicleMaxSpeed: 0, // km/h
            vehicleWeight: 0, // kg
            vehicleAxleWeight: 0, // kg
            vehicleLength: 0, // m
            vehicleWidth: 0, // m
            vehicleHeight: 0, // m
            departAt: "", // YYYY-MM-DD\THH:mm:ss
            arriveAt: "", // YYYY-MM-DD\THH:mm:ss
            vehicleCommercial: false
        }),
        waypoints: props.waypoints,
        createMarker: function() { return null; },
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
