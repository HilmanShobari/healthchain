import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  SlidersHorizontal,
  Download,
  Search,
  ChevronDown,
  MoreVertical,
  X,
  Phone,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Lock,
  Link2,
  Copy,
  CheckCircle2,
  Pill,
  Activity,
  FileText,
  Calendar,
  History,
  UserPlus,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/ehr")({
  component: EhrPage,
});

type ConsentKind = "full" | "pending" | "revoked" | "limited";

type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  lastVisit: string;
  diagnosis: string;
  doctor: string;
  records: number;
  consent: ConsentKind;
  consentLabel: string;
};

const patients: Patient[] = [
  { id: "BUD-001", name: "Budi Santoso",    initials: "BS", age: 45, lastVisit: "Today, 09:14",  diagnosis: "Diabetes Mellitus Tipe 2",  doctor: "dr. Sarah Putri",   records: 47,  consent: "full",    consentLabel: "Full Access" },
  { id: "SIT-002", name: "Siti Rahayu",     initials: "SR", age: 38, lastVisit: "Yesterday",     diagnosis: "Hipertensi Grade II",       doctor: "dr. Ahmad Rifai",   records: 23,  consent: "pending", consentLabel: "Pending" },
  { id: "AGU-003", name: "Agus Hermawan",   initials: "AH", age: 52, lastVisit: "2 days ago",    diagnosis: "Gagal Ginjal Kronis",       doctor: "dr. Maya Sari",     records: 89,  consent: "full",    consentLabel: "Full Access" },
  { id: "DEW-004", name: "Dewi Kusuma",     initials: "DK", age: 29, lastVisit: "3 days ago",    diagnosis: "Anemia Defisiensi Besi",    doctor: "dr. Reza Hakim",    records: 12,  consent: "revoked", consentLabel: "Revoked" },
  { id: "HAR-005", name: "Haryanto",        initials: "HR", age: 61, lastVisit: "Last week",     diagnosis: "Stroke Iskemik",            doctor: "dr. Sarah Putri",   records: 134, consent: "full",    consentLabel: "Full Access" },
  { id: "FIT-006", name: "Fitri Handayani", initials: "FH", age: 33, lastVisit: "Last week",     diagnosis: "Asma Bronkial",             doctor: "dr. Bimo Nugroho",  records: 8,   consent: "limited", consentLabel: "Time-limited (7 days)" },
  { id: "RIZ-007", name: "Rizky Pratama",   initials: "RP", age: 27, lastVisit: "2 weeks ago",   diagnosis: "Dengue Fever",              doctor: "dr. Maya Sari",     records: 15,  consent: "full",    consentLabel: "Full Access" },
  { id: "NUR-008", name: "Nurul Aisyah",    initials: "NA", age: 41, lastVisit: "3 weeks ago",   diagnosis: "Tuberkulosis Paru",         doctor: "dr. Ahmad Rifai",   records: 56,  consent: "pending", consentLabel: "Pending" },
];

const tabs = ["All Patients", "My Patients", "Pending Consent", "Emergency Access Log"] as const;

const consentChip: Record<ConsentKind, { cls: string; Icon: typeof CheckCircle2 }> = {
  full:    { cls: "bg-emerald-50 text-emerald-700 ring-emerald-100",       Icon: CheckCircle2 },
  pending: { cls: "bg-amber-50 text-amber-700 ring-amber-100",             Icon: Clock },
  revoked: { cls: "bg-rose-50 text-rose-700 ring-rose-100",                Icon: Lock },
  limited: { cls: "bg-sky-50 text-sky-700 ring-sky-100",                   Icon: ShieldCheck },
};

function ConsentBadge({ kind, label }: { kind: ConsentKind; label: string }) {
  const { cls, Icon } = consentChip[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cls}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-medium text-foreground hover:bg-accent">
      {label} <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
    </button>
  );
}

/* -------- Detail panel -------- */

const panelTabs = ["Overview", "Timeline", "Prescriptions", "Lab Results", "Consent Log"] as const;
type PanelTab = (typeof panelTabs)[number];

function DetailPanel({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  const [tab, setTab] = useState<PanelTab>("Overview");

  return (
    <aside className="fixed inset-y-0 right-0 top-16 z-40 flex w-full max-w-md flex-col border-l border-border bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-navy via-navy-medium to-navy-bright p-5 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-base font-bold ring-1 ring-white/20">
              {patient.initials}
            </div>
            <div>
              <p className="text-base font-bold tracking-tight">{patient.name}</p>
              <p className="font-mono text-[11px] text-white/70">did:healthchain:patient:0x8f2a…c41e</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
          <div>
            <p className="text-white/55">NIK</p>
            <p className="font-mono font-semibold">317XXXXXXX4521</p>
          </div>
          <div>
            <p className="text-white/55">DOB / Age</p>
            <p className="font-semibold">15 Mar 1981 · {patient.age}</p>
          </div>
          <div>
            <p className="text-white/55">Blood Type</p>
            <p className="font-semibold">B+</p>
          </div>
          <div>
            <p className="text-white/55">Emergency Contact</p>
            <p className="flex items-center gap-1 font-semibold">
              <Phone className="h-3 w-3" /> Siti Santoso · +62812-XXXX
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-rose-500/15 px-3 py-2 text-xs ring-1 ring-rose-300/30">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-200" />
          <span className="font-semibold text-rose-100">Allergies:</span>
          <span className="text-rose-50">Penicillin, Aspirin</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border bg-secondary/40 px-3 py-2 scrollbar-thin">
        {panelTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
              tab === t ? "bg-white text-navy shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
        {tab === "Overview" ? (
          <div className="space-y-5">
            {/* Active conditions */}
            <section>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Active Conditions</p>
              <div className="space-y-2">
                {[
                  { name: "Diabetes Mellitus Tipe 2", icd: "E11" },
                  { name: "Hipertensi", icd: "I10" },
                ].map((c) => (
                  <div key={c.icd} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Activity className="h-4 w-4 text-highlight" />
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                    </div>
                    <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] font-semibold text-secondary-foreground">
                      ICD: {c.icd}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Medications */}
            <section>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Current Medications</p>
              <div className="space-y-2">
                {[
                  { name: "Metformin", dose: "500mg", freq: "2× / day" },
                  { name: "Amlodipine", dose: "5mg",   freq: "1× / day" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <Pill className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{m.name} <span className="font-normal text-muted-foreground">· {m.dose}</span></p>
                        <p className="text-[11px] text-muted-foreground">{m.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Last visit */}
            <section>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Last Visit Summary</p>
              <div className="rounded-lg border border-border bg-card p-3 text-sm leading-relaxed text-foreground">
                <p className="italic text-muted-foreground">
                  "Gula darah terkontrol, TD 130/85. Lanjut terapi."
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Today, 09:14 · dr. Sarah Putri · RSUP Dr. Cipto
                </p>
              </div>
            </section>

            {/* Next appointment */}
            <section>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Next Appointment</p>
              <div className="flex items-center gap-3 rounded-lg border border-highlight/30 bg-highlight/5 p-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-highlight text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-foreground">15 June 2026 · 10:30</p>
                  <p className="text-xs text-muted-foreground">dr. Sarah Putri · RSUP Dr. Cipto</p>
                </div>
              </div>
            </section>

            {/* Blockchain badge */}
            <section>
              <div className="rounded-lg border border-border bg-gradient-to-br from-slate-50 to-blue-50/40 p-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-navy uppercase">
                    <Link2 className="h-3.5 w-3.5" /> On-chain Anchor
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" /> Immutable
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <p className="text-muted-foreground">Block</p>
                    <p className="font-mono font-semibold text-foreground">#1,247,819</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted-foreground">Hash</p>
                    <p className="flex items-center gap-1 font-mono font-semibold text-foreground">
                      <span className="truncate">0xa3f2c8…91d4</span>
                      <Copy className="h-3 w-3 shrink-0 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Consent management */}
            <section>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Consent Management</p>
                <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-highlight hover:text-navy-bright">
                  <UserPlus className="h-3 w-3" /> Grant New Access
                </button>
              </div>
              <ul className="space-y-2">
                {[
                  { who: "dr. Sarah Putri",   meta: "Full · No expiry",                  kind: "full" as const },
                  { who: "dr. Ahmad Rifai",   meta: "Limited · Lab only · exp 30 Jun 2026", kind: "limited" as const },
                  { who: "RSUD Bekasi",       meta: "Awaiting patient approval",          kind: "pending" as const },
                ].map((c) => {
                  const { Icon, cls } = consentChip[c.kind];
                  return (
                    <li key={c.who} className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{c.who}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{c.meta}</p>
                      </div>
                      <span className={`grid h-7 w-7 place-items-center rounded-full ring-1 ${cls}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        ) : (
          <div className="grid place-items-center py-16 text-center">
            <FileText className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-3 text-sm font-semibold text-foreground">{tab}</p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Detailed {tab.toLowerCase()} for this patient will appear here.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

/* -------- Main -------- */

function EhrPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All Patients");
  const [selectedId, setSelectedId] = useState<string | null>("BUD-001");

  const selected = patients.find((p) => p.id === selectedId) ?? null;

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
                <span className="text-foreground/70">Medical Records</span>
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight">Electronic Health Records</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Patient-owned, blockchain-secured records · 2.8M patients · 18.2M entries
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button className="h-9 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">
                <Plus className="mr-1.5 h-4 w-4" /> New Record
              </Button>
              <Button variant="outline" className="h-9 rounded-lg font-semibold">
                <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Advanced Search
              </Button>
              <Button variant="outline" className="h-9 rounded-lg font-semibold">
                <Download className="mr-1.5 h-4 w-4" /> Export
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto border-b border-border scrollbar-thin">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={[
                  "relative px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  activeTab === t ? "text-navy" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {t}
                {activeTab === t && (
                  <span className="absolute right-0 -bottom-px left-0 h-0.5 rounded-t bg-highlight" />
                )}
              </button>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
            <div className="relative min-w-[240px] flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, NIK, diagnosis, doctor..."
                className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:border-highlight focus:ring-2 focus:ring-highlight/20 focus:outline-none"
              />
            </div>
            <FilterButton label="Hospital" />
            <FilterButton label="Date range" />
            <FilterButton label="Diagnosis (ICD-10)" />
            <FilterButton label="Status" />
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/60 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    <th className="px-4 py-3">Patient ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3">Last Visit</th>
                    <th className="px-4 py-3">Diagnosis</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Records</th>
                    <th className="px-4 py-3">Consent</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patients.map((p, i) => {
                    const active = p.id === selectedId;
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={[
                          "cursor-pointer transition-colors",
                          i % 2 === 1 ? "bg-background/40" : "bg-card",
                          active ? "bg-highlight/5 ring-1 ring-inset ring-highlight/30" : "hover:bg-accent/50",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{p.id}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-navy-bright to-highlight text-[11px] font-bold text-white">
                              {p.initials}
                            </div>
                            <span className="font-semibold text-foreground">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-foreground">{p.age}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.lastVisit}</td>
                        <td className="px-4 py-3 text-foreground">{p.diagnosis}</td>
                        <td className="px-4 py-3 text-muted-foreground">{p.doctor}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                            {p.records}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <ConsentBadge kind={p.consent} label={p.consentLabel} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => { e.stopPropagation(); setSelectedId(p.id); }}
                              className="rounded-md px-2 py-1 text-xs font-semibold text-highlight hover:bg-highlight/10"
                            >
                              View
                            </button>
                            {p.consent === "full" || p.consent === "limited" ? (
                              <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-accent">
                                <History className="h-3 w-3" /> History
                              </button>
                            ) : p.consent === "pending" ? (
                              <button className="rounded-md px-2 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50">
                                Request
                              </button>
                            ) : null}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Open full chart</DropdownMenuItem>
                                <DropdownMenuItem>Issue prescription</DropdownMenuItem>
                                <DropdownMenuItem>Share with colleague</DropdownMenuItem>
                                <DropdownMenuItem className="text-danger">Revoke access</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
              <span>Showing <span className="font-semibold text-foreground">1–8</span> of <span className="font-semibold text-foreground">2,847,293</span> patients</span>
              <div className="flex items-center gap-1">
                <button className="rounded-md border border-border bg-white px-2.5 py-1 font-semibold hover:bg-accent">Previous</button>
                <button className="rounded-md bg-navy px-2.5 py-1 font-semibold text-white">1</button>
                <button className="rounded-md border border-border bg-white px-2.5 py-1 font-semibold hover:bg-accent">2</button>
                <button className="rounded-md border border-border bg-white px-2.5 py-1 font-semibold hover:bg-accent">3</button>
                <button className="rounded-md border border-border bg-white px-2.5 py-1 font-semibold hover:bg-accent">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selected && <DetailPanel patient={selected} onClose={() => setSelectedId(null)} />}
    </AppShell>
  );
}
