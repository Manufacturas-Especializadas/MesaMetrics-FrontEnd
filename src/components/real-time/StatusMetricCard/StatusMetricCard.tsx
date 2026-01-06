type CardVariant =
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "gray"
  | "primary";

interface Props {
  label: string;
  variant: CardVariant;
  machines?: string[];
}

const variantStyles: Record<CardVariant, string> = {
  info: "bg-cyan-50 border-cyan-200 text-cyan-700",
  success: "bg-green-50 border-green-200 text-green-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
  danger: "bg-red-50 border-red-200 text-red-700",
  gray: "bg-gray-100 border-gray-200 text-gray-500",
  primary: "bg-blue-50 border-blue-200 text-blue-700",
};

export const StatusMetricCard = ({ label, variant, machines = [] }: Props) => {
  const count = machines ? machines.length : 0;

  return (
    <div className="relative group">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border border-l-4 
            shadow-sm w-full transition-all duration-200 hover:shadow-md
            ${variantStyles[variant]}`}
      >
        <span className="text-4xl font-bold tracking-tight">{count}</span>

        <span className="text-xs font-bold uppercase leading-tight tracking-wide">
          {label}
        </span>
      </div>
      {count > 0 && (
        <div
          className="absolute z-50 left-0 mt-2 w-72 hidden group-hover:block 
          animate-in fade-in zoom-in-95 duration-200"
        >
          <div
            className="bg-white rounded-lg shadow-xl border border-gray-200 
            overflow-hidden"
          >
            <div
              className={`px-4 py-2 text-xs font-bold border-b uppercase ${variantStyles[variant]}`}
            >
              {label}: {count}
            </div>
            <ul className="max-h-64 overflow-y-auto p-0 m-0 list-none bg-white">
              {machines.map((name, index) => (
                <li
                  key={index}
                  className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 
                  last:border-0 transition-colors"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
