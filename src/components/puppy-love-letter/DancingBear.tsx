"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function DancingBear() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          {/* Usando un SVG simple de "fiesta" ya que no hay icono de oso directo en lucide */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.5A4.5 4.5 0 0 0 7.5 13h9a4.5 4.5 0 0 0-4.5 4.5Z"/><path d="M12 3v10"/><path d="M12 13a4.5 4.5 0 0 0-4.5-4.5v0A4.5 4.5 0 0 0 3 13q0 4.5 4.5 4.5Z"/><path d="M12 13a4.5 4.5 0 0 1 4.5-4.5v0A4.5 4.5 0 0 1 21 13q0 4.5-4.5 4.5Z"/><path d="M7.5 13X7.5 8.5"/><path d="M16.5 13X16.5 8.5"/></svg>
          ¡Osito Bailarín Suelto!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px]">
        <div className="dancing-bear-animation">
          <Image
            src="https://images.unsplash.com/photo-1530595467537-015e1088e034?q=80&w=600&auto=format&fit=crop"
            alt="Un oso pardo en la naturaleza"
            width={200}
            height={250}
            data-ai-hint="oso pardo"
            className="drop-shadow-xl rounded-md object-cover"
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">¡Este osito baila solo para ti!</p>
      </CardContent>
    </Card>
  );
}
