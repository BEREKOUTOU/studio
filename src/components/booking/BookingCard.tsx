import Image from 'next/image';
import type { Booking } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Edit3, Trash2, CheckCircle, Clock, XCircle, Car } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface BookingCardProps {
  booking: Booking;
}

const statusIcons = {
  Confirmed: <CheckCircle className="h-4 w-4 text-green-500" />,
  Ongoing: <Clock className="h-4 w-4 text-blue-500" />,
  Completed: <CheckCircle className="h-4 w-4 text-gray-500" />,
  Cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

export function BookingCard({ booking }: BookingCardProps) {
  const vehicle = booking.vehicle;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-4 bg-muted/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          {vehicle ? (
             <CardTitle className="text-xl font-headline">{vehicle.brand} {vehicle.model}</CardTitle>
          ) : (
            <CardTitle className="text-xl font-headline">Vehicle Details Unavailable</CardTitle>
          )}
          <Badge 
            variant={booking.status === 'Cancelled' ? 'destructive' : booking.status === 'Completed' ? 'secondary' : 'default'}
            className="flex items-center gap-1.5 self-start sm:self-center"
          >
            {statusIcons[booking.status]}
            {booking.status}
          </Badge>
        </div>
        {vehicle && <CardDescription className="text-sm">{vehicle.year} &bull; {vehicle.category}</CardDescription>}
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {vehicle && (
          <div className="relative w-full h-32 md:h-full rounded overflow-hidden col-span-1">
            <Image
              src={vehicle.imageUrl}
              alt={`${vehicle.brand} ${vehicle.model}`}
              layout="fill"
              objectFit="cover"
              data-ai-hint={`${vehicle.brand.toLowerCase()} ${vehicle.model.toLowerCase()}`}
            />
          </div>
        )}
        <div className={`space-y-2 ${vehicle ? 'md:col-span-2' : 'md:col-span-3'}`}>
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <strong>Pick-up:</strong>&nbsp;{format(parseISO(booking.pickupDateTime), "PPpp")}
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-2 text-primary" />
            <strong>Drop-off:</strong>&nbsp;{format(parseISO(booking.dropoffDateTime), "PPpp")}
          </div>
           <div className="flex items-center text-sm">
            <Car className="h-4 w-4 mr-2 text-primary" />
            <strong>Rented by:</strong>&nbsp;{booking.userName}
          </div>
          <p className="text-lg font-semibold text-primary">Total: ${booking.totalPrice.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        {(booking.status === 'Confirmed' || booking.status === 'Ongoing') && (
          <Button variant="outline" size="sm">
            <Edit3 className="h-4 w-4 mr-1.5" /> Modify
          </Button>
        )}
        {booking.status === 'Confirmed' && (
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-1.5" /> Cancel
          </Button>
        )}
         <Button variant="default" size="sm">
            View Details
          </Button>
      </CardFooter>
    </Card>
  );
}
