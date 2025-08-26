import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Sample railway stations data
const majorStations = [
  { id: 'NDLS', name: 'New Delhi', lat: 28.6429, lng: 77.2197, type: 'major', zone: 'Northern Railway' },
  { id: 'CSTM', name: 'Chhatrapati Shivaji Terminus', lat: 18.9398, lng: 72.8355, type: 'major', zone: 'Central Railway' },
  { id: 'HWH', name: 'Howrah Junction', lat: 22.5854, lng: 88.3457, type: 'major', zone: 'Eastern Railway' },
  { id: 'MAS', name: 'Chennai Central', lat: 13.0827, lng: 80.2707, type: 'major', zone: 'Southern Railway' },
  { id: 'SBC', name: 'Bengaluru City', lat: 12.9716, lng: 77.5946, type: 'major', zone: 'South Western Railway' },
  { id: 'ADI', name: 'Ahmedabad Junction', lat: 23.0225, lng: 72.5714, type: 'major', zone: 'Western Railway' },
  { id: 'JP', name: 'Jaipur Junction', lat: 26.9124, lng: 75.7873, type: 'major', zone: 'North Western Railway' },
  { id: 'BZA', name: 'Vijayawada Junction', lat: 16.5062, lng: 80.6480, type: 'major', zone: 'South Central Railway' },
  { id: 'PNBE', name: 'Patna Junction', lat: 25.5941, lng: 85.1376, type: 'major', zone: 'East Central Railway' },
  { id: 'GUV', name: 'Guwahati', lat: 26.1445, lng: 91.7362, type: 'major', zone: 'Northeast Frontier Railway' },
];

const junctionStations = [
  { id: 'BPL', name: 'Bhopal Junction', lat: 23.2599, lng: 77.4126, type: 'junction', zone: 'West Central Railway' },
  { id: 'JUC', name: 'Jalandhar City', lat: 31.3260, lng: 75.5762, type: 'junction', zone: 'Northern Railway' },
  { id: 'JBP', name: 'Jabalpur', lat: 23.1815, lng: 79.9864, type: 'junction', zone: 'West Central Railway' },
  { id: 'NGP', name: 'Nagpur', lat: 21.1458, lng: 79.0882, type: 'junction', zone: 'Central Railway' },
  { id: 'ITJ', name: 'Itarsi Junction', lat: 22.6145, lng: 77.7639, type: 'junction', zone: 'West Central Railway' },
];

// Custom icons for different station types
const createStationIcon = (type: string) => {
  const colors = {
    major: '#dc2626', // signal-red
    junction: '#2563eb', // railway-blue
    regular: '#16a34a', // signal-green
  };
  
  return L.divIcon({
    html: `<div style="background-color: ${colors[type as keyof typeof colors]}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    className: 'custom-div-icon',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Component to render markers within the map context
const MapContent: React.FC = () => {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Major Stations */}
      {majorStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={createStationIcon(station.type)}
        >
          <Popup className="railway-popup">
            <div className="text-sm">
              <h3 className="font-semibold text-primary">{station.name}</h3>
              <p className="text-muted-foreground">Station Code: {station.id}</p>
              <p className="text-muted-foreground">Zone: {station.zone}</p>
              <span className="inline-block px-2 py-1 mt-1 text-xs bg-signal-red text-white rounded">
                Major Terminal
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Junction Stations */}
      {junctionStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={createStationIcon(station.type)}
        >
          <Popup className="railway-popup">
            <div className="text-sm">
              <h3 className="font-semibold text-primary">{station.name}</h3>
              <p className="text-muted-foreground">Station Code: {station.id}</p>
              <p className="text-muted-foreground">Zone: {station.zone}</p>
              <span className="inline-block px-2 py-1 mt-1 text-xs bg-railway-blue text-white rounded">
                Junction
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const RailwayMap: React.FC = () => {
  const center: [number, number] = [20.5937, 78.9629]; // Geographic center of India
  
  return (
    <MapContainer
      center={center}
      zoom={5}
      className="w-full h-full rounded-lg shadow-lg"
      style={{ minHeight: '600px' }}
    >
      <MapContent />
    </MapContainer>
  );
};

export default RailwayMap;