import { Heart } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center gap-3">
        <Heart className="w-10 h-10 text-accent" fill="currentColor" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
          Puppy Love Letter
        </h1>
        <Heart className="w-10 h-10 text-accent" fill="currentColor" />
      </div>
      <p className="mt-2 text-lg text-muted-foreground">For the best girlfriend in the world!</p>
    </header>
  );
}
