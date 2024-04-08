import { z } from 'zod';

import { MAX_RENTAL_DAYS } from '@/defines/policy';

import { states, type PostOrder, paymentMethods, carCategories } from './model';

import type { Params } from 'types';

export async function validatePostOrder(params: Params): Promise<PostOrder> {
  const schema = z.object({
    customerInfo: z.object({
      firstName: z
        .string()
        .min(1, 'You should enter your first name')
        .max(30, 'Your first name should not exceed 30 characters'),
      lastName: z
        .string()
        .min(1, 'You should enter your last name')
        .max(30, 'Your last name should not exceed 30 characters'),
      address1: z
        .string()
        .min(1, 'You should enter your address')
        .max(50, 'Your address line 1 should not exceed 50 characters'),
      address2: z
        .string()
        .max(50, 'Your address line 2 should not exceed 50 characters')
        .optional(),
      city: z
        .string()
        .min(1, 'You should enter city')
        .max(20, 'Your city should not exceed 20 characters'),
      postcode: z
        .string()
        .min(1, 'You should enter postcode')
        .max(4, 'Your city should not exceed 4 characters'),
      state: z.enum(states),
      email: z
        .string()
        .min(1, { message: 'Your email has to be filled.' })
        .email('Please enter a valid email address.'),
      phone: z
        .string()
        .min(9, { message: 'Must be a valid phone number' })
        .max(14, { message: 'Must be a valid phone number' }),
      payment: z.enum(paymentMethods),
    }),
    items: z
      .object({
        id: z.number(),
        category: z.enum(carCategories),
        availability: z.literal(true),
        brand: z.string(),
        model: z.string(),
        year: z.string(),
        mileage: z.number(),
        fuel: z.enum(['electricity', 'petrol']),
        range: z.number().nullable().optional(),
        seats: z.number().min(1).max(10),
        bags: z.number().min(1).max(12),
        pricePerDay: z.number().min(10),
        description: z.string(),
        imageSrc: z.string(),
        rentalDays: z.number().min(1).max(MAX_RENTAL_DAYS),
      })
      .array(),
  });

  return (await schema.parseAsync(params)) as PostOrder;
}
