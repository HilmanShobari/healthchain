import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  ShoppingBag,
  Vote,
  Database,
  Building2,
  Users,
  Wallet,
  Star,
  ShieldCheck,
  Clock,
  Eye,
  FlaskConical,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
});

const stats = [
  { label: "Available Datasets",  value: "47",      sub: "12 new this month",     tint: "bg-violet-50 text-violet-600", Icon: Database },
  { label: "Institutions",        value: "23",      sub: "8 countries",           tint: "bg-blue-50 text-blue-600",     Icon: Building2 },
  { label: "Opted-in Patients",   value: "128,453", sub: "↑ 2,341 this week",     tint: "bg-emerald-50 text-emerald-600", Icon: Users },
  { label: "Revenue Distributed", value: "Rp 847M", sub: "to 89K patients",       tint: "bg-amber-50 text-amber-600",   Icon: Wallet },
];

type Dataset = {
  title: string;
  desc: string;
  tags: string[];
  rows: string;
  scope: string;
  range: string;
  rating: number;
  price: string;
  ethics: "approved" | "pending";
  accent: string;     // bg + text + ring
  dotTint: string;
};

const datasets: Dataset[] = [
  {
    title: "Diabetes Longitudinal Study",
    desc: "10-year follow-up data for Type 2 Diabetes patients across Java",
    tags: ["#diabetes", "#longitudinal", "#java"],
    rows: "847K rows", scope: "12 hospitals", range: "2016 – 2026",
    rating: 5, price: "Rp 15,000,000", ethics: "approved",
    accent: "bg-rose-50 text-rose-700 ring-rose-100", dotTint: "bg-rose-500",
  },
  {
    title: "Hypertension & Cardiovascular Risk",
    desc: "Anonymized BP readings, ECG, and medication response data",
    tags: ["#cardio", "#hypertension", "#ecg"],
    rows: "1.2M rows", scope: "8 hospitals", range: "2020 – 2026",
    rating: 4, price: "Rp 22,500,000", ethics: "approved",
    accent: "bg-violet-50 text-violet-700 ring-violet-100", dotTint: "bg-violet-500",
  },
  {
    title: "Pediatric Nutrition & Growth",
    desc: "Under-5 nutritional status and stunting data — national coverage",
    tags: ["#pediatric", "#stunting", "#nutrition"],
    rows: "2.8M rows", scope: "47 puskesmas", range: "2022 – 2026",
    rating: 5, price: "Rp 31,000,000", ethics: "approved",
    accent: "bg-orange-50 text-orange-700 ring-orange-100", dotTint: "bg-orange-500",
  },
  {
    title: "COVID-19 Long-term Outcomes",
    desc: "Post-COVID symptoms and recovery tracking across demographics",
    tags: ["#covid19", "#longcovid", "#recovery"],
    rows: "432K rows", scope: "22 hospitals", range: "2021 – 2024",
    rating: 4, price: "Rp 18,750,000", ethics: "approved",
    accent: "bg-sky-50 text-sky-700 ring-sky-100", dotTint: "bg-sky-500",
  },
  {
    title: "Mental Health & Depression Screening",
    desc: "PHQ-9 scores, demographics, and intervention outcomes",
    tags: ["#mentalhealth", "#depression", "#PHQ9"],
    rows: "189K rows", scope: "15 clinics", range: "2023 – 2026",
    rating: 3, price: "Rp 9,500,000", ethics: "pending",
    accent: "bg-emerald-50 text-emerald-700 ring-emerald-100", dotTint: "bg-emerald-500",
  },
  {
    title: "TB Treatment Outcomes",
    desc: "Multi-medicine resistant TB tracking and treatment efficacy",
    tags: ["#tuberculosis", "#MDR-TB", "#treatment"],
    rows: "94K rows", scope: "31 puskesmas", range: "2019 – 2026",
    rating: 4, price: "Rp 12,000,000", ethics: "approved",
    accent: "bg-amber-50 text-amber-700 ring-amber-100", dotTint: "bg-amber-500",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= n ? "fill-amber-400 text-amber-400" : "fill-transparent text-slate-300"}`}
        />
      ))}
    </div>
  );
}

function DatasetCard({ d }: { d: Dataset }) {
  return (
    <article className="group flex flex-col rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between border-b border-border p-5 pb-4">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${d.accent}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${d.dotTint}`} />
          Dataset
        </span>
        {d.ethics === "approved" ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
            <ShieldCheck className="h-3 w-3" /> Ethics Approved
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-100">
            <Clock className="h-3 w-3" /> Ethics Pending
          </span>
        )}
      </div>

      <div className="flex-1 p-5">
        <h3 className="text-base font-bold tracking-tight text-foreground">{d.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{d.desc}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {d.tags.map((t) => (
            <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{t}</span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg border border-border bg-background/60 p-2.5">
          {[
            { k: "Rows",      v: d.rows },
            { k: "Coverage",  v: d.scope },
            { k: "Period",    v: d.range },
          ].map((s) => (
            <div key={s.k} className="text-center">
              <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">{s.k}</p>
              <p className="mt-0.5 text-xs font-semibold text-foreground">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Quality</p>
            <Stars n={d.rating} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Price</p>
            <p className="text-base font-bold text-navy">{d.price}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-border bg-secondary/30 p-3">
        <Button variant="outline" className="h-9 flex-1 rounded-lg font-semibold">
          <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
        </Button>
        {d.ethics === "approved" ? (
          <Button className="h-9 flex-1 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">Purchase</Button>
        ) : (
          <Button className="h-9 flex-1 rounded-lg bg-amber-500 font-semibold text-white hover:bg-amber-600">Waitlist</Button>
        )}
      </div>
    </article>
  );
}

function ResearchPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Dashboard</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground/70">Research Data</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Medical Research Marketplace</h1>
            <p className="mt-1 text-sm text-muted-foreground">Ethically sourced datasets with revenue back to patients</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="h-9 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">
              <Plus className="mr-1.5 h-4 w-4" /> Publish Dataset
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold">
              <ShoppingBag className="mr-1.5 h-4 w-4" /> My Purchases
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold">
              <Vote className="mr-1.5 h-4 w-4" /> Ethics Committee
            </Button>
          </div>
        </div>

        {/* Gradient banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-navy-bright to-highlight p-6 text-white shadow-sm">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Advancing Indonesian Medical Research</p>
              <p className="mt-0.5 text-sm text-white/80">Ethically sourced · Blockchain-verified · Patient-consented data</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}>
                <s.Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label} · {s.sub}</p>
            </div>
          ))}
        </div>

        {/* Datasets */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold tracking-tight">Featured Datasets</h3>
              <p className="text-xs text-muted-foreground">Anonymized · Patient-consented · Ethics-vetted</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {datasets.map((d) => <DatasetCard key={d.title} d={d} />)}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
