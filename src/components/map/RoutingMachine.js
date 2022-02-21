import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutingMachineLayer = (props) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(53.348, -6.2603),
            L.latLng(53.58, -6.5603)
        ],
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
