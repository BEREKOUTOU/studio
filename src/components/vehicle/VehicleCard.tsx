import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Gauge, Zap, Cog, CalendarDays, MapPin } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const getIconForFeature = (feature: string) => {
    if (feature.toLowerCase().includes('seat')) return <Users className="h-4 w-4 mr-1 text-muted-foreground" />;
    if (feature.toLowerCase().includes('transmission')) return <Cog className="h-4 w-4 mr-1 text-muted-foreground" />;
    if (feature.toLowerCase().includes('fuel')) return <Gauge className="h-4 w-4 mr-1 text-muted-foreground" />;
    return null;
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint={`${vehicle.brand.toLowerCase()} ${vehicle.model.toLowerCase()}`}
          />
           {vehicle.status !== 'Available' && (
            <Badge variant={vehicle.status === 'Booked' ? 'destructive' : 'secondary'} className="absolute top-2 right-2">
              {vehicle.status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-1">{vehicle.brand} {vehicle.model}</CardTitle>
        <p className="text-sm text-muted-foreground mb-1">{vehicle.year} &bull; {vehicle.category}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1 text-primary" /> {vehicle.location}
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center">
            <Cog className="h-4 w-4 mr-1.5 text-primary" /> {vehicle.transmission}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1.5 text-primary" /> {vehicle.seats} Seats
          </div>
          <div className="flex items-center">
            <Gauge className="h-4 w-4 mr-1.5 text-primary" /> {vehicle.fuelType}
          </div>
        </div>

        <p className="text-lg font-semibold text-primary">${vehicle.basePrice}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
