import { ICryptoData, ICryptoQuote } from "@/types/crypto";

// update coin informations by currenct currency info
export const mapCoin = (price: ICryptoData, rate: ICryptoQuote) => {
    
    return {
        price: price.p * (1/ rate?.price),
        marketCap: Math.round(+(price.mc * (1/ rate?.price))),
        ...("p1h" in price && { percentChange1h: +(price.p1h - rate?.percentChange1h).toFixed(2) }),
        percentChange24h: +(price.p24h - rate?.percentChange24h).toFixed(2),
        percentChange7d: +(price.p7d - rate?.percentChange7d).toFixed(2),
        percentChange30d: +(price.p30d - rate?.percentChange30d).toFixed(2),
        ...("p3m" in price && { percentChange90d: +(price.p3m - rate?.percentChange90d).toFixed(2) }),
        ...("pytd" in price && { ytdPriceChangePercentage: +(price.pytd - rate?.percentChangeYtd).toFixed(2) }),
        ...("v" in price && {
            volume24h:  Math.round(+(+price.v * (1/ rate?.price))),
        }),
    };
};
