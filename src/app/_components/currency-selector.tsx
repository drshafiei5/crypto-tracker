"use client";

import React, { memo, useMemo, useState } from "react";
import Select from "react-select";
import { currencies } from "@/utils/currencies";
import { useSearchParams } from "next/navigation";

interface Currency {
    label: string;
    value: number;
}

type CurrencySelectorProps = {
    onChange: (val: Currency) => void;
};

// select box for select new currency
const CurrencySelector = ({ onChange }: CurrencySelectorProps) => {
    const searchParams = useSearchParams();
    const symbol = searchParams?.get("currency");

    const currency = useMemo(() => {
        return currencies.find((c) => c.symbol === symbol);
    }, [symbol]);

    const [selectedOption, setSelectedOption] = useState<Currency>({
        value: currency?.id || currencies[0].id,
        label: currency?.name || currencies[0].name,
    });

    const handleChange = (selectedOption: Currency) => {
        setSelectedOption(selectedOption);

        let val: Currency;
        if (selectedOption && selectedOption.value) {
            val = {
                label: selectedOption.label,
                value: selectedOption.value,
            };
        } else {
            val = null;
        }

        onChange(val);
    };

    const currenciesDisplay = useMemo(
        () =>
            currencies.map((c) => ({
                label: c.name,
                value: c.id,
            })),
        []
    );

    return (
        <div className="currency-selector">
            <Select
                name="form-field-name"
                value={selectedOption}
                onChange={handleChange}
                options={currenciesDisplay}
                placeholder="Currency"
            />
        </div>
    );
};

export default memo(CurrencySelector);
