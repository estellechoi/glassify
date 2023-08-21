import type { NextApiRequest, NextApiResponse } from 'next';
import { CMCResponse, cmc } from '.';

export type CMCListingItemData = Readonly<{
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  infinite_supply: boolean;
  last_updated: string;
  max_supply: number | null;
  name: string;
  num_market_pairs: number;
  platform: Readonly<{
    id: number;
    name: string;
    slug: string;
    symbol: string;
    token_address: string;
  }>;
  quote: Readonly<{
    USD: {
      volume_24h: number;
      volume_change_24h: number;
      tvl: number | null;
      price: number;
      percent_change_90d: number;
      percent_change_60d: number;
      percent_change_30d: number;
      percent_change_7d: number;
      percent_change_24h: number;
      percent_change_1h: number;
      market_cap_dominance: number;
      market_cap: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  }>;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  slug: string;
  symbol: string;
  tags: readonly string[];
  total_supply: number;
  tvl_ratio: number | null;
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse<readonly CMCListingItemData[] | undefined>) => {
  const cmcRes = await cmc
    .get<CMCResponse<readonly CMCListingItemData[]>>('/v1/cryptocurrency/listings/latest', { params: req.query })
    .then((res) => res.data);

  const statusCode = cmcRes.status.error_code === 0 ? 200 : cmcRes.status.error_code;
  res.status(statusCode).json(cmcRes.data);
};

export default handler;
