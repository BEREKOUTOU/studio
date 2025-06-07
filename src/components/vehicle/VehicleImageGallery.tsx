"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VehicleImageGalleryProps {
  images: string[];
  altText: string;
}

export function VehicleImageGallery({ images, altText }: VehicleImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No image available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-xl">
      <div className="aspect-w-16 aspect-h-9 md:aspect-h-10 lg:aspect-h-9"> {/* Adjusted aspect ratio for better display */}
        <Image
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500 ease-in-out"
          data-ai-hint="vehicle interior exterior"
        />
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  currentIndex === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
