import React from "react";
import { useMap } from "../../hooks/useMap";
import "./map.css";

function MapContainer({ lng, lat, zoom }) {
  const containerRef = useMap({ lng, lat, zoom });
  return <div className="map-container" ref={containerRef}></div>;
}

export default MapContainer;
