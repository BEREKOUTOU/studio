export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'SUV' | 'Sedan' | 'Truck' | 'Hatchback' | 'Van' | 'Coupe' | 'Convertible';
  transmission: 'Automatic' | 'Manual';
  seats: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  basePrice: number; // per day
  imageUrl: string;
  images: string[]; // for detail page gallery
  status: 'Available' | 'Booked' | 'Maintenance';
  location: string;
  description: string;
  features: string[];
}

export interface Booking {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle; // Populated for display
  pickupDateTime: string; // ISO Date string
  dropoffDateTime: string; // ISO Date string
  status: 'Confirmed' | 'Ongoing' | 'Completed' | 'Cancelled';
  totalPrice: number;
  userName: string; 
}

export type VehicleAttribute = {
  brand: string;
  model: string;
  category: string;
  transmission: string;
  seats: number;
  fuelType: string;
};

export type RecommendedVehicle = {
  brand: string;
  model: string;
  reason: string;
};

// For search form
export type VehicleSearchFilters = {
  location: string;
  pickupDate: Date | undefined;
  dropoffDate: Date | undefined;
  category: string;
  minPrice: number;
  maxPrice: number;
  transmission: string;
};
