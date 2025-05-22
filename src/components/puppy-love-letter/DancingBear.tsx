import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Using an inline SVG for a generic bear icon as a simple dancing element for now.
// A proper bear icon from lucide-react like 'Bear' isn't available.
// This is a simplified bear shape.
const BearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
      <path d="M12 2C9.24 2 7 4.24 7 7c0 1.68.82 3.15 2.07 4.03L7 15v2h2v4h2v-4h2v4h2v-4h2v-2l-2.07-3.97C16.18 10.15 17 8.68 17 7c0-2.76-2.24-5-5-5zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zM6 19h12v2H6v-2z" />
    </svg>
  );
  

export function DancingBear() {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          {/* No direct bear icon in lucide, using a generic fun icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.5A4.5 4.5 0 0 0 7.5 13h9a4.5 4.5 0 0 0-4.5 4.5Z"/><path d="M12 3v10"/><path d="M12 13a4.5 4.5 0 0 0-4.5-4.5v0A4.5 4.5 0 0 0 3 13q0 4.5 4.5 4.5Z"/><path d="M12 13a4.5 4.5 0 0 1 4.5-4.5v0A4.5 4.5 0 0 1 21 13q0 4.5-4.5 4.5Z"/><path d="M7.5 13X7.5 8.5"/><path d="M16.5 13X16.5 8.5"/></svg>
          Groovy Bear on the Loose!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px]">
        <div className="dancing-bear-animation">
          <Image
            src="https://placehold.co/200x250.png"
            alt="A cute dancing bear"
            width={200}
            height={250}
            data-ai-hint="dancing bear illustration"
            className="drop-shadow-xl"
          />
        </div>
        <p className="mt-6 text-center text-muted-foreground">This bear dances just for you!</p>
      </CardContent>
    </Card>
  );
}
