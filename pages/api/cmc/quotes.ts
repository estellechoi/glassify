import type { NextApiRequest, NextApiResponse } from 'next';
import { CMCResponse, cmc } from '.';

export type CMCQuoteData = Readonly<{
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: readonly Readonly<{
    category: string;
    name: string;
    slug: string;
  }>[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  is_active: 0 | 1;
  infinite_supply: 0 | 1;
  cmc_rank: number;
  is_fiat: 0 | 1;
  last_updated: string;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  tvl_ratio: number | null;
  platform: Readonly<{
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  }> | null;
  quote: Readonly<{
    USD: Readonly<{
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
      tvl: number | null;
    }>;
  }>;
}>;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        [symbol: string]: readonly CMCQuoteData[];
      }
    | undefined
  >
) => {
  const { symbol } = req.query;

  const cmcRes = await cmc
    .get<
      CMCResponse<{
        [symbol: string]: readonly CMCQuoteData[];
      }>
    >('/v2/cryptocurrency/quotes/latest', { params: { symbol } })
    .then((res) => res.data);

  const statusCode = cmcRes.status.error_code === 0 ? 200 : cmcRes.status.error_code;
  res.status(statusCode).json(cmcRes.data);
};

export default handler;
