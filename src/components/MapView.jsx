
import { useEffect } from "react";
import {  MapContainer, useMap,TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export function MapUpdater({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  
  return null;
}

function MapView({lat, lng}){

  return(
<MapContainer
     center={[lat, lng]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}>

    <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <MapUpdater lat={lat} lng={lng}/>
 </MapContainer>
  )
}

export default MapView