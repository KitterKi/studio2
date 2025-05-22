'use server';

/**
 * @fileOverview A flow to personalize a message declaring the user's girlfriend as the best.
 *
 * - personalizeMessage - A function that personalizes the message with relationship details.
 * - PersonalizeMessageInput - The input type for the personalizeMessage function.
 * - PersonalizeMessageOutput - The return type for the personalizeMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeMessageInputSchema = z.object({
  relationshipDetails: z
    .string()
    .describe('Details about the relationship to personalize the message.'),
});
export type PersonalizeMessageInput = z.infer<typeof PersonalizeMessageInputSchema>;

const PersonalizeMessageOutputSchema = z.object({
  personalizedMessage: z.string().describe('The personalized message declaring the girlfriend as the best.'),
});
export type PersonalizeMessageOutput = z.infer<typeof PersonalizeMessageOutputSchema>;

export async function personalizeMessage(input: PersonalizeMessageInput): Promise<PersonalizeMessageOutput> {
  return personalizeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeMessagePrompt',
  input: {schema: PersonalizeMessageInputSchema},
  output: {schema: PersonalizeMessageOutputSchema},
  prompt: `You are a heartfelt message generator. Please personalize the following message based on the relationship details provided. The message should declare the user's girlfriend as the best and incorporate specific details from their relationship to make it more personal and touching.\n\nRelationship Details: {{{relationshipDetails}}}\n\nPersonalized Message:`,
});

const personalizeMessageFlow = ai.defineFlow(
  {
    name: 'personalizeMessageFlow',
    inputSchema: PersonalizeMessageInputSchema,
    outputSchema: PersonalizeMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
