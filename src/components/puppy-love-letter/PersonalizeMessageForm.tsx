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
    message: "Please share a bit more! (min. 10 characters)",
  }).max(500, {
    message: "That's a lot of love! (max. 500 characters)",
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
        title: "Message Personalized! ✨",
        description: "Your unique touch has been added.",
      });
    } catch (error) {
      console.error("Error personalizing message:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Could not personalize the message. Please try again.",
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
            Make it Yours!
        </CardTitle>
        <CardDescription>
          Add a few details about your relationship, and let AI sprinkle some extra magic on your message.
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
                  <FormLabel>Your Special Relationship Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Remember that time we... / She always makes me laugh when..."
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
                  Personalizing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Personalize Message
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
