import React from "react";
import { cmcInstance } from "@/utils/axios";
import {
    ICoinmarketcapRes,
    ICryptoConversion,
    IPointsData,
} from "@/types/crypto";
import ChartInfo from "./_components/chart-info";
import { currencies } from "@/utils/currencies";
import { defaultCurrency } from "@/constants";

interface CurrencyPageArgs {
    params: { ccurrency: string };
    searchParams: { cryptoId: number; currency: string };
}

// function for all metadata(title, ...)
export async function generateMetadata({
    params: { ccurrency },
}: CurrencyPageArgs) {
    return {
        title: `${ccurrency}`,
        description: "قیمت ارزهای دیجیتال",
    };
}

// get chart data for currenct crypto
const getChartData = async (id: number) => {
    const res = await cmcInstance.get<ICoinmarketcapRes<IPointsData>>(
        `/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=ALL`
    );

    return res;
};

// get Conversion for currenct crypto
const getConversion = async (currency: string) => {
    const { id } = currencies.find((c) => c.symbol === currency);
    const url = `/data-api/v3/cryptocurrency/quote/latest?id=${id}&convertId=${defaultCurrency.id}`;
    const res = await cmcInstance.get<ICoinmarketcapRes<ICryptoConversion[]>>(
        url
    );

    return res;
};

// crypto details page
const page = async ({
    params: { ccurrency },
    searchParams: { cryptoId, currency },
}: CurrencyPageArgs) => {
    const [
        {
            data: { data: chartData },
        },
        {
            data: { data: coversion },
        },
    ] = await Promise.all([getChartData(cryptoId), getConversion(currency)]);

    return (
        <div>
            <ChartInfo
                points={chartData.points}
                ccurrency={ccurrency}
                rate={coversion[0].quotes[0]}
            />
        </div>
    );
};

export default page;
