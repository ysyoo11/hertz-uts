import fsPromises from 'fs/promises';
import path from 'path';

import { Item } from '@prisma/client';

export const filePath = path.join(process.cwd(), 'public/cars.json');

export async function getCars(): Promise<Item[]> {
  const jsonData = (await fsPromises.readFile(filePath)).toString();

  return JSON.parse(jsonData);
}
