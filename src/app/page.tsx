"use client";

import React, { useState } from 'react';
import { AppHeader } from '@/components/puppy-love-letter/AppHeader';
import { MessageDisplay } from '@/components/puppy-love-letter/MessageDisplay';
import { PersonalizeMessageForm } from '@/components/puppy-love-letter/PersonalizeMessageForm';
import { PuppyGallery } from '@/components/puppy-love-letter/PuppyGallery';
import { DancingBear } from '@/components/puppy-love-letter/DancingBear';
import { MusicSelector } from '@/components/puppy-love-letter/MusicSelector';
import { PawPrint } from 'lucide-react';

const initialHeartfeltMessage = "Mi Amor Más Querido,\n\nEres el sol en mis días nublados, la risa que ilumina mi mundo y la calma en cada una de mis tormentas. En pocas palabras, eres la mejor, y mi corazón late solo por ti. Cada momento contigo es un regalo precioso que atesoro más de lo que las palabras pueden expresar.\n\nPor siempre y para siempre tuyo,";

export default function PuppyLoveLetterPage() {
  const [currentMessage, setCurrentMessage] = useState(initialHeartfeltMessage);

  const handleMessagePersonalized = (newMessage: string) => {
    setCurrentMessage(newMessage);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8 selection:bg-accent selection:text-accent-foreground">
      <AppHeader />
      
      <main className="container mx-auto max-w-4xl grid gap-8 md:gap-12">
        <MessageDisplay message={currentMessage} />
        
        <PersonalizeMessageForm 
          onMessagePersonalized={handleMessagePersonalized} 
          initialMessage={initialHeartfeltMessage} 
        />
        
        <PuppyGallery />
        
        <DancingBear />
        
        <MusicSelector />
      </main>

      <footer className="py-8 mt-12 text-center text-muted-foreground">
        <p className="flex items-center justify-center gap-2">
          ¡Hecho con mucho <PawPrint className="inline-block h-5 w-5 text-accent" /> y amor!
        </p>
      </footer>
    </div>
  );
}
