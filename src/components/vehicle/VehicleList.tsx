import type { Vehicle } from '@/types';
import { VehicleCard } from './VehicleCard';

interface VehicleListProps {
  vehicles: Vehicle[];
}

export function VehicleList({ vehicles }: VehicleListProps) {
  if (vehicles.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No vehicles found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
