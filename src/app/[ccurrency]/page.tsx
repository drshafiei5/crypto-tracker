import React from "react";
import { cmcInstance } from "@/utils/axios";
import { ICoinmarketcapRes, IPointsData } from "@/types/crypto";
import ChartInfo from "./_components/chart-info";

interface CurrencyPageArgs {
    params: { ccurrency: string };
    searchParams: { cryptoId: number; currency: string };
}

// function for all metadata(title, ...)
export async function generateMetadata({ params: {ccurrency} }: CurrencyPageArgs) {
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

// crypto details page
const page = async ({
    params: { ccurrency },
    searchParams: { cryptoId, currency },
}: CurrencyPageArgs) => {
    const {
        data: { data },
    } = await getChartData(cryptoId);

    return (
        <div>
            <ChartInfo points={data.points} ccurrency={ccurrency} />
        </div>
    );
};

export default page;
