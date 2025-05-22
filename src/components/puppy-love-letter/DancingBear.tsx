
"use client";

// import Image from 'next/image'; // Using standard img for troubleshooting
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PawPrint } from 'lucide-react'; // Changed icon to PawPrint
// import React, { useEffect, useRef, useState } from 'react'; // Comentado para simplificar

export function DancingBear() { // Component name is still DancingBear, but it will show a puppy
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
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <PawPrint className="w-7 h-7" />
          ¡Perrito Bailarín!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[320px]">
        <div
          // ref={imageContainerRef} // Comentado para simplificar
          className="group rounded-lg overflow-hidden shadow-md dancing-bear-animation" // Added animation class back
          style={{ width: '200px', height: '200px', border: '1px solid green' }} // Changed border to green for differentiation
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=200&auto=format&fit=crop" // Puppy image URL, matching size
            alt="Perrito labrador adorable bailando"
            width="200" // HTML attribute
            height="200" // HTML attribute
            className="object-cover w-full h-full"
            data-ai-hint="perrito bailarin"
            style={{ display: 'block' }} // Ensure it's not display:none
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">¡Este perrito baila solo para ti!</p>
      </CardContent>
    </Card>
  );
}
