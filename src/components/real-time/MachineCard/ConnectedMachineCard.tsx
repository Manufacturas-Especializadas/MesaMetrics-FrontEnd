import { useMachineMetrics } from "@/hooks/useMachineMetrics";
import { MachineCard } from "./MachineCard";

interface Props {
  realTimeId: number;
}

export const ConnectedMachineCard = ({ realTimeId }: Props) => {
  const { metrics } = useMachineMetrics(realTimeId);

  return <MachineCard realTimeId={realTimeId} metrics={metrics || undefined} />;
};
