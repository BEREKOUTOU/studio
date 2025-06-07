"use client";

import React, { useState } from 'react';
import type { VehicleSearchFilters, Vehicle } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CalendarIcon, MapPinIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VehicleSearchFormProps {
  onSearch: (filters: Partial<VehicleSearchFilters>) => void;
  initialVehicles: Vehicle[]; // To determine price range
}

const vehicleCategories = ['SUV', 'Sedan', 'Truck', 'Hatchback', 'Van', 'Coupe', 'Convertible', 'Any'];
const transmissionTypes = ['Automatic', 'Manual', 'Any'];

export function VehicleSearchForm({ onSearch, initialVehicles }: VehicleSearchFormProps) {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [category, setCategory] = useState('Any');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]); // Default max, will update
  const [transmission, setTransmission] = useState('Any');

  React.useEffect(() => {
    if (initialVehicles.length > 0) {
      const prices = initialVehicles.map(v => v.basePrice);
      const min = Math.min(...prices, 0);
      const max = Math.max(...prices, 300); // Ensure a decent upper bound
      setPriceRange([min, max]);
    }
  }, [initialVehicles]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: location || undefined,
      pickupDate,
      dropoffDate,
      category: category === 'Any' ? undefined : category,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      transmission: transmission === 'Any' ? undefined : transmission,
    });
  };

  return (
    <Card className="mb-8 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary flex items-center">
          <SearchIcon className="mr-2 h-6 w-6" /> Find Your Perfect Ride
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <div className="relative mt-1">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Airport, Address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pickupDate" className="text-sm font-medium">Pick-up Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="dropoffDate" className="text-sm font-medium">Drop-off Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dropoffDate ? format(dropoffDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={setDropoffDate}
                    initialFocus
                    disabled={(date) => pickupDate ? date < pickupDate : false}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="border-t pt-6 space-y-6">
            <h3 className="text-lg font-semibold flex items-center text-secondary-foreground">
              <FilterIcon className="mr-2 h-5 w-5" /> Advanced Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission" className="text-sm font-medium">Transmission</Label>
                <Select value={transmission} onValueChange={setTransmission}>
                  <SelectTrigger id="transmission" className="mt-1">
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1"> {/* Price Range uses more space */}
                <Label htmlFor="priceRange" className="text-sm font-medium">Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
                <Slider
                  id="priceRange"
                  min={0}
                  max={initialVehicles.length > 0 ? Math.max(...initialVehicles.map(v => v.basePrice), 300) : 300}
                  step={5}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-3"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]">
              <SearchIcon className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
