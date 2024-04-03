"use client";

import { memo, useState } from "react";
import dynamic from "next/dynamic";
import { BeatLoader } from "react-spinners";

import { ICryptoItem, ICryptoQuote } from "@/types/crypto";
import CurrencyWrapper from "../_contexts/cryptos-context";
import CryptoList from "../sections/crypto-list";
import CurrencySlider from "./currency-slider";

const CryptoHeader = dynamic(() => import("./crypto-header"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center min-h-[30px]">
            <BeatLoader color="white" />
        </div>
    ),
});

interface CryptoProps {
    cryptos: ICryptoItem[];
    rate: ICryptoQuote;
}

// Crypto component (handle change currency and render cryptos by child component)
const Crypto = ({ cryptos, rate }: CryptoProps) => {
    const [search, setSearch] = useState("");

    return (
        <CurrencyWrapper>
            <div className="px-3 pt-4">
                <CryptoHeader setSearch={setSearch} />
            </div>
            <CurrencySlider />
            <CryptoList cryptos={cryptos} search={search} rate={rate} />
        </CurrencyWrapper>
    );
};

export default memo(
    Crypto,
    (prevProps: CryptoProps, nextProps: CryptoProps) =>
        JSON.stringify(nextProps) === JSON.stringify(prevProps)
);
