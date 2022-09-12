// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { render2String, addCount } from '../../server/ssr';
type Data = {
  value: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.warn('handling===>', req.body);
  const { method } = req.body as { method: string, payload: unknown }
  if (method === 'add_count') {
    addCount()
  } else if (method !== 'init') {
    throw new Error(`unknown method ${method}`)
  }
  res.status(200).json({ value: `${render2String()}` })
}
