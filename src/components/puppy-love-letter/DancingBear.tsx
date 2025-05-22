
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export function DancingBear() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <Gift className="w-7 h-7" />
          ¡Un Amigo Flotante!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px]">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1600205908901-775090689507?w=600&auto=format&fit=crop&q=80"
            alt="Patito de hule divertido"
            width={200}
            height={200}
            data-ai-hint="patito hule"
            className="drop-shadow-xl rounded-md object-cover"
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">¡Este patito flota solo para ti!</p>
      </CardContent>
    </Card>
  );
}
