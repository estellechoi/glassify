export enum CoinId {
  // ATOM = 'cosmos',
  CRE = 'crescent-network',
  // BCRE = 'liquid-staking-crescent',
  // LUNA = 'terra-luna-2',
  // AXL = 'axelar',
  // AGORIC = 'agoric',
  // CANTO = 'canto',
  // INJ = 'injective',
  // EVMOS = 'evmos',
  // USDC_AXL = 'axlusdc',
  // JUNO = 'juno-network',
  // IST = 'inter-stable-token',
  // WETH_AXL = 'axlweth',
  // MARS = 'mars',
  // OSMOSIS = 'osmosis',
  // // ethereum coins
  // AAVE = 'aave',
  // ZEROX = '0x',
  // ONE_INCH = '1inch',
  // DOGE = 'dogecoin',
  // USDC = 'usd-coin',
}

export type CoinCeckoCoin = {
  id: string;
  name: string;
  symbol: string;
};

export type FiatValue = { usd: number; krw: number };

export type CoinCeckoCoinDetail = {
  readonly asset_platform_id: string;
  readonly block_time_in_minutes: number;
  readonly categories: string[];
  readonly coingecko_rank: number;
  readonly coingecko_score: number;
  readonly community_data: {
    readonly facebook_likes: number;
    readonly reddit_average_posts_48h: number;
    readonly reddit_average_comments_48h: number;
    readonly reddit_subscribers: number;
    readonly reddit_accounts_active_48h: number;
    readonly telegram_channel_user_count: number;
  };
  readonly community_score: number;
  readonly country_origin: string;
  readonly description: {
    readonly en: string;
  };
  readonly developer_data: {
    readonly forks: number;
    readonly stars: number;
    readonly subscribers: number;
    readonly total_issues: number;
    readonly closed_issues: number;
    readonly pull_requests_merged: number;
    readonly pull_request_contributors: number;
    readonly code_additions_deletions_4_weeks: {
      readonly additions: number;
      readonly deletions: number;
    };
    readonly commit_count_4_weeks: number;
  };
  readonly developer_score: number;
  readonly genesis_date: string | null;
  readonly hashing_algorithm: string | null;
  readonly id: CoinId;
  readonly image: {
    readonly thumb: string;
    readonly large: string;
    readonly small: string;
  };
  readonly last_updated: string;
  readonly links: {
    readonly homepage: string[];
    readonly blockchain_site: string[];
    readonly official_forum_url: string[];
    readonly chat_url: string[];
    readonly announcement_url: string[];
    readonly twitter_screen_name: string;
    readonly facebook_username: string;
    readonly bitcointalk_thread_identifier: number;
    readonly telegram_channel_identifier: string;
    readonly subreddit_url: string;
    readonly repos_url: {
      readonly github: string[];
      readonly bitbucket: string[];
    };
  };
  readonly liquidity_score: number;
  readonly localization: {
    readonly en: string;
    readonly de: string;
    readonly es: string;
    readonly fr: string;
    readonly it: string;
    readonly pl: string;
    readonly ro: string;
    readonly hu: string;
    readonly nl: string;
  };
  readonly market_cap_rank: number;
  readonly market_data: {
    readonly current_price: FiatValue;
    readonly total_value_locked: FiatValue | null;
    readonly ath: FiatValue;
    readonly ath_change_percentage: FiatValue;
    readonly ath_date: {
      readonly usd: string;
      readonly krw: string;
    };
    readonly atl: FiatValue;
    readonly atl_change_percentage: FiatValue;
    readonly atl_date: {
      readonly usd: string;
      readonly krw: string;
    };
    readonly market_cap: FiatValue;
    readonly market_cap_change_24h: number;
    readonly market_cap_change_percentage_24h: number;
    readonly market_cap_rank: number;
    readonly fully_diluted_valuation: FiatValue;
    readonly total_volume: FiatValue;
    readonly high_24h: FiatValue;
    readonly low_24h: FiatValue;
    readonly price_change_24h: number;
    readonly price_change_percentage_24h: number;
    readonly price_change_percentage_7d: number;
    readonly price_change_percentage_14d: number;
    readonly price_change_percentage_30d: number;
    readonly price_change_percentage_60d: number;
    readonly price_change_percentage_200d: number;
    readonly price_change_percentage_1y: number;
    readonly price_change_24h_in_currency: FiatValue;
    readonly price_change_percentage_1h_in_currency: FiatValue;
    readonly price_change_percentage_24h_in_currency: FiatValue;
    readonly price_change_percentage_7d_in_currency: FiatValue;
    readonly price_change_percentage_14d_in_currency: FiatValue;
    readonly price_change_percentage_30d_in_currency: FiatValue;
    readonly price_change_percentage_60d_in_currency: FiatValue;
    readonly price_change_percentage_200d_in_currency: FiatValue;
    readonly price_change_percentage_1y_in_currency: FiatValue;
    readonly market_cap_change_24h_in_currency: FiatValue;
    readonly market_cap_change_percentage_24h_in_currency: FiatValue;
    readonly circulating_supply: number;
    readonly total_supply: number;
    readonly max_supply: number | null;
    readonly mcap_to_tvl_ratio: number | null;
    readonly fdv_to_tvl_ratio: number | null;
    readonly roi: {
      readonly times: number;
      readonly currency: string;
      readonly percentage: number;
    } | null;
    readonly last_updated: string;
  };
};
