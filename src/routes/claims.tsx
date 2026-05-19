import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  BarChart3,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  ShieldCheck,
  Link2,
  Copy,
  Banknote,
  FileSearch,
  X,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/claims")({
  component: ClaimsPage,
});

type ClaimStatus = "approved" | "review" | "fraud" | "rejected";

const statusChip: Record<ClaimStatus, { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
  approved: { label: "Auto-Approved", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", Icon: CheckCircle2 },
  review:   { label: "Under Review",  cls: "bg-amber-50 text-amber-700 ring-amber-100",       Icon: Clock },
  fraud:    { label: "Fraud Flagged", cls: "bg-rose-50 text-rose-700 ring-rose-100",          Icon: AlertTriangle },
  rejected: { label: "Rejected",      cls: "bg-slate-100 text-slate-700 ring-slate-200",      Icon: XCircle },
};

const pipeline = [
  { key: "all",      label: "All Claims",      count: "4,821" },
  { key: "review",   label: "Pending Review",  count: "234"   },
  { key: "approved", label: "Auto-Approved",   count: "3,891" },
  { key: "fraud",    label: "Flagged Fraud",   count: "47"    },
  { key: "rejected", label: "Rejected",        count: "649"   },
] as const;

type Claim = {
  id: string;
  patient: string;
  hospital: string;
  diagnosis: string;
  amount: string;
  type: "BPJS" | "Asuransi Swasta";
  status: ClaimStatus;
  fraud: number;
  submitted: string;
};

const claims: Claim[] = [
  { id: "CL-2026-94821", patient: "Budi Santoso",  hospital: "RSUP Dr. Cipto",      diagnosis: "Diabetes + Komplikasi", amount: "Rp 4,250,000",  type: "BPJS",            status: "approved", fraud: 2,  submitted: "Today 09:14" },
  { id: "CL-2026-94820", patient: "Siti Rahayu",   hospital: "RS Pondok Indah",     diagnosis: "Appendisitis",          amount: "Rp 12,800,000", type: "Asuransi Swasta", status: "review",   fraud: 18, submitted: "Today 08:51" },
  { id: "CL-2026-94819", patient: "Anonymous",     hospital: "RS Fatmawati",        diagnosis: "Unspecified",           amount: "Rp 28,500,000", type: "BPJS",            status: "fraud",    fraud: 87, submitted: "Yesterday" },
  { id: "CL-2026-94818", patient: "Haryanto",      hospital: "RSUD Bekasi",         diagnosis: "Stroke + Rehab",        amount: "Rp 67,200,000", type: "BPJS",            status: "approved", fraud: 5,  submitted: "Yesterday" },
  { id: "CL-2026-94817", patient: "Dewi Kusuma",   hospital: "RS Mitra Keluarga",   diagnosis: "Anemia",                amount: "Rp 2,150,000",  type: "Asuransi Swasta", status: "approved", fraud: 3,  submitted: "Yesterday" },
  { id: "CL-2026-94816", patient: "Agus Hermawan", hospital: "RSCM",                diagnosis: "Hemodialisis",          amount: "Rp 1,890,000",  type: "BPJS",            status: "approved", fraud: 1,  submitted: "2d ago" },
  { id: "CL-2026-94815", patient: "Fitri H.",      hospital: "RS Hermina",          diagnosis: "Asma Akut",             amount: "Rp 3,420,000",  type: "BPJS",            status: "review",   fraud: 22, submitted: "2d ago" },
  { id: "CL-2026-94814", patient: "Rizky P.",      hospital: "RSUD Tangerang",      diagnosis: "DBD",                   amount: "Rp 8,750,000",  type: "BPJS",            status: "rejected", fraud: 41, submitted: "3d ago" },
];

function StatusBadge({ s }: { s: ClaimStatus }) {
  const { label, cls, Icon } = statusChip[s];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cls}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function FraudScore({ score }: { score: number }) {
  const tone = score >= 70 ? "bg-rose-500" : score >= 30 ? "bg-amber-500" : "bg-emerald-500";
  const text = score >= 70 ? "text-rose-700" : score >= 30 ? "text-amber-700" : "text-emerald-700";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden rounded-full bg-secondary">
        <div className={`h-full ${tone}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-semibold ${text}`}>{score}%</span>
    </div>
  );
}

function DetailPanel({ claim, onClose }: { claim: Claim; onClose: () => void }) {
  const checks = [
    "Patient eligibility verified (BPJS active, iuran lunas)",
    "Diagnosis matches EHR records (ICD: E11.65)",
    "Tariff within INA-CBGs range (Rp 3.8M – Rp 4.8M)",
    "No duplicate claim found",
    "Treatment period within coverage",
    "Digital signature valid (RSUP Dr. Cipto)",
  ];

  return (
    <aside className="fixed inset-y-0 right-0 top-16 z-40 flex w-full max-w-md flex-col border-l border-border bg-white shadow-2xl">
      <div className="border-b border-border bg-gradient-to-br from-navy via-navy-medium to-navy-bright p-5 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] text-white/60">{claim.id}</p>
            <p className="mt-0.5 text-base font-bold tracking-tight">{claim.patient}</p>
            <p className="text-xs text-white/70">{claim.hospital} · {claim.type}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] text-white/55">Claim amount</p>
            <p className="text-2xl font-bold tracking-tight">{claim.amount}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold text-emerald-100 ring-1 ring-emerald-300/30">
            <CheckCircle2 className="h-3.5 w-3.5" /> Auto-Approved
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        <section>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Auto-Verification</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" /> PASSED
            </span>
          </div>
          <ul className="space-y-2">
            {checks.map((c) => (
              <li key={c} className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-foreground">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Blockchain Proof</p>
          <div className="rounded-lg border border-border bg-gradient-to-br from-slate-50 to-blue-50/40 p-3">
            <div className="flex items-center gap-2">
              <Link2 className="h-3.5 w-3.5 text-navy" />
              <span className="text-xs font-semibold text-navy">Verified by Smart Contract</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <p className="text-muted-foreground">Block</p>
                <p className="font-mono font-semibold text-foreground">#1,247,791</p>
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground">Hash</p>
                <p className="flex items-center gap-1 font-mono font-semibold text-foreground">
                  <span className="truncate">0xc4d2a1…7e90</span>
                  <Copy className="h-3 w-3 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer" />
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Payment Status</p>
          <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-600 text-white">
              <Banknote className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-foreground">{claim.amount}</p>
              <p className="text-xs text-emerald-700">Transfer scheduled · 3 business days</p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

function ClaimsPage() {
  const [tab, setTab] = useState<(typeof pipeline)[number]["key"]>("all");
  const [selectedId, setSelectedId] = useState<string | null>("CL-2026-94821");
  const selected = claims.find((c) => c.id === selectedId) ?? null;

  return (
    <AppShell>
      <div className={selected ? "pr-0 lg:pr-[28rem]" : ""}>
        <div className="space-y-5">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Dashboard</Link>
                <span className="mx-1.5">/</span>
                <span className="text-foreground/70">Claims</span>
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">Insurance Claims Management</h1>
              <p className="mt-1 text-sm text-muted-foreground">Automated BPJS & private insurance processing on-chain</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button className="h-9 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">
                <Plus className="mr-1.5 h-4 w-4" /> Submit Claim
              </Button>
              <Button variant="outline" className="h-9 rounded-lg font-semibold">
                <BarChart3 className="mr-1.5 h-4 w-4" /> Reports
              </Button>
              <Button variant="outline" className="h-9 rounded-lg font-semibold">
                <FileSearch className="mr-1.5 h-4 w-4" /> Fraud Analysis
              </Button>
            </div>
          </div>

          {/* Fraud alert */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-amber-50/60 to-white p-4 shadow-sm">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-amber-500 text-white shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-amber-900">
                47 claims flagged for fraud review this week
              </p>
              <p className="text-xs text-amber-800/80">
                Potential savings: <span className="font-bold">Rp 2.3 Miliar</span>
              </p>
            </div>
            <Button className="h-9 rounded-lg bg-amber-500 font-semibold text-white hover:bg-amber-600">Review Now</Button>
          </div>

          {/* Pipeline tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-px">
            {pipeline.map((p) => {
              const active = tab === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setTab(p.key)}
                  className={[
                    "group flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
                    active ? "border-highlight text-navy" : "border-transparent text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {p.label}
                  <span className={[
                    "rounded-full px-2 py-0.5 text-[11px] font-bold",
                    active ? "bg-highlight text-white" : "bg-secondary text-muted-foreground",
                  ].join(" ")}>{p.count}</span>
                </button>
              );
            })}
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/60 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    <th className="px-4 py-3">Claim ID</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Hospital</th>
                    <th className="px-4 py-3">Diagnosis</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Fraud</th>
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {claims.map((c, i) => {
                    const active = c.id === selectedId;
                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedId(c.id)}
                        className={[
                          "cursor-pointer transition-colors",
                          i % 2 === 1 ? "bg-background/40" : "bg-card",
                          active ? "bg-highlight/5 ring-1 ring-inset ring-highlight/30" : "hover:bg-accent/50",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{c.id}</td>
                        <td className="px-4 py-3 font-semibold text-foreground">{c.patient}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.hospital}</td>
                        <td className="px-4 py-3 text-foreground">{c.diagnosis}</td>
                        <td className="px-4 py-3 font-semibold text-foreground">{c.amount}</td>
                        <td className="px-4 py-3">
                          <span className={[
                            "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                            c.type === "BPJS" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700",
                          ].join(" ")}>{c.type}</span>
                        </td>
                        <td className="px-4 py-3"><StatusBadge s={c.status} /></td>
                        <td className="px-4 py-3"><FraudScore score={c.fraud} /></td>
                        <td className="px-4 py-3 text-muted-foreground">{c.submitted}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedId(c.id); }}
                              className="rounded-md px-2 py-1 text-xs font-semibold text-highlight hover:bg-highlight/10"
                            >
                              View
                            </button>
                            {c.status === "review" && (
                              <button className="rounded-md px-2 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50">Review</button>
                            )}
                            {c.status === "fraud" && (
                              <button className="rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-700">Investigate</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selected && <DetailPanel claim={selected} onClose={() => setSelectedId(null)} />}
    </AppShell>
  );
}
