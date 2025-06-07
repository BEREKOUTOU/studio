import Link from 'next/link';
import { Car, CalendarCheck, User, Wrench, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-headline font-bold text-primary hover:opacity-80 transition-opacity">
          Voyage Auto
        </Link>
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center space-x-1">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/bookings" className="flex items-center space-x-1">
              <CalendarCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Bookings</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/recommendations" className="flex items-center space-x-1">
              <PackageSearch className="h-4 w-4" />
              <span className="hidden sm:inline">Recommendations</span>
            </Link>
          </Button>
          {/* Example User Profile/Login Button */}
          <Button variant="outline" className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
