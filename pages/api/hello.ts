// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const [test, setTest] = useState("123")
  return(
    res.status(200).json({ name: 'John Doe' })
  )
}
