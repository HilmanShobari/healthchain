import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  AlertTriangle,
  BarChart3,
  Package,
  Truck,
  Snowflake,
  Siren,
  CheckCircle2,
  Factory,
  ShieldCheck,
  Warehouse,
  Pill,
  TrendingUp,
  Thermometer,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/medicine")({
  component: MedicinePage,
});

type Status = "dispensed" | "transit" | "cold" | "recall" | "received";

const statusMap: Record<Status, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  dispensed: { label: "Dispensed",  cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", Icon: CheckCircle2 },
  transit:   { label: "In Transit", cls: "bg-sky-50 text-sky-700 ring-sky-100",             Icon: Truck },
  cold:      { label: "Cold Chain", cls: "bg-cyan-50 text-cyan-700 ring-cyan-100",          Icon: Snowflake },
  recall:    { label: "RECALL",     cls: "bg-rose-50 text-rose-700 ring-rose-100",          Icon: Siren },
  received:  { label: "Received",   cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", Icon: Package },
};

const stats = [
  { label: "Active Batches",  value: "8,429",   sub: "↑ 234 today",        tint: "bg-orange-50 text-orange-600", Icon: Package },
  { label: "In Transit",      value: "1,847",   sub: "23 shipments",       tint: "bg-sky-50 text-sky-600",        Icon: Truck },
  { label: "Recall Alerts",   value: "3",       sub: "⚠ Urgent",           tint: "bg-rose-50 text-rose-600",      Icon: Siren },
  { label: "Verified Today",  value: "12,847",  sub: "100% authentic",     tint: "bg-emerald-50 text-emerald-600", Icon: ShieldCheck },
];

const rows: Array<{
  id: string; product: string; mfg: string; location: string; status: Status; temp?: string; time: string;
}> = [
  { id: "PF-2026-0891", product: "Metformin 500mg",    mfg: "PT Kimia Farma",  location: "Apotek Kimia Farma Depok",  status: "dispensed", time: "2m ago" },
  { id: "KF-2026-1204", product: "Amlodipine 5mg",     mfg: "PT Kalbe Farma",  location: "Distributor Anugerah",      status: "transit",   time: "15m ago" },
  { id: "VK-2026-0032", product: "Vaksin COVID-19",    mfg: "Bio Farma",       location: "Cold Storage Jakarta",      status: "cold",      temp: "2.4°C", time: "1h ago" },
  { id: "MK-2026-0443", product: "Obat X Generic",     mfg: "PT Maju Kimia",   location: "Apotek Sehat",              status: "recall",    time: "3h ago" },
  { id: "SF-2026-2891", product: "Insulin Novomix",    mfg: "PT Sanofi",       location: "RS Premier Jatinegara",     status: "received",  time: "4h ago" },
  { id: "DX-2026-0712", product: "Dexamethasone 4mg",  mfg: "PT Dexa Medica",  location: "RSUD Tangerang",            status: "dispensed", time: "6h ago" },
  { id: "OG-2026-1981", product: "Omeprazole 20mg",    mfg: "PT Otto",         location: "Gudang Cikarang",           status: "transit",   time: "8h ago" },
  { id: "BF-2026-0078", product: "Vaksin Hepatitis B", mfg: "Bio Farma",       location: "Dinkes Surabaya",           status: "cold",      temp: "4.1°C", time: "12h ago" },
];

const journey = [
  { Icon: Factory,     name: "Manufactured",     loc: "PT Kimia Farma · Bandung", date: "Jan 5" },
  { Icon: ShieldCheck, name: "BPOM Verified",    loc: "BPOM Central Lab",         date: "Jan 7" },
  { Icon: Truck,       name: "Distributor",      loc: "PT Enseval",               date: "Jan 10" },
  { Icon: Warehouse,   name: "Apotek Received",  loc: "KF Apotek Depok",          date: "Jan 14" },
  { Icon: Pill,        name: "Dispensed",        loc: "To Patient Budi Santoso",  date: "Today" },
];

function StatusBadge({ s }: { s: Status }) {
  const { label, cls, Icon } = statusMap[s];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cls}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function MedicinePage() {
  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Dashboard</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground/70">Supply Chain</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Medicine Supply Chain Tracker</h1>
            <p className="mt-1 text-sm text-muted-foreground">End-to-end pharmaceutical traceability secured on-chain</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="h-9 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">
              <Plus className="mr-1.5 h-4 w-4" /> Register Batch
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold text-danger hover:bg-danger/5">
              <AlertTriangle className="mr-1.5 h-4 w-4" /> Issue Recall
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Analytics
            </Button>
          </div>
        </div>

        {/* Recall banner */}
        <div className="overflow-hidden rounded-xl border border-rose-200 bg-gradient-to-r from-rose-50 via-rose-50/60 to-white shadow-sm">
          <div className="flex flex-wrap items-center gap-4 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-rose-600 text-white shadow-sm">
              <Siren className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                  Active Recall
                </span>
                <span className="font-mono text-xs font-semibold text-rose-700">MK-2026-0443 · Obat X Generic</span>
              </div>
              <p className="mt-1 text-sm text-foreground">
                Issued by <span className="font-semibold">BPOM</span> · Reason: <span className="font-semibold">Contamination risk</span> ·
                <span className="ml-1 font-semibold text-rose-700">47 units</span> still unaccounted
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 rounded-lg border-rose-300 font-semibold text-rose-700 hover:bg-rose-50">View Details</Button>
              <Button className="h-9 rounded-lg bg-rose-600 font-semibold text-white hover:bg-rose-700">Send Alerts</Button>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}>
                  <s.Icon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  <TrendingUp className="h-3 w-3" /> 24h
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label} · {s.sub}</p>
            </div>
          ))}
        </div>

        {/* Journey */}
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-base font-bold tracking-tight">Product Journey</h3>
              <p className="text-xs text-muted-foreground">Batch <span className="font-mono font-semibold text-navy">PF-2026-0891</span> · Metformin 500mg</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="h-3 w-3" /> Chain intact · 5/5 steps
            </span>
          </div>
          <div className="overflow-x-auto p-6 scrollbar-thin">
            <ol className="flex min-w-[720px] items-start gap-2">
              {journey.map((step, i) => (
                <li key={step.name} className="flex flex-1 items-start gap-2">
                  <div className="flex flex-1 flex-col items-center text-center">
                    <div className="relative">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-navy-bright to-highlight text-white shadow-md ring-4 ring-highlight/15">
                        <step.Icon className="h-5 w-5" />
                      </div>
                      <span className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">{step.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{step.loc}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-highlight">{step.date}</p>
                  </div>
                  {i < journey.length - 1 && (
                    <div className="mt-6 h-0.5 flex-1 bg-gradient-to-r from-highlight to-emerald-400" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-base font-bold tracking-tight">Recent Product Movements</h3>
              <p className="text-xs text-muted-foreground">Live blockchain-verified scans</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  <th className="px-4 py-3">Batch ID</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Manufacturer</th>
                  <th className="px-4 py-3">Current Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Temp</th>
                  <th className="px-4 py-3">Last Update</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r, i) => (
                  <tr key={r.id} className={`${i % 2 === 1 ? "bg-background/40" : "bg-card"} hover:bg-accent/50`}>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{r.id}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{r.product}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.mfg}</td>
                    <td className="px-4 py-3 text-foreground">{r.location}</td>
                    <td className="px-4 py-3"><StatusBadge s={r.status} /></td>
                    <td className="px-4 py-3">
                      {r.temp ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2 py-0.5 text-[11px] font-semibold text-cyan-700">
                          <Thermometer className="h-3 w-3" /> {r.temp} <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{r.time}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {r.status === "recall" ? (
                          <button className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700">Alert</button>
                        ) : (
                          <button className="rounded-md px-2 py-1 text-xs font-semibold text-highlight hover:bg-highlight/10">Track</button>
                        )}
                        <button className="rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-accent">Details</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
