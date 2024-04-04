"use client";

import React, { Dispatch, SetStateAction, useCallback } from 'react'
import CurrencySelector from './currency-selector';
import { useRouter } from 'next/navigation';
import { currencies } from '@/utils/currencies';


interface CryptoHeaderProps {
    setSearch: Dispatch<SetStateAction<string>>
}

const CryptoHeader = ({ setSearch }: CryptoHeaderProps) => {
    const router = useRouter();

    const changeCurrency = useCallback(
        (currencyId: number) => {
            const { symbol } = currencies.find((c) => c.id === currencyId);
            router.push(`/?currency=${symbol}`);
        },
        [router]
    );

    return (
        <form className="flex items-center justify-center gap-2">
            <div className="w-[300px]">
                <CurrencySelector
                    onChange={(val) => changeCurrency(val.value)}
                />
            </div>
            <div className="ltr">
                <label
                    htmlFor="search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search"
                        className="outline-none block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                        placeholder="جستجو"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
            </div>
        </form>
    )
}

export default CryptoHeader