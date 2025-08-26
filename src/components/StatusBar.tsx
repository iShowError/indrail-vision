import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Database, MapPin, Train } from 'lucide-react';

interface StatusBarProps {
  isOnline: boolean;
  lastUpdated: Date;
  stationCount: number;
  trainCount: number;
  zoomLevel: number;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isOnline,
  lastUpdated,
  stationCount,
  trainCount,
  zoomLevel
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="absolute bottom-4 left-4 z-[1000] flex items-center space-x-2">
      <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2">
        <div className="flex items-center space-x-4 text-xs">
          {/* Connection Status */}
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="h-3 w-3 text-signal-green" />
            ) : (
              <WifiOff className="h-3 w-3 text-signal-red" />
            )}
            <span className={isOnline ? 'text-signal-green' : 'text-signal-red'}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          {/* Data Status */}
          <div className="flex items-center space-x-1">
            <Database className="h-3 w-3 text-steel" />
            <span className="text-muted-foreground">
              Updated {formatTime(lastUpdated)}
            </span>
          </div>
          
          {/* Station Count */}
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-railway-blue" />
            <span className="text-muted-foreground">
              {stationCount} stations
            </span>
          </div>
          
          {/* Train Count */}
          <div className="flex items-center space-x-1">
            <Train className="h-3 w-3 text-signal-orange" />
            <span className="text-muted-foreground">
              {trainCount} trains
            </span>
          </div>
          
          {/* Zoom Level */}
          <Badge variant="outline" className="text-xs">
            Zoom: {zoomLevel}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;