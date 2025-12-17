import React, { useMemo } from 'react';

const statusColors: Record<string, string> = {
    produccion: 'bg-emerald-500',
    detenido: 'bg-amber-500',
    offline: 'bg-gray-300',
    setup: 'bg-blue-500'
};

const statusLabels: Record<string, string> = {
    produccion: 'Producción',
    detenido: 'Detenido',
    offline: 'Sin Conexión',
    setup: 'Setup'
};

interface TimelineSegment {
    status: string;
    startTime: string;
    endTime: string;
    duration: string;
};

interface Props {
    segments?: TimelineSegment[];
};

export const TimelineBar: React.FC<Props> = ({ segments = [] }) => {
    const { processedSegments, startLabel, endLabel } = useMemo(() => {
        if (!segments || segments.length === 0) {
            return { processedSegments: [], startLabel: '--:--', endLabel: '--:--' };
        }

        const parsedSegments = segments.map(seg => ({
            ...seg,
            startMs: new Date(seg.startTime).getTime(),
            endMs: new Date(seg.endTime).getTime(),
        }));

        const minTime = parsedSegments[0].startMs;
        const maxTime = parsedSegments[parsedSegments.length - 1].endMs;
        const totalDuration = maxTime - minTime;

        const processed = parsedSegments.map(seg => {
            const durationMs = seg.endMs - seg.startMs;
            let percent = (durationMs / totalDuration) * 100;

            if (totalDuration > 0 && percent < 1) {
                percent = 1.2;
            }

            return {
                ...seg,
                widthPercent: percent,
                startTimeFormatted: new Date(seg.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTimeFormatted: new Date(seg.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        });

        return {
            processedSegments: processed,
            startLabel: new Date(minTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endLabel: new Date(maxTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    }, [segments]);

    if (processedSegments.length === 0) {
        return (
            <div className="px-6 pt-2 pb-4">
                <div className="h-4 w-full rounded-full bg-gray-100 animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="px-4 pt-2 pb-2 w-full">
            <div className="flex h-6 w-full bg-gray-100 rounded-full shadow-inner border border-gray-100 relative">
                {processedSegments.map((seg, index) => (
                    <div
                        key={index}
                        className={`
                            relative h-full transition-all duration-200 group
                            ${statusColors[seg.status?.toLowerCase()] || 'bg-gray-300'} 
                            border-r border-white/20 last:border-r-0 
                            first:rounded-l-full last:rounded-r-full
                            hover:brightness-110 hover:z-20 hover:shadow-sm
                        `}
                        style={{ width: `${seg.widthPercent}%` }}
                    >
                        <div className="absolute bottom-[115%] left-1/2 transform -translate-x-1/2 hidden group-hover:flex flex-col items-center z-50 min-w-[140px] pointer-events-none">
                            <div className="bg-slate-800 text-white text-xs rounded py-2 px-3 shadow-xl text-center border border-slate-600 whitespace-nowrap">
                                <div className="font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${statusColors[seg.status?.toLowerCase()]}`}></span>
                                    {statusLabels[seg.status?.toLowerCase()] || seg.status}
                                </div>
                                <div className="text-slate-300 border-t border-slate-600 pt-1 mt-1">
                                    {seg.startTimeFormatted} - {seg.endTimeFormatted}
                                </div>
                                <div className="font-mono text-emerald-400 font-bold text-sm mt-0.5">
                                    {seg.duration}
                                </div>
                            </div>
                            <div className="w-2 h-2 bg-slate-800 border-r border-b border-slate-600 rotate-45 transform -translate-y-1"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-1 text-[10px] text-gray-400 font-medium font-mono uppercase">
                <span>{startLabel}</span>
                <span>{endLabel}</span>
            </div>
        </div>
    );
};