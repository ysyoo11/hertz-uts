import fsPromises from 'fs/promises';

import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import { validatePostOrder } from '@/backend/order/validation';
import prisma from '@/backend/server/prisma';
import { getCars, filePath as dataFilePath } from '@/lib/items/get-cars';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { customerInfo, items } = await validatePostOrder(req.body);

    const itemIds = items.map((item) => item.id);
    const updatedData = (await getCars()).map((item) =>
      itemIds.includes(item.id) ? { ...item, availability: false } : item
    );

    await fsPromises.writeFile(dataFilePath, JSON.stringify(updatedData));

    try {
      const newOrder = await prisma.order.create({
        data: {
          ...customerInfo,
          items: {
            connect: items.map((item) => ({ id: item.id })),
          },
        },
      });
      for (const item of items) {
        await prisma.item.update({
          where: {
            id: item.id,
          },
          data: {
            availability: false,
          },
        });
      }
      res.status(StatusCodes.CREATED).json({ id: newOrder.id });
    } catch (e) {
      console.error(e);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
};

export default handler;
