import type { Booking } from '@/types';
import { BookingCard } from './BookingCard';

interface BookingListProps {
  bookings: Booking[];
}

export function BookingList({ bookings }: BookingListProps) {
  if (bookings.length === 0) {
    return <p className="text-center text-muted-foreground py-10">You have no bookings yet.</p>;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
