import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MapClickHandler({ setLocation }) {

  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {

      const { lat, lng } = e.latlng;

      navigate(`/day-details?lat=${lat}&lon=${lng}`);

      setLocation({ lat, lon: lng });

    }
  });

  return null;
}

function WeatherMap() {

  const [location, setLocation] = useState(null);

  return (

    <MapContainer
      center={[20, 0]}   // world center
      zoom={2}
      minZoom={2}
      maxZoom={12}
      style={{ height: "600px", width: "100%" }}
    >

      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler setLocation={setLocation} />

      {location && (

        <Marker position={[location.lat, location.lon]}>

          <Tooltip>

            Lat: {location.lat.toFixed(2)}  
            <br />
            Lon: {location.lon.toFixed(2)}

          </Tooltip>

        </Marker>

      )}

    </MapContainer>
  );
}

export default WeatherMap;