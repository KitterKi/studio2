
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export function DancingBear() {
  const [isVisible, setIsVisible] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (imageContainerRef.current) {
              observer.unobserve(imageContainerRef.current);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
    };
  }, []);

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <Gift className="w-7 h-7" />
          ¡Un Amigo Flotante!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[320px]"> {/* Ajustado min-h */}
        <div
          ref={imageContainerRef}
          className={`group rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 puppy-image-enter ${isVisible ? 'puppy-image-enter-active' : ''}`}
          style={{ width: '200px', height: '200px' }} // Definimos un tamaño para el contenedor
        >
          <Image
            src="https://images.unsplash.com/photo-1580618864190-995ad00a2b94?w=300&auto=format&fit=crop&q=80" // Otra URL de patito de hule
            alt="Patito de hule divertido"
            width={200}
            height={200}
            className="object-cover w-full h-full" // object-cover se encargará de llenar el contenedor
            data-ai-hint="patito hule"
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">¡Este patito flota solo para ti!</p>
      </CardContent>
    </Card>
  );
}
