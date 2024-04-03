"use client";

import React, { memo, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import ChangeValue from "./change-value";
import { ICryptoItem } from "@/types/crypto";
import { currencies } from "@/utils/currencies";
import Image from "next/image";
import { currencyImageUrl } from "@/constants";
import { CurrencyContext } from "../_contexts/cryptos-context";

// render cryptos row
const TrackerItem = ({
    quotes,
    name,
    circulatingSupply,
    symbol,
    currency,
    id,
}: ICryptoItem & { currency: string }) => {
    const [
        {
            price,
            percentChange1h,
            percentChange24h,
            percentChange30d,
            percentChange7d,
            percentChange90d,
            ytdPriceChangePercentage,
            marketCap,
            volume24h,
        },
    ] = quotes;

    const router = useRouter();
    const { setCurrency } = useContext(CurrencyContext);

    const { sign } = useMemo(
        () => currencies.find((c) => c.symbol === currency),
        [currency]
    );

    const goToDetail = () => {
        router.push(`/${symbol}?currency=${currency}&cryptoId=${id}`);
    };

    const goToGallery = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrency(name + " cryptocurrency");
    };

    return (
        <tr className="hover:bg-blue-50 cursor-pointer" onClick={goToDetail}>
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-right text-blueGray-700 w-[80px]">
                <div className="flex gap-3 items-center">
                    <Image
                        src={currencyImageUrl(id, 32)}
                        width={32}
                        height={32}
                        alt="Picture of the author"
                    />

                    <span>
                        {name || ""} ({symbol || ""})
                    </span>
                </div>
            </th>

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                {price.toLocaleString(undefined, {
                    maximumFractionDigits: price > 1 ? 2 : 8,
                })}{" "}
                {sign}
            </td>

            <ChangeValue value={percentChange1h} />
            <ChangeValue value={percentChange24h} />
            <ChangeValue value={percentChange7d} />
            <ChangeValue value={percentChange30d} />
            <ChangeValue value={percentChange90d} />
            <ChangeValue value={ytdPriceChangePercentage} />

            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                {marketCap?.toLocaleString() || 0} {sign}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 ltr text-right">
                {Math.round(circulatingSupply)?.toLocaleString() || 0} {symbol}
            </td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                {volume24h?.toLocaleString() || 0} {sign}
            </td>
            <td
                onClick={goToGallery}
                className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-blue-600 cursor-pointer font-bold"
            >
                گالری
            </td>
        </tr>
    );
};

export default memo(
    TrackerItem,
    (prevProps: ICryptoItem, nextProps: ICryptoItem) =>
        JSON.stringify(nextProps) === JSON.stringify(prevProps)
);
