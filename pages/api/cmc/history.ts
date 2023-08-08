import type { NextApiRequest, NextApiResponse } from 'next';
import { CMCResponse, cmc } from '.';

export type CMCHistoryDataItem = Readonly<{
  timestamp: string;
  quote: Readonly<{
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      circulating_supply: number;
      total_supply: number;
      timestamp: string;
    };
  }>;
}>;

export type CMCHistoryData = Readonly<{
  id: number;
  name: string;
  symbol: string;
  is_active: 0 | 1;
  is_fiat: 0 | 1;
  quotes: readonly CMCHistoryDataItem[];
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse<CMCHistoryData | undefined>) => {
  const { symbol } = req.query;
  const interval = '24h';

  const cmcRes = await cmc
    .get<CMCResponse<CMCHistoryData>>('/v2/cryptocurrency/quotes/historical', { params: { symbol, interval } })
    .then((res) => res.data);

  const statusCode = cmcRes.status.error_code === 0 ? 200 : cmcRes.status.error_code;
  res.status(statusCode).json(cmcRes.data);
};

export default handler;
