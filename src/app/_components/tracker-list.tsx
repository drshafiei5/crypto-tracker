import React, { memo } from "react";
import TrackerItem from "./tracker-item";
import { ICryptoItem } from "@/types/crypto";

interface TrackerListProps {
    data: ICryptoItem[];
    currency: string;
}

// render list for crypto
const TrackerList = ({ data,currency }: TrackerListProps) => {
    return (
        <tbody>
            {data.map((coin) => (
                <TrackerItem key={coin.id}  currency={currency} {...coin} />
            ))}
        </tbody>
    );
};

export default memo(
    TrackerList,
    (prevProps: TrackerListProps, nextProps: TrackerListProps) =>
        JSON.stringify(nextProps) === JSON.stringify(prevProps)
);

