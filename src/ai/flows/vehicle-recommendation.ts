'use server';

/**
 * @fileOverview Provides personalized vehicle recommendations based on rental popularity and vehicle attributes.
 *
 * - getVehicleRecommendations - A function that returns vehicle recommendations.
 * - VehicleRecommendationInput - The input type for the getVehicleRecommendations function.
 * - VehicleRecommendationOutput - The return type for the getVehicleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VehicleAttributeSchema = z.object({
  brand: z.string().describe('The brand of the vehicle.'),
  model: z.string().describe('The model of the vehicle.'),
  category: z.string().describe('The category of the vehicle (e.g., SUV, Sedan, Truck).'),
  transmission: z.string().describe('The transmission type of the vehicle.'),
  seats: z.number().describe('The number of seats in the vehicle.'),
  fuelType: z.string().describe('The fuel type of the vehicle.'),
});

const VehicleRecommendationInputSchema = z.object({
  vehicleAttributes: VehicleAttributeSchema.describe('Attributes of the vehicle for which recommendations are needed.'),
  numberOfRecommendations: z.number().describe('The number of vehicle recommendations to return.'),
});
export type VehicleRecommendationInput = z.infer<typeof VehicleRecommendationInputSchema>;

const VehicleRecommendationOutputSchema = z.array(z.object({
  brand: z.string().describe('The brand of the recommended vehicle.'),
  model: z.string().describe('The model of the recommended vehicle.'),
  reason: z.string().describe('The reason why this vehicle is recommended based on popularity and attributes.'),
})).describe('An array of recommended vehicles with reasons for the recommendation.');

export type VehicleRecommendationOutput = z.infer<typeof VehicleRecommendationOutputSchema>;

export async function getVehicleRecommendations(input: VehicleRecommendationInput): Promise<VehicleRecommendationOutput> {
  return vehicleRecommendationFlow(input);
}

const vehicleRecommendationPrompt = ai.definePrompt({
  name: 'vehicleRecommendationPrompt',
  input: {schema: VehicleRecommendationInputSchema},
  output: {schema: VehicleRecommendationOutputSchema},
  prompt: `You are an expert vehicle recommendation system. Given the attributes of a vehicle, you will recommend other vehicles based on their popularity and similar attributes.

Vehicle Attributes: {{{vehicleAttributes}}}

Number of Recommendations: {{{numberOfRecommendations}}}

Respond with an array of recommended vehicles, each including the brand, model, and a reason for the recommendation based on popularity and similar attributes.  The reason should be no more than 20 words.
`
});

const vehicleRecommendationFlow = ai.defineFlow(
  {
    name: 'vehicleRecommendationFlow',
    inputSchema: VehicleRecommendationInputSchema,
    outputSchema: VehicleRecommendationOutputSchema,
  },
  async input => {
    const {output} = await vehicleRecommendationPrompt(input);
    return output!;
  }
);
