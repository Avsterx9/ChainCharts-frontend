export interface CryptoTokenDescription{
    id: string;
    symbol: string;
    name: string;
    web_slug: string;
    asset_platform_id: any;
    block_time_in_minutes: number;
    hashing_algorithm: string;
    categories: string[];
    preview_listing: boolean;
    public_notice: any;
    additional_notices: any[];
    description: DescriptionContainer;
    links: Links;
    image: Image;
    country_origin: string;
    genesis_date: string;
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    watchlist_portfolio_users: number;
    market_cap_rank: number;
    market_data: MarketData;
    community_data: CommunityData;
    developer_data: DeveloperData;
    status_updates: any[];
    last_updated: Date;
}

export interface PriceContainer {
    bch: number;
    btc: number;
    eth: number;
    eur: number;
    gbp: number;
    jpy: number;
    pln: number;
    xrp: number;
}

export interface DateContainer {
    bch: string;
    btc: string;
    eth: string;
    eur: string;
    gbp: string;
    jpy: string;
    pln: string;
    xrp: string;
}

export interface DescriptionContainer {
    en: string;
    de: string;
    es: string;
    fr: string;
    it: string;
    pl: string;
}

export interface CommunityData {
    facebook_likes: any;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: any;
}

export interface ConvertedLast {
    btc: number;
    eth: number;
    usd: number;
}

export interface ConvertedVolume {
    btc: number;
    eth: number;
    usd: number;
}

export interface DeveloperData {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    commit_count_4_weeks: number;
}

export interface Image {
    thumb: string;
    small: string;
    large: string;
}

export interface Links {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: ReposUrl;
}

export interface Market {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
}

export interface MarketData {
    current_price: PriceContainer;
    total_value_locked: any;
    mcap_to_tvl_ratio: any;
    fdv_to_tvl_ratio: any;
    roi: any;
    ath: PriceContainer;
    ath_change_percentage: PriceContainer;
    ath_date: DateContainer;
    atl: PriceContainer;
    atl_change_percentage: PriceContainer;
    atl_date: DateContainer;
    market_cap: PriceContainer;
    market_cap_rank: number;
    fully_diluted_valuation: PriceContainer;
    market_cap_fdv_ratio: number;
    total_volume: PriceContainer;
    high_24h: PriceContainer;
    low_24h: PriceContainer;
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: PriceContainer;
    price_change_percentage_1h_in_currency: PriceContainer;
    price_change_percentage_24h_in_currency: PriceContainer;
    price_change_percentage_7d_in_currency: PriceContainer;
    price_change_percentage_14d_in_currency: PriceContainer;
    price_change_percentage_30d_in_currency: PriceContainer;
    price_change_percentage_60d_in_currency: PriceContainer;
    price_change_percentage_200d_in_currency: PriceContainer;
    price_change_percentage_1y_in_currency: PriceContainer;
    market_cap_change_24h_in_currency: PriceContainer;
    market_cap_change_percentage_24h_in_currency: PriceContainer;
    total_supply: number;
    max_supply: number | null;
    circulating_supply: number;
    last_updated: string;
}

export interface ReposUrl {
    github: string[];
    bitbucket: string[];
}