"use client";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dog } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const puppyImageUrls = [
  { src: "https://placehold.co/300x300.png", alt: "Perrito lindo 1", hint: "cachorro golden retriever" },
  { src: "https://placehold.co/300x302.png", alt: "Perrito lindo 2", hint: "cachorro corgi" },
  { src: "https://placehold.co/302x300.png", alt: "Perrito lindo 3", hint: "cachorro labrador" },
  { src: "https://placehold.co/301x301.png", alt: "Perrito lindo 4", hint: "cachorro caniche" },
  { src: "https://placehold.co/300x299.png", alt: "Perrito lindo 5", hint: "cachorro beagle" },
  { src: "https://placehold.co/299x300.png", alt: "Perrito lindo 6", hint: "cachorro teckel" },
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
              className={`group_ rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 puppy-image-enter ${visibleImages[index] ? 'puppy-image-enter-active' : ''}`}
            >
              <Image
                src={puppy.src}
                alt={puppy.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full"
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
