"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { VehicleAttribute } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PackageSearch } from 'lucide-react';

const vehicleCategories = ['SUV', 'Sedan', 'Truck', 'Hatchback', 'Van', 'Coupe', 'Convertible'];
const transmissionTypes = ['Automatic', 'Manual'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

const recommendationFormSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  category: z.enum(vehicleCategories as [string, ...string[]], { required_error: "Category is required" }),
  transmission: z.enum(transmissionTypes as [string, ...string[]], { required_error: "Transmission is required" }),
  seats: z.coerce.number().min(1, "Seats must be at least 1").max(15, "Seats cannot exceed 15"),
  fuelType: z.enum(fuelTypes as [string, ...string[]], { required_error: "Fuel type is required" }),
  numberOfRecommendations: z.coerce.number().min(1, "Number of recommendations must be at least 1").max(5, "Max 5 recommendations"),
});

type RecommendationFormData = z.infer<typeof recommendationFormSchema>;

interface RecommendationFormProps {
  onSubmit: (data: { vehicleAttributes: VehicleAttribute; numberOfRecommendations: number }) => void;
  isLoading: boolean;
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<RecommendationFormData>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      brand: '',
      model: '',
      seats: 5,
      numberOfRecommendations: 3,
    },
  });

  const handleFormSubmit = (data: RecommendationFormData) => {
    const { brand, model, category, transmission, seats, fuelType, numberOfRecommendations } = data;
    onSubmit({
      vehicleAttributes: { brand, model, category, transmission, seats, fuelType },
      numberOfRecommendations,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <h3 className="text-xl font-semibold text-secondary-foreground mb-4">Current Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Camry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {vehicleCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transmissionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seats</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fuelTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="numberOfRecommendations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Recommendations</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <PackageSearch className="mr-2 h-4 w-4" />
          {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
        </Button>
      </form>
    </Form>
  );
}
