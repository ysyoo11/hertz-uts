import { PostOrderResponse, type PostOrder } from '@/backend/order/model';
import { validatePostOrder } from '@/backend/order/validation';

import { fetcher } from './fetcher';

export default async function submitOrder(body: PostOrder) {
  const json = await validatePostOrder(body);

  return await fetcher
    .post('/api/order', {
      json,
    })
    .json<PostOrderResponse>();
}
