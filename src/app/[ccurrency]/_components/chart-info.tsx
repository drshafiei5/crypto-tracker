"use client";

import React, { memo, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import dynamic from "next/dynamic";
import { ICryptoQuote, IPoints, TCryptoPrice } from "@/types/crypto";
import { API_URL_SOCKET, socketDetailA, socketDetailB } from "@/constants";
import { currencies } from "@/utils/currencies";
import { useSearchParams } from "next/navigation";
import { usePrevious } from "react-use";

const CryptoCurrencyChart = dynamic(() => import("./ccurrency-chart"), {
    ssr: false,
});

interface ChartInfoProps {
    points: IPoints;
    ccurrency: string;
    rate: ICryptoQuote;
}

// get chart info and update by details websocket
const ChartInfo = ({ points, ccurrency, rate }: ChartInfoProps) => {
    const searchParams = useSearchParams();
    const currency = searchParams?.get("currency");
    const cryptoId = searchParams?.get("cryptoId");
    const [newPoint, setNewPoint] = useState<number[]>([]);
    const prevPoint = usePrevious(newPoint);

    const [additionalData, setAdditionalData] = useState<{
        p24h?: number;
        price?: string;
    }>({});

    const newestPrice = useMemo(
        () => points[Object.keys(points)[Object.keys(points).length - 1]].v[0],
        [points]
    );

    const { sign } = useMemo(
        () => currencies.find((c) => c.symbol === currency),
        [currency]
    );

    const priceColor = useMemo(() => {
        return +newPoint[1] > +prevPoint?.[1] || !prevPoint?.[1]
            ? "text-green-500"
            : "text-red-500";
    }, [newPoint, prevPoint]);

    // call websocket for live crypto data
    const { sendMessage } = useWebSocket<TCryptoPrice>(
        `${API_URL_SOCKET}?device=web&client_source=coin_detail_page`,
        {
            onOpen: () => {
                sendMessage(JSON.stringify(socketDetailA(+cryptoId)));
                sendMessage(JSON.stringify(socketDetailB(+cryptoId)));
            },
            onMessage: (event: MessageEvent<string>) => {
                if (event.data !== "undefined") {
                    const price = JSON.parse(event.data) as TCryptoPrice;
                    if ("d" in price && "t" in price) {
                        const { d, t } = price;
                        const p24h = +(d.p24h - rate.percentChange24h).toFixed(
                            2
                        );

                        const newPrice = +(
                            d.p * (1 / rate?.price || 1)
                        ).toFixed(newestPrice > 1 ? 2 : 8);

                        document.title = `BTC ${newPrice}(${p24h}%)`;

                        setNewPoint([
                            +t,
                            newPrice,
                            "v" in d
                                ? Math.round(+(+d.v * (1 / rate.price)))
                                : 0,
                        ]);

                        setAdditionalData({
                            p24h: +(d.p24h - rate.percentChange24h).toFixed(2),
                            price:
                                (d.p * (1 / rate.price)).toLocaleString() +
                                sign,
                        });
                    }
                }
            },
        }
    );

    return (
        <div className="p-3">
            <div className="max-w-full rounded overflow-hidden shadow-lg bg-white p-2">
                <div className="px-3 py-4">
                    <div className="font-bold text-xl mb-2">
                        اطلاعات ارز دیجیتال {ccurrency}
                    </div>
                    <p className="text-gray-700 text-base">
                        با هاور روی هر نقطه از نمودار از جزییات ارز مطلع می
                        شوید. همچنین قیمت به صورت به روز در عنوان صفحه و نمودار
                        آپدیت می شود.
                    </p>
                </div>
                <div className="flex items-center">
                    {additionalData?.p24h && additionalData?.price ? (
                        <p className="flex items-center gap-2 px-3 py-1">
                            <span className={"text-sm font-bold ltr"}>
                                ({additionalData.p24h}% روزانه)
                            </span>
                            <span
                                className={
                                    "text-2xl text-gray-700 " + priceColor
                                }
                            >
                                {additionalData.price}
                            </span>
                        </p>
                    ) : (
                        <span className="text-green-500 text-sm font-bold px-3 py-1">
                            در حال گرفتن آخرین قیمت...
                        </span>
                    )}
                </div>
                {rate?.price && (
                    <CryptoCurrencyChart
                        rate={rate}
                        points={points}
                        name={ccurrency}
                        newPoint={newPoint}
                    />
                )}
            </div>
        </div>
    );
};

export default memo(
    ChartInfo,
    (prevProps: ChartInfoProps, nextProps: ChartInfoProps) =>
        JSON.stringify(nextProps) === JSON.stringify(prevProps)
);
