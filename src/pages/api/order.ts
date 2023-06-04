import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import { validatePostOrder } from '@/backend/order/validation';
import prisma from '@/backend/server/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { customerInfo, items } = await validatePostOrder(req.body);

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
      return res.status(StatusCodes.CREATED).json({ id: newOrder.id });
    } catch (e) {
      console.error(e);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
};

export default handler;
