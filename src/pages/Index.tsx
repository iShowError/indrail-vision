import React, { useState, useEffect } from 'react';
import RailwayMap from '@/components/RailwayMap';
import LayerControls from '@/components/LayerControls';
import StatusBar from '@/components/StatusBar';
import StationInfo from '@/components/StationInfo';
import { Card } from '@/components/ui/card';
import { Train, MapPin, Activity } from 'lucide-react';

const Index = () => {
  const [layers, setLayers] = useState({
    majorStations: true,
    junctionStations: true,
    regularStations: false,
    railwayTracks: false,
    trains: false,
    boundaries: false,
  });

  const [selectedStation, setSelectedStation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleLayerToggle = (layer: string, enabled: boolean) => {
    setLayers(prev => ({
      ...prev,
      [layer]: enabled
    }));
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-signal-orange p-2 rounded-lg">
                <Train className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">IndRail Vision</h1>
                <p className="text-sm opacity-90">Indian Railway Network Simulation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>15 Stations Visible</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span className="text-signal-green">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="grid grid-cols-12 h-[calc(100vh-120px)]">
          {/* Map Area */}
          <div className="col-span-9 relative">
            <RailwayMap />
            <LayerControls layers={layers} onLayerToggle={handleLayerToggle} />
            <StatusBar
              isOnline={isOnline}
              lastUpdated={lastUpdated}
              stationCount={15}
              trainCount={0}
              zoomLevel={5}
            />
          </div>
          
          {/* Sidebar */}
          <div className="col-span-3 bg-muted/30 border-l p-4">
            <div className="space-y-4">
              <Card className="p-4">
                <h2 className="font-semibold text-lg mb-2 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-railway-blue" />
                  Network Overview
                </h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-2 bg-background rounded">
                    <div className="text-xl font-bold text-signal-red">4000+</div>
                    <div className="text-muted-foreground">Total Stations</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <div className="text-xl font-bold text-railway-blue">18</div>
                    <div className="text-muted-foreground">Railway Zones</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <div className="text-xl font-bold text-signal-orange">68000+</div>
                    <div className="text-muted-foreground">Route KMs</div>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <div className="text-xl font-bold text-signal-green">13000+</div>
                    <div className="text-muted-foreground">Daily Trains</div>
                  </div>
                </div>
              </Card>
              
              <StationInfo station={selectedStation} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
