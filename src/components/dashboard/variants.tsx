import { ReactNode } from "react";
import {
  Heart, Pill, Wallet, Calendar, ShieldCheck, FlaskConical, ArrowRight,
  Stethoscope, ClipboardList, UserSearch, PenSquare, FileText,
  Hospital, AlertTriangle, Banknote, ListChecks, MapPinned,
  Siren, PackageCheck, Thermometer, Database, ShoppingBag, Vote,
  Activity, TrendingUp, type LucideIcon,
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

/* ---------------- shared bits ---------------- */

function Welcome({ subtitle, actions }: { subtitle: string; actions?: ReactNode }) {
  const { role } = useRole();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-r from-navy via-navy-medium to-navy-bright text-white shadow-sm">
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium tracking-wide text-white/60 uppercase">{today}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">{role.greeting}</h1>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

function MiniStat({ Icon, label, value, sub, tint }: {
  Icon: LucideIcon; label: string; value: string; sub?: string; tint: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${tint}`}>
          <Icon className="h-5 w-5" />
        </div>
        {sub && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <TrendingUp className="h-3 w-3" /> {sub}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Card({ title, subtitle, children, action }: {
  title: string; subtitle?: string; children: ReactNode; action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-base font-bold tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ---------------- PATIENT ---------------- */

export function PatientDashboard() {
  return (
    <div className="space-y-6">
      <Welcome
        subtitle="Catatan kesehatan Anda tersimpan aman di blockchain — hanya Anda yang memberikan akses."
        actions={
          <button className="rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-white hover:bg-highlight/90">
            Atur Consent
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={Heart} label="Catatan Medis" value="47" tint="bg-rose-50 text-rose-600" />
        <MiniStat Icon={Pill} label="Resep Aktif" value="2" tint="bg-orange-50 text-orange-600" />
        <MiniStat Icon={Wallet} label="Klaim Bulan Ini" value="Rp 4,25 jt" sub="disetujui" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={ShieldCheck} label="Akses Aktif" value="3 dokter" tint="bg-sky-50 text-sky-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Ringkasan Kesehatan" subtitle="Kondisi & pengobatan aktif">
          <ul className="space-y-3">
            {[
              { Icon: Activity, name: "Diabetes Mellitus Tipe 2", meta: "ICD: E11 · Terkontrol", tone: "text-rose-600" },
              { Icon: Activity, name: "Hipertensi", meta: "ICD: I10 · TD 130/85", tone: "text-amber-600" },
              { Icon: Pill, name: "Metformin 500mg", meta: "2× / hari", tone: "text-orange-600" },
              { Icon: Pill, name: "Amlodipine 5mg", meta: "1× / hari", tone: "text-orange-600" },
            ].map((r) => (
              <li key={r.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <r.Icon className={`h-4 w-4 ${r.tone}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Janji Temu Mendatang" subtitle="Jadwal kontrol Anda">
          <ul className="space-y-3">
            {[
              { date: "15 Jun 2026 · 10:30", doc: "dr. Sarah Putri", loc: "RSUP Dr. Cipto" },
              { date: "28 Jun 2026 · 09:00", doc: "dr. Ahmad Rifai", loc: "Lab Prodia Kuningan" },
            ].map((a) => (
              <li key={a.date} className="flex items-center gap-3 rounded-lg border border-highlight/30 bg-highlight/5 p-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-highlight text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.date}</p>
                  <p className="text-xs text-muted-foreground">{a.doc} · {a.loc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Aktivitas Consent" subtitle="Siapa mengakses data Anda">
          <ul className="space-y-2">
            {[
              { who: "dr. Sarah Putri", what: "Membuka rekam medis", time: "2m" },
              { who: "RSUD Bekasi", what: "Meminta akses (pending)", time: "1h" },
              { who: "dr. Ahmad Rifai", what: "Akses lab disetujui", time: "1d" },
            ].map((c) => (
              <li key={c.who + c.time} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <p className="text-sm font-semibold">{c.who}</p>
                  <p className="text-[11px] text-muted-foreground">{c.what}</p>
                </div>
                <span className="text-[11px] text-muted-foreground">{c.time}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Opt-in Riset" subtitle="Kontribusi data anonim untuk penelitian" action={
          <button className="text-xs font-semibold text-highlight hover:underline">Kelola →</button>
        }>
          <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-violet-50 to-white p-4">
            <FlaskConical className="h-8 w-8 text-violet-600" />
            <div>
              <p className="text-sm font-bold">Diabetes Longitudinal Study</p>
              <p className="text-[11px] text-muted-foreground">Data Anda telah berkontribusi · Imbalan: Rp 180,000</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- DOCTOR ---------------- */

export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <Welcome
        subtitle="You have 6 patients in queue and 3 labs awaiting review."
        actions={
          <>
            <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15">
              <PenSquare className="mr-1.5 inline h-4 w-4" /> New Entry
            </button>
            <button className="rounded-lg bg-highlight px-4 py-2 text-sm font-semibold text-white hover:bg-highlight/90">
              <UserSearch className="mr-1.5 inline h-4 w-4" /> Search Patient
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={Stethoscope} label="Today's Appointments" value="14" sub="6 pending" tint="bg-blue-50 text-blue-600" />
        <MiniStat Icon={ClipboardList} label="Active Patients" value="218" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={FileText} label="Records This Week" value="47" sub="+12%" tint="bg-violet-50 text-violet-600" />
        <MiniStat Icon={ShieldCheck} label="Credentials" value="Active" tint="bg-teal-50 text-teal-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card title="Today's Schedule" subtitle="14 appointments · RSUP Dr. Cipto">
          <ul className="divide-y divide-border">
            {[
              { time: "09:00", name: "Budi Santoso", reason: "Kontrol Diabetes", status: "Seen" },
              { time: "09:30", name: "Siti Rahayu", reason: "Hipertensi follow-up", status: "Seen" },
              { time: "10:00", name: "Agus Hermawan", reason: "Hemodialisis review", status: "In room" },
              { time: "10:30", name: "Dewi Kusuma", reason: "Hasil lab anemia", status: "Waiting" },
              { time: "11:00", name: "Haryanto", reason: "Post-stroke rehab", status: "Waiting" },
              { time: "11:30", name: "Fitri Handayani", reason: "Asma akut", status: "Waiting" },
            ].map((a) => (
              <li key={a.time} className="flex items-center gap-3 py-3">
                <span className="w-14 font-mono text-sm font-bold text-navy">{a.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground">{a.reason}</p>
                </div>
                <span className={[
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                  a.status === "Seen" ? "bg-emerald-50 text-emerald-700 ring-emerald-100" :
                  a.status === "In room" ? "bg-amber-50 text-amber-700 ring-amber-100" :
                  "bg-slate-100 text-slate-700 ring-slate-200",
                ].join(" ")}>{a.status}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Labs to Review" subtitle="3 results require sign-off">
          <ul className="space-y-2">
            {[
              { p: "Budi Santoso", t: "HbA1c · 7.2%", note: "↑ from 6.8" },
              { p: "Haryanto", t: "CT Brain", note: "Old infarct, no new lesion" },
              { p: "Dewi Kusuma", t: "Hb · 9.4 g/dL", note: "Anemia ringan" },
            ].map((l) => (
              <li key={l.p} className="rounded-lg border border-border p-3">
                <p className="text-sm font-semibold">{l.p}</p>
                <p className="text-[11px] text-muted-foreground">{l.t} · <span className="text-amber-700">{l.note}</span></p>
                <button className="mt-2 text-xs font-semibold text-highlight hover:underline">Sign off →</button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- BPJS ---------------- */

export function BpjsDashboard() {
  return (
    <div className="space-y-6">
      <Welcome subtitle="Claims pipeline · Regional Jakarta · Real-time fraud monitoring." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={ListChecks} label="Claims Today" value="1,284" sub="+18%" tint="bg-blue-50 text-blue-600" />
        <MiniStat Icon={Banknote} label="Settled (24h)" value="Rp 2.1 M" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={AlertTriangle} label="Fraud Flags" value="47" tint="bg-rose-50 text-rose-600" />
        <MiniStat Icon={MapPinned} label="Active Faskes" value="328" tint="bg-violet-50 text-violet-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Fraud Dashboard" subtitle="High-risk claims this week">
          <ul className="space-y-2">
            {[
              { id: "CL-2026-94819", hosp: "RS Fatmawati", amt: "Rp 28.5 jt", score: 87 },
              { id: "CL-2026-94815", hosp: "RS Hermina",   amt: "Rp 3.4 jt",  score: 72 },
              { id: "CL-2026-94814", hosp: "RSUD Tangerang", amt: "Rp 8.7 jt", score: 68 },
            ].map((f) => (
              <li key={f.id} className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50/40 p-3">
                <div>
                  <p className="font-mono text-xs font-semibold text-navy">{f.id}</p>
                  <p className="text-[11px] text-muted-foreground">{f.hosp} · {f.amt}</p>
                </div>
                <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">{f.score}%</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Regional Utilization" subtitle="DKI Jakarta · Top faskes">
          <ul className="space-y-2">
            {[
              { n: "RSUP Dr. Cipto",  v: 92, c: "Rp 482 jt" },
              { n: "RSUD Tarakan",    v: 78, c: "Rp 318 jt" },
              { n: "RS Fatmawati",    v: 65, c: "Rp 271 jt" },
              { n: "RSUD Pasar Rebo", v: 54, c: "Rp 198 jt" },
              { n: "RSUD Koja",       v: 41, c: "Rp 142 jt" },
            ].map((r) => (
              <li key={r.n}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold">{r.n}</span>
                  <span className="text-muted-foreground">{r.c}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-navy-bright to-highlight" style={{ width: `${r.v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- BPOM ---------------- */

export function BpomDashboard() {
  return (
    <div className="space-y-6">
      <Welcome subtitle="3 active recalls · 12 cold-chain alerts in last 24h." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={Siren} label="Active Recalls" value="3" tint="bg-rose-50 text-rose-600" />
        <MiniStat Icon={PackageCheck} label="Verified Today" value="12,847" sub="100%" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={Thermometer} label="Cold Chain Alerts" value="12" tint="bg-amber-50 text-amber-600" />
        <MiniStat Icon={AlertTriangle} label="Suspicious Reports" value="7" tint="bg-orange-50 text-orange-600" />
      </div>

      <Card title="Active Recall Bulletins" subtitle="Public health alerts in force">
        <ul className="space-y-2">
          {[
            { id: "MK-2026-0443", p: "Obat X Generic", reason: "Contamination risk", left: "47 units missing" },
            { id: "KF-2025-7712", p: "Vitamin C 1000mg", reason: "Mislabeling", left: "12 units missing" },
            { id: "PF-2025-3318", p: "Antasid Suspensi", reason: "Foreign particle", left: "0 units (resolved soon)" },
          ].map((r) => (
            <li key={r.id} className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50/40 p-3">
              <div>
                <p className="font-mono text-xs font-semibold text-navy">{r.id} · {r.p}</p>
                <p className="text-[11px] text-muted-foreground">{r.reason}</p>
              </div>
              <span className="text-xs font-semibold text-rose-700">{r.left}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- RESEARCHER ---------------- */

export function ResearcherDashboard() {
  return (
    <div className="space-y-6">
      <Welcome subtitle="UI Faculty of Medicine · 4 active datasets · 2 proposals under review." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={Database} label="Purchased Datasets" value="4" tint="bg-violet-50 text-violet-600" />
        <MiniStat Icon={ShoppingBag} label="HealthPoint Balance" value="Rp 24.8 jt" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={Vote} label="Proposals" value="2 review" tint="bg-amber-50 text-amber-600" />
        <MiniStat Icon={FlaskConical} label="Datasets Published" value="1" tint="bg-blue-50 text-blue-600" />
      </div>

      <Card title="My Purchased Datasets" subtitle="Active research workspaces">
        <ul className="divide-y divide-border">
          {[
            { n: "Diabetes Longitudinal Study", r: "847K rows", d: "Purchased 12 Mar 2026" },
            { n: "TB Treatment Outcomes",       r: "94K rows",  d: "Purchased 02 Feb 2026" },
            { n: "Pediatric Nutrition & Growth", r: "2.8M rows", d: "Purchased 18 Jan 2026" },
            { n: "Mental Health Screening",     r: "189K rows", d: "Purchased 04 Dec 2025" },
          ].map((d) => (
            <li key={d.n} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-semibold">{d.n}</p>
                <p className="text-[11px] text-muted-foreground">{d.r} · {d.d}</p>
              </div>
              <button className="text-xs font-semibold text-highlight hover:underline">Open workspace →</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- PHARMACY ---------------- */

export function PharmacyDashboard() {
  return (
    <div className="space-y-6">
      <Welcome subtitle="Apotek Kimia Farma · 87 dispensings today · all batches verified." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat Icon={PackageCheck} label="Verified Today" value="124" sub="100% authentic" tint="bg-emerald-50 text-emerald-600" />
        <MiniStat Icon={Pill} label="Dispensings" value="87" tint="bg-orange-50 text-orange-600" />
        <MiniStat Icon={ClipboardList} label="E-Prescriptions" value="42 new" tint="bg-blue-50 text-blue-600" />
        <MiniStat Icon={AlertTriangle} label="Low Stock" value="6 SKU" tint="bg-amber-50 text-amber-600" />
      </div>

      <Card title="Incoming E-Prescriptions" subtitle="Awaiting fulfilment">
        <ul className="divide-y divide-border">
          {[
            { p: "Budi Santoso", rx: "Metformin 500mg · 60 tabs", doc: "dr. Sarah Putri" },
            { p: "Siti Rahayu",  rx: "Amlodipine 5mg · 30 tabs",  doc: "dr. Ahmad Rifai" },
            { p: "Haryanto",     rx: "Aspirin 80mg · 30 tabs",    doc: "dr. Sarah Putri" },
          ].map((r) => (
            <li key={r.p} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-semibold">{r.p}</p>
                <p className="text-[11px] text-muted-foreground">{r.rx} · {r.doc}</p>
              </div>
              <button className="rounded-md bg-navy px-2.5 py-1 text-xs font-semibold text-white hover:bg-navy-medium">Dispense</button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ---------------- HOSPITAL ADMIN (extras) ---------------- */

export function HospitalExtraStrip() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MiniStat Icon={Hospital} label="Admissions Today" value="68" sub="+9%" tint="bg-blue-50 text-blue-600" />
      <MiniStat Icon={Banknote} label="Claim Revenue" value="Rp 482 jt" tint="bg-emerald-50 text-emerald-600" />
      <MiniStat Icon={ShieldCheck} label="Staff Compliant" value="97%" tint="bg-teal-50 text-teal-600" />
      <MiniStat Icon={Pill} label="Inventory OK" value="92%" tint="bg-orange-50 text-orange-600" />
    </div>
  );
}
