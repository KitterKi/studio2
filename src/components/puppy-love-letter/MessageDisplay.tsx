import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareHeart } from 'lucide-react';

interface MessageDisplayProps {
  message: string;
}

export const MessageDisplay: FC<MessageDisplayProps> = ({ message }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <MessageSquareHeart className="w-7 h-7" />
          Un Mensaje Especial Para Ti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed whitespace-pre-wrap text-foreground">
          {message}
        </p>
      </CardContent>
    </Card>
  );
};
