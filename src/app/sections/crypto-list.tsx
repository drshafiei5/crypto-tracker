import React, { useEffect, useMemo, useRef, useState } from "react";
import TrackerHead from "../_components/tracker-head";
import { ICryptoItem, ICryptoQuote, TCryptoPrice } from "@/types/crypto";
import { API_URL_SOCKET, socketParamsA, socketParamsB } from "@/constants";
import { mapCoin } from "@/utils/map-coin";
import useWebSocket from "react-use-websocket";
import { useSearchParams } from "next/navigation";
import TrackerList from "../_components/tracker-list";

interface CryptoListProps {
    cryptos: ICryptoItem[];
    rate: ICryptoQuote;
    search: string;
}


// render cryptos and update data by websocket
const CryptoList = ({ cryptos, rate, search }: CryptoListProps) => {
    const searchParams = useSearchParams();
    const currency = searchParams?.get("currency") || "USD";
    const prevCurrency = useRef("");

    const initCryptos = useMemo(() => {
        return cryptos;
    }, [cryptos]);

    const ids = useMemo(() => {
        return cryptos.map((c) => c.id);
    }, [cryptos]);

    // states for live crypto prices
    const [data, setData] = useState<ICryptoItem[]>(initCryptos);

    // call websocket for live crypto prices
    const { sendMessage } = useWebSocket<TCryptoPrice>(
        `${API_URL_SOCKET}?device=web&client_source=home_page`,
        {
            onOpen: () => {
                sendMessage(JSON.stringify(socketParamsA(ids)));
                sendMessage(JSON.stringify(socketParamsB(ids)));
            },
            onMessage: (event) => {
                if (event.data !== "undefined") {
                    const price = JSON.parse(event.data) as TCryptoPrice;
                    if ("d" in price) {
                        const { d } = price;
                        setData((data) => {
                            return data.map((c) => {
                                if (+c.id === +d.id) {
                                    const quotes = c.quotes.map(
                                        (q) =>
                                            // q.name === currency
                                            //     ?
                                            ({ ...q, ...mapCoin(d, rate) })
                                        // : q
                                    );

                                    return { ...c, quotes };
                                }

                                return c;
                            });
                        });
                    }
                }
            },
        }
    );

    useEffect(() => {
        if (
            prevCurrency.current.length > 0 &&
            prevCurrency.current !== currency
        ) {
            setData((data) => {
                return data.map((c) => {
                    const quotes = c.quotes.map((q) => ({
                        ...q,
                        price: 0,
                        marketCap: 0,
                        percentChange1h: 0,
                        percentChange90d: 0,
                        ytdPriceChangePercentage: 0,
                        percentChange24h: 0,
                        percentChange7d: 0,
                        percentChange30d: 0,
                        volume24h: 0,
                    }));

                    return { ...c, quotes };
                });
            });
        }
        prevCurrency.current = currency;
    }, [currency, rate]);

    if (!rate) {
        return null;
    }

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 px-4 mx-auto mt-8">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <h3 className="font-semibold text-base text-blueGray-700">
                                لیست قیمت ارزهای دیجیتال
                            </h3>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <TrackerHead />
                            <TrackerList
                                data={data.filter(
                                    (c) =>
                                        c.name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        c.symbol
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                )}
                                currency={currency}
                            />
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CryptoList;
