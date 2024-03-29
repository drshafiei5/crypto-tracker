"use client";

import axios from "axios";
import React, {
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import { useEffectOnce } from "react-use";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { imageSearch } from "@/constants";
import { GoogleRes } from "@/types/search";
import { CurrencyContext } from "../_contexts/cryptos-context";
import CryptoSlide from "./crypto-slide";

// slider for currenct currency (get images by google api)
const CurrencySlider = () => {
    const [images, setImages] = useState<string[]>([]);
    const prevCurrency = useRef<string>("");
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [showModal, setShowModal] = useState(false);
    console.log(currency);

    const getImages = useCallback(async (currency: string) => {
        if (currency) {
            const {
                data: { items },
            } = await axios.get<GoogleRes>(imageSearch(currency));
            setImages(items.map((item) => item.link));
        }
    }, []);

    useEffect(() => {
        if (currency !== prevCurrency.current) {
            getImages(currency);
            setShowModal(true);
            prevCurrency.current = currency;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    useEffectOnce(() => {
        return () => {
            setImages([]);
            setCurrency("");
            setShowModal(false);
        };
    });

    return images.length > 0 && showModal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto md:w-1/3 w-3/4">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
                            <h4 className="text-xl font-semibold">
                                تصاویر ارز{" "}
                                {currency.replace(" cryptocurrency", "")}
                            </h4>
                            
                            <button
                            className="text-xl text-black"
                                onClick={() => {
                                    setImages([]);
                                    setShowModal(false);
                                    setCurrency("");
                                }}
                            >
                                x
                            </button>
                        </div>
                        <div className="relative p-3 flex-auto">
                            <div className="flex items-center justify-center">
                                <div className="max-w-full">
                                    <Swiper
                                        navigation={true}
                                        modules={[Navigation]}
                                        className="homeSwiper"
                                    >
                                        {images.map((image, i) => (
                                            <SwiperSlide key={i}>
                                                <CryptoSlide
                                                    image={image}
                                                    currency={currency}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end px-3 py-2 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => {
                                    setImages([]);
                                    setShowModal(false);
                                    setCurrency("");
                                }}
                            >
                                بستن
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : null;
};

export default memo(CurrencySlider);
