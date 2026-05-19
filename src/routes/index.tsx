import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Dashboard } from "@/components/dashboard/Dashboard";
import {
  PatientDashboard,
  DoctorDashboard,
  BpjsDashboard,
  BpomDashboard,
  ResearcherDashboard,
  PharmacyDashboard,
  HospitalExtraStrip,
} from "@/components/dashboard/variants";
import { useRole, type RoleKey } from "@/contexts/RoleContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { role } = useRole();

  const variants: Record<RoleKey, React.ReactNode> = {
    patient: <PatientDashboard />,
    doctor: <DoctorDashboard />,
    hospital: (
      <div className="space-y-6">
        <HospitalExtraStrip />
        <Dashboard />
      </div>
    ),
    pharmacy: <PharmacyDashboard />,
    bpjs: <BpjsDashboard />,
    researcher: <ResearcherDashboard />,
    bpom: <BpomDashboard />,
  };

  return (
    <AppShell>
      <div key={role.key} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {variants[role.key]}
      </div>
    </AppShell>
  );
}
