import type { Vehicle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Gauge, Cog, CalendarDays, MapPin, DollarSign, CheckCircle, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface VehicleDetailsDisplayProps {
  vehicle: Vehicle;
}

export function VehicleDetailsDisplay({ vehicle }: VehicleDetailsDisplayProps) {
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-3xl font-headline text-primary mb-1">{vehicle.brand} {vehicle.model}</CardTitle>
            <p className="text-lg text-muted-foreground">{vehicle.year} &bull; {vehicle.category}</p>
          </div>
          <Badge variant={vehicle.status === 'Available' ? 'default' : vehicle.status === 'Booked' ? 'destructive' : 'secondary'} className="mt-2 sm:mt-0 text-sm px-3 py-1 bg-accent text-accent-foreground self-start sm:self-center">
             <Tag className="mr-1.5 h-4 w-4" /> {vehicle.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-base">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Location:</span>&nbsp;{vehicle.location}
          </div>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Price:</span>&nbsp;${vehicle.basePrice} / day
          </div>
          <div className="flex items-center">
            <Cog className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Transmission:</span>&nbsp;{vehicle.transmission}
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Seats:</span>&nbsp;{vehicle.seats}
          </div>
          <div className="flex items-center">
            <Gauge className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Fuel Type:</span>&nbsp;{vehicle.fuelType}
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-3 text-primary" />
            <span className="font-medium">Year:</span>&nbsp;{vehicle.year}
          </div>
        </div>
        
        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-3 text-secondary-foreground">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
        </div>

        {vehicle.features && vehicle.features.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-secondary-foreground">Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features.map((feature, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Separator />

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
                Book Now
            </Button>
            <Button size="lg" variant="outline" className="flex-1 text-lg py-3">
                Add to Wishlist
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
