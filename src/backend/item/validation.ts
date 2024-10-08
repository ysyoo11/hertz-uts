import { type Item } from '@prisma/client';
import { z } from 'zod';

import { MAX_RENTAL_DAYS } from '@/defines/policy';
import { type Params } from 'types';

export async function validateItems(params: Params): Promise<Item[]> {
  const schema = z
    .object({
      id: z.number(),
      category: z.enum(['sedan', 'suv', 'wagon']),
      availability: z.literal(true),
      brand: z.string(),
      model: z.string(),
      year: z.string(),
      mileage: z.number(),
      fuel: z.enum(['electricity', 'petrol']),
      range: z.number().nullable().optional(),
      seats: z.number().min(1).max(10),
      bags: z.number().min(1).max(10),
      pricePerDay: z.number(),
      description: z.string(),
      imageSrc: z.string(),
      rentalDays: z.number().min(1).max(MAX_RENTAL_DAYS),
    })
    .array();
  return (await schema.parseAsync(params)) as Item[];
}
