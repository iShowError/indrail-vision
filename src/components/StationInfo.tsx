import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Train, Users, Clock } from 'lucide-react';

interface StationInfoProps {
  station: {
    id: string;
    name: string;
    zone: string;
    type: 'major' | 'junction' | 'regular';
    platforms?: number;
    facilities?: string[];
  } | null;
}

const StationInfo: React.FC<StationInfoProps> = ({ station }) => {
  if (!station) {
    return (
      <Card className="p-6 h-full bg-muted/50">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 h-8 w-8" />
            <p>Click on a station to view details</p>
          </div>
        </div>
      </Card>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'destructive';
      case 'junction': return 'default';
      case 'regular': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'major': return 'Major Terminal';
      case 'junction': return 'Junction Station';
      case 'regular': return 'Regular Station';
      default: return 'Station';
    }
  };

  return (
    <Card className="p-6 h-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-primary">{station.name}</h2>
          <p className="text-sm text-muted-foreground">Station Code: {station.id}</p>
        </div>
        
        <Badge variant={getTypeColor(station.type)}>
          {getTypeLabel(station.type)}
        </Badge>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Train className="h-4 w-4 text-railway-blue" />
            <span className="text-sm">{station.zone}</span>
          </div>
          
          {station.platforms && (
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-steel" />
              <span className="text-sm">{station.platforms} Platforms</span>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-signal-green" />
            <span className="text-sm">24/7 Operations</span>
          </div>
        </div>
        
        {station.facilities && (
          <div>
            <h3 className="text-sm font-semibold mb-2">Facilities</h3>
            <div className="flex flex-wrap gap-1">
              {station.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StationInfo;