
const segments = [
    { status: 'detenido', duration: 'flex-[0.2]' },
    { status: 'produciendo', duration: 'flex-[0.3]' },
    { status: 'setup', duration: 'flex-[0.05]' },
    { status: 'produciendo', duration: 'flex-[0.35]' },
    { status: 'detenido', duration: 'flex-[0.1]' },
];

const statusColors: { [key: string]: string } = {
    produciendo: 'bg-teal-500',
    setup: 'bg-green-500',
    detenido: 'bg-yellow-500',
};

export const TimelineBar = () => {
    return (
        <div className="px-6 pt-2 pb-4">
            <div className="flex h-5 w-full rounded-full bg-disabled overflow-hidden">
                {segments.map((seg, index) => (
                    <div
                        key={index}
                        className={`${statusColors[seg.status]} ${seg.duration}`}
                        title={seg.status}
                    />
                ))}
            </div>

            <div className="flex justify-between mt-1 text-xs text-cancel">
                <span>06:30</span>
                <span>09:00</span>
                <span>11:30</span>
                <span>14:00</span>
                <span>16:30</span>
            </div>
        </div>
    );
};