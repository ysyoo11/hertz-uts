import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/backend/server/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const items = await prisma.item.findMany();

      if (items.length === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: 'Items not found.' });
      }

      return res.status(StatusCodes.OK).json(items);
    } catch (e) {
      console.error(e);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
};

export default handler;
