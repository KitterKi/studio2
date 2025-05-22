"use client";

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { personalizeMessage, type PersonalizeMessageInput } from '@/ai/flows/personalize-message';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const formSchema = z.object({
  relationshipDetails: z.string().min(10, {
    message: "¡Por favor, comparte un poco más! (mín. 10 caracteres)",
  }).max(500, {
    message: "¡Eso es mucho amor! (máx. 500 caracteres)",
  }),
});

interface PersonalizeMessageFormProps {
  onMessagePersonalized: (newMessage: string) => void;
  initialMessage: string;
}

export const PersonalizeMessageForm: FC<PersonalizeMessageFormProps> = ({ onMessagePersonalized, initialMessage }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      relationshipDetails: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const input: PersonalizeMessageInput = {
        relationshipDetails: values.relationshipDetails,
      };
      const result = await personalizeMessage(input);
      onMessagePersonalized(result.personalizedMessage);
      toast({
        title: "¡Mensaje Personalizado! ✨",
        description: "Se ha añadido tu toque único.",
      });
    } catch (error) {
      console.error("Error personalizing message:", error);
      toast({
        title: "¡Oh, no! Algo salió mal.",
        description: "No se pudo personalizar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      // Keep the initial message if AI fails
      onMessagePersonalized(initialMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
            <Wand2 className="w-7 h-7" />
            ¡Hazlo Tuyo!
        </CardTitle>
        <CardDescription>
          Añade algunos detalles sobre tu relación y deja que la IA añada un toque extra de magia a tu mensaje.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="relationshipDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Los Detalles Especiales de Tu Relación</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: ¿Recuerdas aquella vez que... / Ella siempre me hace reír cuando..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Personalizando...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Personalizar Mensaje
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
