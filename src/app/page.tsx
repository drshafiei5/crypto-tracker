import React from "react";
import Crypto from "@/app/_components/crypto";
import { cmcInstance } from "@/utils/axios";
import {
    ICoinmarketcapRes,
    ICryptoConversion,
    ICryptoListData,
} from "@/types/crypto";
import { aux, defaultCurrency } from "@/constants";
import { currencies } from "@/utils/currencies";

interface HomePageArgs {
    params: {};
    searchParams: { currency: string };
}

// get Cryptos list
const getCryptos = async (currency: string) => {
    const url = `/data-api/v3/cryptocurrency/listing?limit=100&sortBy=market_cap&sortType=desc&aux=${aux.join(
        ","
    )}&convert=${currency}`;

    const res = await cmcInstance.get<ICoinmarketcapRes<ICryptoListData>>(url);
    return res;
};

// get Conversion data for currenct currency
const getConversion = async (currency: string) => {
    const { id } = currencies.find((c) => c.symbol === currency);
    const url = `/data-api/v3/cryptocurrency/quote/latest?id=${id}&convertId=${defaultCurrency.id}`;
    const res = await cmcInstance.get<ICoinmarketcapRes<ICryptoConversion[]>>(
        url
    );

    return res;
};

export const revalidate = 60;

// home page (cryptos)
const HomePage = async ({
    searchParams: { currency = "USD" },
}: HomePageArgs) => {
    const [
        {
            data: { data: cryptos },
        },
        {
            data: { data: coversion },
        },
    ] = await Promise.all([getCryptos(currency), getConversion(currency)]);

    return (
        <div>
            <Crypto
                cryptos={cryptos?.cryptoCurrencyList || []}
                rate={coversion[0].quotes[0]}
            />
        </div>
    );
};

export default HomePage;
