// import React, { useState } from "react";
// import { Marker, useMapEvents } from "react-leaflet";


// const AddMarker = ({ formIsOpen, toggleForm, setLocation }) => {
//     const [position, setPosition] = useState(
//         null
//     );

//     useMapEvents({
//         click: (e) => {
//             setPosition(e.latlng);
//             setLocation(e.latlng);
//             toggleForm(true);
//         },
//     });

//     return !formIsOpen || position === null ? null : (
//         <Marker position={position}></Marker>
//     );
// };

// export default (AddMarker);
