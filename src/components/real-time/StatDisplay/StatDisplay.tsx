import type React from "react";

interface Props {
    value?: string;
    label: string;
};

export const StatDisplay: React.FC<Props> = ({ value, label }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <span className="text-3xl font-bold text-text">
                {value}
            </span>
            <span className="text-xs font-medium uppercase text-text/60">
                {label}
            </span>
        </div>
    );
};