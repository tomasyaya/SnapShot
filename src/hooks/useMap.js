import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const styles = "mapbox://styles/mapbox/streets-v11";

export function useMap({ lng = 20, lat = 20, zoom = 9 } = {}) {
  const containerRef = React.createRef(null);
  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: styles,
      center: [lng, lat],
      zoom: zoom,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.remove();
  }, [lng, lat, zoom]);
  return containerRef;
}
