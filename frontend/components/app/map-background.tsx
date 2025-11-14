import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export function MapBackground() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    if (!mapboxToken) {
      console.warn('Mapbox token not found. Map will not be displayed.');
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    // Initialize map centered on Osaka, Japan
    // Coordinates: [longitude, latitude]
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // You can change to 'dark-v11', 'light-v11', 'satellite-v9', etc.
      center: [135.5023, 34.6937], // Osaka coordinates
      zoom: 5.5, // Zoom level to show all of Japan
      pitch: 0,
      bearing: 0,
    });

    // Add navigation controls (zoom in/out)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup on unmount
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="fixed inset-0 z-0 h-full w-full"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
}
