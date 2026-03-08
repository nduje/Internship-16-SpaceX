import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Option = { label: string; value: string };

interface WithDropdownProps {
    options: Option[];
}

function withDropdown<T extends object>(
    WrappedComponent: React.ComponentType<
        T & { value: string; onChange: (value: string) => void }
    >,
) {
    return (props: T & WithDropdownProps) => {
        const [searchParams, setSearchParams] = useSearchParams();
        const filterParam = searchParams.get("status") || "all";
        const [value, setValue] = useState(filterParam);

        useEffect(() => {
            setValue(filterParam);
        }, [filterParam]);

        const handleChange = (newValue: string) => {
            setValue(newValue);

            setSearchParams((prev) => {
                const q = prev.get("q");
                const newParams: any = {};
                if (q) newParams.q = q;
                if (newValue !== "all") newParams.status = newValue;
                return newParams;
            });
        };

        return (
            <WrappedComponent
                {...props}
                value={value}
                onChange={handleChange}
            />
        );
    };
}

export default withDropdown;
