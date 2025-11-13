'use client';

import { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxMapProps {
  className?: string;
}

export function MapboxMap({ className }: MapboxMapProps) {
  const [mapboxToken, setMapboxToken] = useState<string>('');

  useEffect(() => {
    // Get the Mapbox token from environment variable
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    setMapboxToken(token);
  }, []);

  if (!mapboxToken) {
    return (
      <div className={className}>
        <div className="flex h-full items-center justify-center bg-gray-900 text-white">
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: 135.5023,
          latitude: 34.6937,
          zoom: 11,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={true}
      />
    </div>
  );
}
