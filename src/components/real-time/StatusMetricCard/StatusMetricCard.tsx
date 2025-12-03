type CardVariant = "info" | "success" | "warning" | "danger" | "gray" | "primary";

interface Props {
    count: number;
    label: string;
    variant: CardVariant;
};

const variantStyles: Record<CardVariant, string> = {
    info: "bg-cyan-50 border-cyan-200 text-cyan-700",
    success: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    danger: "bg-red-50 border-red-200 text-red-700",
    gray: "bg-gray-100 border-gray-200 text-gray-500",
    primary: "bg-blue-50 border-blue-200 text-blue-700"
};

export const StatusMetricCard = ({ count, label, variant }: Props) => {
    return (
        <div className={
            `flex items-center gap-3 p-4 rounded-xl border border-l-4 shadow-sm w-full
            ${variantStyles[variant]}`
        }>
            <span className="text-4xl font-bold tracking-tight">
                {count}
            </span>

            <span className="text-xs font-bold uppercase leading-tight tracking-wide">
                {label}
            </span>
        </div>
    )
}
