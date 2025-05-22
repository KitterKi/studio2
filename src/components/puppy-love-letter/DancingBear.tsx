
"use client";

// import Image from 'next/image'; // Using standard img for troubleshooting
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
// import React, { useEffect, useRef, useState } from 'react'; // Comentado para simplificar

export function DancingBear() {
  // const [isVisible, setIsVisible] = useState(false); // Comentado para simplificar
  // const imageContainerRef = useRef<HTMLDivElement | null>(null); // Comentado para simplificar

  // useEffect(() => { // Comentado para simplificar
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setIsVisible(true);
  //           if (imageContainerRef.current) {
  //             observer.unobserve(imageContainerRef.current);
  //           }
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   if (imageContainerRef.current) {
  //     observer.observe(imageContainerRef.current);
  //   }

  //   return () => {
  //     if (imageContainerRef.current) {
  //       observer.unobserve(imageContainerRef.current);
  //     }
  //   };
  // }, []);

  return (
    <Card className="shadow-lg"> {/* Removed overflow-hidden temporarily to see if it was clipping */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <Gift className="w-7 h-7" />
          ¡Un Amigo Flotante!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[320px]">
        <div
          // ref={imageContainerRef} // Comentado para simplificar
          className="group rounded-lg overflow-hidden shadow-md" // Clases de animación eliminadas
          style={{ width: '200px', height: '200px', border: '1px solid red' }} // Added border for visibility
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://placehold.co/200x200.png" // URL de Placeholder
            alt="Patito de hule divertido (placeholder)"
            width="200" // HTML attribute
            height="200" // HTML attribute
            className="object-cover w-full h-full"
            data-ai-hint="patito hule placeholder"
            style={{ display: 'block' }} // Ensure it's not display:none
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">¡Este patito flota solo para ti!</p>
      </CardContent>
    </Card>
  );
}
