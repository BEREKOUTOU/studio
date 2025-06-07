"use client";

import React, { useState } from 'react';
import { RecommendationForm } from '@/components/recommendations/RecommendationForm';
import { RecommendationResult } from '@/components/recommendations/RecommendationResult';
import type { VehicleAttribute, RecommendedVehicle } from '@/types';
import { getVehicleRecommendations, type VehicleRecommendationInput } from '@/ai/flows/vehicle-recommendation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, PackageSearch } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendedVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async (data: { vehicleAttributes: VehicleAttribute; numberOfRecommendations: number }) => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const input: VehicleRecommendationInput = {
        vehicleAttributes: {
          brand: data.vehicleAttributes.brand,
          model: data.vehicleAttributes.model,
          category: data.vehicleAttributes.category,
          transmission: data.vehicleAttributes.transmission,
          seats: Number(data.vehicleAttributes.seats),
          fuelType: data.vehicleAttributes.fuelType,
        },
        numberOfRecommendations: Number(data.numberOfRecommendations),
      };
      
      const result = await getVehicleRecommendations(input);
      
      if (result && Array.isArray(result)) {
        setRecommendations(result.map(r => ({ brand: r.brand, model: r.model, reason: r.reason })));
        toast({
          title: "Recommendations Ready!",
          description: `Found ${result.length} vehicle recommendations for you.`,
        });
      } else {
        setError("Received an unexpected format for recommendations.");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not process recommendations.",
        });
      }
    } catch (err) {
      console.error("Error getting recommendations:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred while fetching recommendations.";
      setError(errorMessage);
       toast({
        variant: "destructive",
        title: "Recommendation Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary flex items-center">
            <PackageSearch className="mr-3 h-8 w-8" /> AI Vehicle Recommender
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Tell us about a vehicle you like, and our AI will suggest similar popular options based on its attributes.
          </p>
          <RecommendationForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {(isLoading || recommendations.length > 0) && (
        <Card className="shadow-lg rounded-xl">
          <CardContent className="pt-6">
            {isLoading && <p className="text-center text-muted-foreground">Loading recommendations...</p>}
            {!isLoading && recommendations.length > 0 && <RecommendationResult recommendations={recommendations} />}
            {!isLoading && recommendations.length === 0 && !error && (
                 <p className="text-center text-muted-foreground">Submit the form to see recommendations.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
