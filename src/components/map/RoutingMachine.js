import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = (props) => {
    let lineColor = "#6FA1EC"
    if(props.lineColor){
        lineColor=props.lineColor
    }
    const instance = L.Routing.control({
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

    return instance;
};

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;
