"use client";

import React, { useState } from 'react';
import { AppHeader } from '@/components/puppy-love-letter/AppHeader';
import { MessageDisplay } from '@/components/puppy-love-letter/MessageDisplay';
import { PersonalizeMessageForm } from '@/components/puppy-love-letter/PersonalizeMessageForm';
import { PuppyGallery } from '@/components/puppy-love-letter/PuppyGallery';
import { DancingBear } from '@/components/puppy-love-letter/DancingBear';
import { MusicSelector } from '@/components/puppy-love-letter/MusicSelector';
import { PawPrint } from 'lucide-react';

const initialHeartfeltMessage = "My Dearest Love,\n\nYou are the sunshine in my cloudy days, the laughter that brightens my world, and the calm in my every storm. Simply put, you are the best, and my heart beats only for you. Every moment with you is a precious gift I cherish more than words can say.\n\nForever and always yours,";

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
          Made with lots of <PawPrint className="inline-block h-5 w-5 text-accent" /> and love!
        </p>
      </footer>
    </div>
  );
}
