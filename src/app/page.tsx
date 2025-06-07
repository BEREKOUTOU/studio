"use client";

import React, { useState, useMemo } from 'react';
import { VehicleSearchForm } from '@/components/vehicle/VehicleSearchForm';
import { VehicleList } from '@/components/vehicle/VehicleList';
import { mockVehicles } from '@/data/mockData';
import type { Vehicle, VehicleSearchFilters } from '@/types';

export default function HomePage() {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);

  const handleSearch = (filters: Partial<VehicleSearchFilters>) => {
    let vehicles = mockVehicles;

    if (filters.location) {
      vehicles = vehicles.filter(v => v.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    if (filters.category && filters.category !== 'Any') {
      vehicles = vehicles.filter(v => v.category === filters.category);
    }
    if (filters.transmission && filters.transmission !== 'Any') {
      vehicles = vehicles.filter(v => v.transmission === filters.transmission);
    }
    if (filters.minPrice !== undefined) {
      vehicles = vehicles.filter(v => v.basePrice >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      vehicles = vehicles.filter(v => v.basePrice <= filters.maxPrice!);
    }
    // Date filtering would typically be more complex, involving checking availability overlaps
    // For this mock, we'll keep it simple or omit if not core to UI demonstration
    if (filters.pickupDate && filters.dropoffDate) {
      // Simple logic: show available vehicles, in real app check against bookings
      vehicles = vehicles.filter(v => v.status === 'Available');
    }


    setFilteredVehicles(vehicles);
  };

  return (
    <div className="space-y-8">
      <VehicleSearchForm onSearch={handleSearch} initialVehicles={mockVehicles} />
      <VehicleList vehicles={filteredVehicles} />
    </div>
  );
}
