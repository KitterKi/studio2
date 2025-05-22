'use server';

/**
 * @fileOverview Un flujo para personalizar un mensaje declarando a la novia del usuario como la mejor.
 *
 * - personalizeMessage - Una función que personaliza el mensaje con detalles de la relación.
 * - PersonalizeMessageInput - El tipo de entrada para la función personalizeMessage.
 * - PersonalizeMessageOutput - El tipo de retorno para la función personalizeMessage.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeMessageInputSchema = z.object({
  relationshipDetails: z
    .string()
    .describe('Detalles sobre la relación para personalizar el mensaje.'),
});
export type PersonalizeMessageInput = z.infer<typeof PersonalizeMessageInputSchema>;

const PersonalizeMessageOutputSchema = z.object({
  personalizedMessage: z.string().describe('El mensaje personalizado declarando a la novia como la mejor.'),
});
export type PersonalizeMessageOutput = z.infer<typeof PersonalizeMessageOutputSchema>;

export async function personalizeMessage(input: PersonalizeMessageInput): Promise<PersonalizeMessageOutput> {
  return personalizeMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeMessagePrompt',
  input: {schema: PersonalizeMessageInputSchema},
  output: {schema: PersonalizeMessageOutputSchema},
  prompt: `Eres un generador de mensajes emotivos. Por favor, personaliza el siguiente mensaje basándote en los detalles de la relación proporcionados. El mensaje debe declarar que la novia del usuario es la mejor e incorporar detalles específicos de su relación para hacerlo más personal y conmovedor.\n\nDetalles de la relación: {{{relationshipDetails}}}\n\nMensaje Personalizado:`,
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
