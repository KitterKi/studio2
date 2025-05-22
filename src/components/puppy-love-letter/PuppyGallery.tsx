"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dog } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const puppyImageUrls = [
  { src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=800&auto=format&fit=crop", alt: "Perrito labrador adorable", hint: "cachorro labrador" },
  { src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop", alt: "Perrito corgi sonriendo", hint: "cachorro corgi" },
  { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=800&auto=format&fit=crop", alt: "Perrito golden retriever juguetón", hint: "cachorro golden retriever" },
  { src: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800&auto=format&fit=crop", alt: "Perrito caniche esponjoso", hint: "cachorro caniche" },
  { src: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=800&auto=format&fit=crop", alt: "Perrito beagle curioso", hint: "cachorro beagle" },
  { src: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?q=80&w=800&auto=format&fit=crop", alt: "Perrito teckel (dachshund) tierno", hint: "cachorro teckel" },
];

export function PuppyGallery() {
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleImages((prev) => ({ ...prev, [index]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <Dog className="w-7 h-7" />
          ¡Sobredosis de Perritos!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {puppyImageUrls.map((puppy, index) => (
            <div 
              key={index}
              ref={el => imageRefs.current[index] = el}
              className={`group rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 puppy-image-enter ${visibleImages[index] ? 'puppy-image-enter-active' : ''}`}
            >
              <Image
                src={puppy.src}
                alt={puppy.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full aspect-square"
                data-ai-hint={puppy.hint}
                priority={index < 3} // Prioritize loading for the first few images
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
