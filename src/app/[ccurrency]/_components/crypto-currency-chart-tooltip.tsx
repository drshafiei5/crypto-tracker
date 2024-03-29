import { memo } from "react";

interface CryptoCurrencyChartTooltipProps {
    price: number;
    volume: number;
    name: string;
    date: string;
    sign: string;
}

// custom tooltip for crypto chart
const CryptoCurrencyChartTooltip = ({
    price,
    volume,
    name,
    date,
    sign,
}: CryptoCurrencyChartTooltipProps) => {
    return (
        <div className="p-3 rtl text-right">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                قیمت {name}
            </h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                <li className="flex items-center">
                    <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    قیمت: {price.toLocaleString()} {sign}
                </li>

                <li className="flex items-center">
                    <svg
                        className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    حجم معاملات: {volume.toLocaleString()} {sign}
                </li>

                <li className="flex items-center">
                    <svg
                        className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 flex-shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    زمان:{" "}
                    {new Intl.DateTimeFormat("fa-IR").format(new Date(date))}
                </li>
            </ul>
        </div>
    );
};

export default memo(
    CryptoCurrencyChartTooltip,
    (
        prevProps: CryptoCurrencyChartTooltipProps,
        nextProps: CryptoCurrencyChartTooltipProps
    ) => JSON.stringify(nextProps) === JSON.stringify(prevProps)
);
