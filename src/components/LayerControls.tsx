import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { MapPin, Route, Train, Map as MapIcon } from 'lucide-react';

interface LayerControlsProps {
  layers: {
    majorStations: boolean;
    junctionStations: boolean;
    regularStations: boolean;
    railwayTracks: boolean;
    trains: boolean;
    boundaries: boolean;
  };
  onLayerToggle: (layer: string, enabled: boolean) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({ layers, onLayerToggle }) => {
  return (
    <Card className="p-4 absolute top-4 right-4 z-[1000] bg-background/95 backdrop-blur-sm border-border/50">
      <h3 className="font-semibold text-sm mb-3 flex items-center">
        <MapIcon className="h-4 w-4 mr-2 text-primary" />
        Map Layers
      </h3>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            Stations
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="major-stations" className="text-xs">Major Terminals</Label>
              <Switch
                id="major-stations"
                checked={layers.majorStations}
                onCheckedChange={(checked) => onLayerToggle('majorStations', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="junction-stations" className="text-xs">Junction Stations</Label>
              <Switch
                id="junction-stations"
                checked={layers.junctionStations}
                onCheckedChange={(checked) => onLayerToggle('junctionStations', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="regular-stations" className="text-xs">Regular Stations</Label>
              <Switch
                id="regular-stations"
                checked={layers.regularStations}
                onCheckedChange={(checked) => onLayerToggle('regularStations', checked)}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
            <Route className="h-3 w-3 mr-1" />
            Infrastructure
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="railway-tracks" className="text-xs">Railway Tracks</Label>
              <Switch
                id="railway-tracks"
                checked={layers.railwayTracks}
                onCheckedChange={(checked) => onLayerToggle('railwayTracks', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="boundaries" className="text-xs">State Boundaries</Label>
              <Switch
                id="boundaries"
                checked={layers.boundaries}
                onCheckedChange={(checked) => onLayerToggle('boundaries', checked)}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center">
            <Train className="h-3 w-3 mr-1" />
            Live Data
          </h4>
          <div className="flex items-center justify-between">
            <Label htmlFor="trains" className="text-xs">Train Movement</Label>
            <Switch
              id="trains"
              checked={layers.trains}
              onCheckedChange={(checked) => onLayerToggle('trains', checked)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LayerControls;