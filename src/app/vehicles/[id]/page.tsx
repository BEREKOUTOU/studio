import { getVehicleById } from '@/data/mockData';
import { VehicleImageGallery } from '@/components/vehicle/VehicleImageGallery';
import { VehicleDetailsDisplay } from '@/components/vehicle/VehicleDetailsDisplay';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface VehicleDetailPageProps {
  params: { id: string };
}

export default function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Vehicle Not Found</AlertTitle>
          <AlertDescription>
            The vehicle you are looking for does not exist or has been removed.
          </AlertDescription>
        </Alert>
        <Button asChild variant="link" className="mt-4">
            <Link href="/">Return to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <VehicleImageGallery images={vehicle.images.length > 0 ? vehicle.images : [vehicle.imageUrl]} altText={`${vehicle.brand} ${vehicle.model}`} />
      <VehicleDetailsDisplay vehicle={vehicle} />
      {/* TODO: Add booking form/section here */}
    </div>
  );
}

// Generate static paths for mock data
export async function generateStaticParams() {
  const { mockVehicles } = await import('@/data/mockData');
  return mockVehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}
