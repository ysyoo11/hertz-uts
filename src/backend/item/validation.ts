import { z } from 'zod';

import { Item } from '@/components/hertz-context';
import { MAX_RENTAL_DAYS } from '@/defines/policy';
import { Params } from 'types';

export async function validateItems(params: Params): Promise<Item[]> {
  const schema = z
    .object({
      id: z.string(),
      category: z.enum(['sedan', 'suv', 'wagon']),
      availability: z.boolean(),
      brand: z.string(),
      model: z.string(),
      year: z.string(),
      mileage: z.number(),
      fuel: z.enum(['electricity', 'petrol']),
      range: z.number().optional(),
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
