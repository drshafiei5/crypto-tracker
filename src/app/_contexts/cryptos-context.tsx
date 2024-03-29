import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useMemo,
    useState,
} from "react";

interface CurrencyContextType {
    currency: string;
    setCurrency: Dispatch<SetStateAction<string>>;
}

// handle current currency for slider by context
export const CurrencyContext = createContext<CurrencyContextType | null>(null);
const CurrencyWrapper = (props: PropsWithChildren) => {
    const [currency, setCurrency] = useState("");

    const value = useMemo(() => ({ currency, setCurrency }), [currency]);

    return (
        <CurrencyContext.Provider value={value}>
            {props.children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyWrapper;
