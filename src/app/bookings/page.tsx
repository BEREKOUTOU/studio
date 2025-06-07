import { BookingList } from '@/components/booking/BookingList';
import { mockBookings } from '@/data/mockData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

export default function BookingsPage() {
  // In a real app, you would fetch bookings for the logged-in user
  const userBookings = mockBookings;

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary flex items-center">
            <CalendarCheck className="mr-3 h-8 w-8" /> Your Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BookingList bookings={userBookings} />
        </CardContent>
      </Card>
    </div>
  );
}
