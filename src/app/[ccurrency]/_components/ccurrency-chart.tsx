"use client";

import React, { useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useSearchParams } from "next/navigation";
import { activeButtonClx, buttonClx, oneDay, oneMonth } from "@/constants";
import { currencies } from "@/utils/currencies";
import CryptoCurrencyChartTooltip from "./crypto-currency-chart-tooltip";
import { ICryptoQuote, IPoints } from "@/types/crypto";

interface CryptoCurrencyChartProps {
    points: IPoints;
    name: string;
    rate: ICryptoQuote;
    newPoint: number[];
}

// crypto chart component
const CryptoCurrencyChart = ({
    points,
    name,
    rate,
    newPoint,
}: CryptoCurrencyChartProps) => {
    const searchParams = useSearchParams();
    const currency = searchParams?.get("currency");

    const { sign } = useMemo(
        () => currencies.find((c) => c.symbol === currency),
        [currency]
    );

    const newestPrice = useMemo(
        () => points[Object.keys(points)[Object.keys(points).length - 1]].v[0],
        [points]
    );

    const data = useMemo(() => {
        const out = [];

        for (var key in points) {
            const [price, volume] = points[key].v;
            const thePrice = +(price * (1 / rate?.price || 1)).toFixed(
                newestPrice > 1 ? 2 : 8
            );

            out.push([+key * 1000, thePrice, volume]);
        }

        return out;
    }, [newestPrice, points, rate?.price]);

    const firstPoint = useMemo(() => {
        return data[0];
    }, [data]);

    // last point related to socket
    const lastPoint = useMemo(() => {
        const [time, price] = data[data.length - 1];
        return [time + oneDay, price];
    }, [data]);

    // add last point to chart
    useMemo(() => {
        ApexCharts.exec("area-datetime", "appendData", [
            {
                data: [newPoint],
            },
        ]);
    }, [newPoint]);

    // state for chart
    const [state, setState] = useState<{
        series: ApexAxisChartSeries | ApexNonAxisChartSeries;
        options: ApexCharts.ApexOptions;
        selection: string;
    }>({
        series: [{ data, name: `${name} Price` }],
        options: {
            chart: {
                id: "area-datetime",
                type: "area",
                // height: 350,
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 0,
            },
            xaxis: {
                type: "datetime",
                min: firstPoint[0],
                tickAmount: 6,
            },
            stroke: {
                width: 3,
            },
            tooltip: {
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    const [x, y, volume] =
                        w.globals.initialSeries[seriesIndex].data[
                            dataPointIndex
                        ];

                    return renderToString(
                        <CryptoCurrencyChartTooltip
                            date={x}
                            price={y}
                            name={name}
                            sign={sign}
                            volume={volume}
                        />
                    );
                },
                followCursor: true,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100],
                },
            },
        },

        selection: "all",
    });

    // update data time one month, six months,... 
    const updateData = (timeline: string) => {
        setState({
            ...state,
            selection: timeline,
        });

        switch (timeline) {
            case "one_month":
                ApexCharts.exec(
                    "area-datetime",
                    "zoomX",
                    lastPoint[0] - oneMonth,
                    lastPoint[0]
                );
                break;
            case "six_months":
                ApexCharts.exec(
                    "area-datetime",
                    "zoomX",
                    lastPoint[0] - 6 * oneMonth,
                    lastPoint[0]
                );
                break;
            case "one_year":
                ApexCharts.exec(
                    "area-datetime",
                    "zoomX",
                    lastPoint[0] - 12 * oneMonth,
                    lastPoint[0]
                );
                break;
            case "ytd":
                ApexCharts.exec(
                    "area-datetime",
                    "zoomX",
                    new Date(
                        new Date(lastPoint[0]).getFullYear(),
                        0,
                        1
                    ).getTime(),
                    lastPoint[0]
                );
                break;
            case "all":
                ApexCharts.exec(
                    "area-datetime",
                    "zoomX",
                    firstPoint[0],
                    lastPoint[0]
                );
                break;
            default:
        }
    };

    return (
        <div className="ltr">
            <div id="chart" className="mt-1">
                <div className="toolbar flex gap-2">
                    <button
                        id="one_month"
                        onClick={() => updateData("one_month")}
                        className={
                            state.selection === "one_month"
                                ? activeButtonClx
                                : buttonClx
                        }
                    >
                        1M
                    </button>

                    <button
                        id="six_months"
                        onClick={() => updateData("six_months")}
                        className={
                            state.selection === "six_months"
                                ? activeButtonClx
                                : buttonClx
                        }
                    >
                        6M
                    </button>

                    <button
                        id="one_year"
                        onClick={() => updateData("one_year")}
                        className={
                            state.selection === "one_year"
                                ? activeButtonClx
                                : buttonClx
                        }
                    >
                        1Y
                    </button>

                    <button
                        id="ytd"
                        onClick={() => updateData("ytd")}
                        className={
                            state.selection === "ytd"
                                ? activeButtonClx
                                : buttonClx
                        }
                    >
                        YTD
                    </button>

                    <button
                        id="all"
                        onClick={() => updateData("all")}
                        className={
                            state.selection === "all"
                                ? activeButtonClx
                                : buttonClx
                        }
                    >
                        ALL
                    </button>
                </div>

                <div id="chart-timeline">
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default CryptoCurrencyChart;
