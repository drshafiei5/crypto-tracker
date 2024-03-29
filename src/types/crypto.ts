// socket types

export type ICryptoData = ICrypto5sData | ICrypto15sData;

export type TCryptoPrice =
    | {
          d: ICryptoData;
          t: string;
          c: string;
      }
    | ICrypto;

export interface ICrypto5sData {
    id: number;
    p: number;
    v: number;
    p1h: number;
    p24h: number;
    p7d: number;
    p30d: number;
    mc: number;
    d: number;
    vd: number;
}

export interface ICrypto15sData {
    id: number;
    p: number;
    p24h: number;
    p7d: number;
    p30d: number;
    p3m: number;
    p1y: number;
    pytd: number;
    pall: number;
    as: number;
    mc: number;
    fmc24hpc: number;
}

export interface ICrypto {
    id: number;
    code: number;
    msg: string;
}

// Coinmarketcap responses types
export interface ICoinmarketcapRes<T> {
    data: T;
    status: ICoinmarketcapStatus;
}

export interface ICoinmarketcapStatus {
    timestamp: Date;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
}

export interface ICryptoListData {
    cryptoCurrencyList: ICryptoItem[];
    totalCount: string;
}

export interface ICryptoItem {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    cmcRank: number;
    marketPairCount: number;
    circulatingSupply: number;
    selfReportedCirculatingSupply: number;
    totalSupply: number;
    maxSupply?: number;
    ath: number;
    atl: number;
    high24h: number;
    low24h: number;
    isActive: number;
    lastUpdated: Date;
    dateAdded: Date;
    quotes: ICryptoQuote[];
    isAudited: boolean;
    badges: number[];
    auditInfoList?: AuditInfoList[];
}

export interface AuditInfoList {
    coinId: string;
    auditor: string;
    auditStatus: number;
    auditTime?: Date;
    reportUrl: string;
    score?: string;
    contractAddress?: string;
    contractPlatform?: string;
}

export interface ICryptoConversion {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    lastUpdatedTime: Date;
    quotes: ICryptoQuote[];
    dateAdded: Date;
    circulatingSupply: number;
    marketCapPercentChange: number;
    percentChange1y: number;
    rank?: number;
    maxSupply?: number;
    percent_change_1h?: number;
    marketCapPercentChange7d?: number;
    marketCapPercentChange30d?: number;
    marketCapPercentChange90d?: number;
    marketCapPercentChange1y?: number;
    marketCapPercentChangeAll?: number;
    percentChangeAll?: number;
}

export interface ICryptoQuote {
    name?: string;
    price: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    percentChange30d: number;
    percentChange90d: number;
    percentChangeYtd: number;
    marketCap: number;
    volume24h: number;
    lastUpdatedTime?: Date;
    ytdPriceChangePercentage?: number;
}

export interface ICryptoQuoteWithID extends ICryptoQuote {
    id: number;
}

export interface IPointsData {
    points: IPoints;
}

export interface IPoints {
    [x: string]: {
        v: number[];
        c?: number[] | undefined;
    };
}
