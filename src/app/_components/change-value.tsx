import React, { memo } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

interface ChangeValueProps {
    value?: number | undefined;
}

// component for show live data
const ChangeValue = ({ value }: ChangeValueProps) => {
    return (
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
            {value !== undefined ? (
                <div className="flex items-center">
                    {
                        value > 0 ? (
                            <TiArrowSortedUp
                                className="text-green-500 ml-1"
                                size={20}
                            />
                        ) : (
                            <TiArrowSortedDown
                                className="text-red-500 ml-1"
                                size={20}
                            />
                        )
                    }
                    {Math.abs(value).toFixed(2)}%
                </div>
            ) : <span>...</span>}
        </td>
    );
};

export default memo(ChangeValue);
