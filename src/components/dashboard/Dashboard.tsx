import { Link } from "@tanstack/react-router";
import {
  Users,
  FileText,
  Wallet,
  Pill,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  FlaskConical,
  Hospital,
  Building2,
  Link2,
  Activity,
  Cpu,
} from "lucide-react";

const stats = [
  { label: "Patients Registered", value: "2,847,293", trend: "+12.4%", icon: Users, tint: "bg-blue-50 text-blue-600" },
  { label: "Medical Records", value: "18.2M", trend: "+8.1%", icon: FileText, tint: "bg-emerald-50 text-emerald-600" },
  { label: "Claims Processed", value: "94,821", trend: "+23.7%", icon: Wallet, tint: "bg-violet-50 text-violet-600" },
  { label: "Medicines Tracked", value: "4.2M units", trend: "+5.2%", icon: Pill, tint: "bg-orange-50 text-orange-600" },
  { label: "Verified Credentials", value: "127,450", trend: "+9.8%", icon: BadgeCheck, tint: "bg-teal-50 text-teal-600" },
];

const modules = [
  {
    icon: FileText,
    title: "EHR — Electronic Health Records",
    desc: "Patient-owned, blockchain-secured medical records",
    stats: ["18.2M records", "2.8M patients", "99.98% uptime"],
    tint: "bg-blue-50 text-blue-600 ring-blue-100",
    border: "hover:border-blue-200",
    to: "/ehr" as const,
  },
  {
    icon: Pill,
    title: "Medicine Supply Chain",
    desc: "End-to-end pharmaceutical traceability",
    stats: ["4.2M units", "12 recalls active", "0 counterfeits"],
    tint: "bg-orange-50 text-orange-600 ring-orange-100",
    border: "hover:border-orange-200",
    to: "/medicine" as const,
  },
  {
    icon: Building2,
    title: "Insurance Claims",
    desc: "Automated BPJS & private insurance processing",
    stats: ["94K/month", "78% auto-approved", "Rp 2.1B settled"],
    tint: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    border: "hover:border-emerald-200",
    to: "/claims" as const,
  },
  {
    icon: FlaskConical,
    title: "Research Marketplace",
    desc: "Anonymized medical data for ethical research",
    stats: ["47 datasets", "23 institutions", "128K opted-in"],
    tint: "bg-violet-50 text-violet-600 ring-violet-100",
    border: "hover:border-violet-200",
    to: "/research" as const,
  },
  {
    icon: BadgeCheck,
    title: "Medical Credentials",
    desc: "Tamper-proof professional verification",
    stats: ["127K credentials", "48K doctors", "892 revocations"],
    tint: "bg-teal-50 text-teal-600 ring-teal-100",
    border: "hover:border-teal-200",
    to: "/credentials" as const,
  },
  {
    icon: Link2,
    title: "Blockchain Explorer",
    desc: "Real-time ledger transparency",
    stats: ["1.24M blocks", "847 nodes", "1,247 TPS"],
    tint: "bg-slate-100 text-navy ring-slate-200",
    border: "hover:border-slate-300",
  },
];

const activity = [
  { icon: CheckCircle2, color: "text-success", text: "Medical record updated — Patient #84721 — Dr. Sarah", time: "2s ago", hash: "0xa3f2…91c" },
  { icon: ShieldCheck, color: "text-highlight", text: "Consent granted — Patient #29183 → RSUD Bekasi", time: "14s ago", hash: "0xb7c1…48d" },
  { icon: Pill, color: "text-warning", text: "Medicine batch verified — Batch #PF-2024-0891 — Kimia Farma", time: "31s ago", hash: "0xc9e0…12a" },
  { icon: Wallet, color: "text-success", text: "Claim auto-approved — Rp 2,450,000 — RSUP Cipto", time: "1m ago", hash: "0xd442…77b" },
  { icon: AlertTriangle, color: "text-danger", text: "Recall alert issued — Batch #MK-443 — BPOM", time: "3m ago", hash: "0xe88f…35e" },
  { icon: BadgeCheck, color: "text-teal-600", text: "Credential issued — dr. Ahmad Rifai, SpJP — IDI", time: "5m ago", hash: "0xf102…aa1" },
  { icon: FlaskConical, color: "text-violet-600", text: "Dataset purchased — Diabetes Type-2 — UI Research", time: "8m ago", hash: "0x9b3c…ef4" },
  { icon: AlertTriangle, color: "text-danger", text: "Fraud flag — Claim #CL-98234 — score 87%", time: "12m ago", hash: "0x77a8…22d" },
];

const cities = [
  { name: "Jakarta", x: 38, y: 62, size: 14 },
  { name: "Surabaya", x: 56, y: 70, size: 10 },
  { name: "Medan", x: 18, y: 32, size: 9 },
  { name: "Makassar", x: 70, y: 66, size: 8 },
  { name: "Balikpapan", x: 62, y: 50, size: 7 },
];

// 24 buckets — synthetic TPS, peak business hours
const tps = [
  220, 180, 150, 130, 140, 200, 380, 620, 880, 1050, 1180, 1247,
  1190, 1100, 1080, 1140, 1210, 1060, 820, 600, 480, 360, 290, 240,
];

function Welcome() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-r from-navy via-navy-medium to-navy-bright text-white shadow-sm">
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-white/60 uppercase">{today}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">Welcome back, dr. Sarah Putri</h1>
          <p className="mt-1 text-sm text-white/70">
            Your blockchain healthcare workspace is healthy and operating at full capacity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15">
            New Record
          </button>
          <button className="rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-highlight/90">
            View Explorer
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 bg-black/15 px-6 py-3 text-xs text-white/80">
        <span className="flex items-center gap-2">
          <Link2 className="h-3.5 w-3.5" /> Block <span className="font-mono font-semibold text-white">#1,247,832</span>
        </span>
        <span className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5" /> Last block: <span className="font-semibold text-white">2s ago</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success" /> Network: <span className="font-semibold text-white">Healthy</span>
        </span>
        <span className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5" /> Peers: <span className="font-semibold text-white">847</span>
        </span>
      </div>
    </div>
  );
}

function StatCard({ s }: { s: (typeof stats)[number] }) {
  const Icon = s.icon;
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
          <TrendingUp className="h-3 w-3" /> {s.trend}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">{s.value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
    </div>
  );
}

function ModuleCard({ m }: { m: (typeof modules)[number] }) {
  const Icon = m.icon;
  return (
    <div className={`group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md ${m.border}`}>
      <div className="flex items-start justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-lg ring-1 ${m.tint}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-emerald-700 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
        </span>
      </div>
      <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">{m.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {m.stats.map((s) => (
          <span key={s} className="rounded-md bg-secondary px-2 py-1 text-[11px] font-medium text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>
      {"to" in m && m.to ? (
        <Link to={m.to} className="mt-5 inline-flex items-center gap-1 self-start text-sm font-semibold text-highlight hover:gap-2 hover:text-navy-bright">
          Open Module <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <button className="mt-5 inline-flex items-center gap-1 self-start text-sm font-semibold text-highlight hover:gap-2 hover:text-navy-bright">
          Open Module <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
}

function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-base font-bold tracking-tight">Recent Activity</h3>
          <p className="text-xs text-muted-foreground">Live blockchain transactions</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>
      <ul className="divide-y divide-border">
        {activity.map((a, i) => {
          const Icon = a.icon;
          return (
            <li key={i} className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-accent/40">
              <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-secondary">
                <Icon className={`h-3.5 w-3.5 ${a.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{a.text}</p>
                <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{a.time}</span>
                  <span>•</span>
                  <span className="font-mono text-highlight">{a.hash}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HealthGauge({ value = 98.7 }: { value?: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative grid place-items-center">
      <svg width="120" height="120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} stroke="oklch(0.92 0.01 247)" strokeWidth="10" fill="none" />
        <circle
          cx="60" cy="60" r={r}
          stroke="url(#gaugeGrad)" strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#205295" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-bold tracking-tight text-foreground">{value}%</p>
        <p className="text-[10px] font-medium text-muted-foreground">Healthy</p>
      </div>
    </div>
  );
}

function TpsChart() {
  const max = Math.max(...tps);
  return (
    <div>
      <div className="flex items-end gap-1 h-24">
        {tps.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-navy-bright to-highlight transition-all hover:opacity-80"
            style={{ height: `${(v / max) * 100}%` }}
            title={`${v} TPS`}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
      </div>
    </div>
  );
}

function NodeMap() {
  return (
    <div className="relative h-44 overflow-hidden rounded-lg border border-border bg-gradient-to-br from-slate-50 to-blue-50/40">
      {/* Simplified Indonesia silhouette via gradient/ovals (decorative) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-30">
        <ellipse cx="20" cy="35" rx="12" ry="5" fill="#2C74B3" />
        <ellipse cx="45" cy="65" rx="22" ry="6" fill="#2C74B3" />
        <ellipse cx="60" cy="50" rx="10" ry="14" fill="#2C74B3" />
        <ellipse cx="72" cy="65" rx="7" ry="9" fill="#2C74B3" />
        <ellipse cx="85" cy="68" rx="10" ry="5" fill="#2C74B3" />
      </svg>
      {cities.map((c) => (
        <div
          key={c.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <div className="relative">
            <span className="absolute inset-0 animate-ping rounded-full bg-highlight/40" />
            <span
              className="relative block rounded-full bg-highlight shadow-md ring-2 ring-white"
              style={{ width: c.size, height: c.size }}
            />
          </div>
          <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold whitespace-nowrap text-foreground shadow-sm">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function NetworkHealth() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-base font-bold tracking-tight">Network Health</h3>
        <p className="text-xs text-muted-foreground">Real-time consensus & node telemetry</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-5">
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-background/60 p-4">
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Health</p>
          <HealthGauge value={98.7} />
        </div>
        <div className="rounded-lg border border-border bg-background/60 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">TPS · 24h</p>
            <span className="text-[11px] font-semibold text-foreground">peak 1,247</span>
          </div>
          <TpsChart />
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">Node Map</p>
          <span className="text-[11px] text-muted-foreground">5 regions · 847 nodes</span>
        </div>
        <NodeMap />
      </div>

      <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-5 py-3">
        <div className="flex items-center gap-2">
          <Hospital className="h-4 w-4 text-highlight" />
          <span className="text-sm font-semibold text-foreground">Consensus: Raft</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          <CheckCircle2 className="h-3 w-3" /> 5/5 Orderers Active
        </span>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground/60">HealthChain</span> / Dashboard
          </p>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">Overview</h2>
        </div>
      </div>

      <Welcome />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => <StatCard key={s.label} s={s} />)}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold tracking-tight">Core Modules</h3>
            <p className="text-xs text-muted-foreground">Six interconnected products powering the platform</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => <ModuleCard key={m.title} m={m} />)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ActivityFeed />
        <NetworkHealth />
      </div>
    </div>
  );
}
