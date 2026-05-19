import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plus,
  Search,
  BarChart3,
  ShieldCheck,
  BadgeCheck,
  AlertTriangle,
  Ban,
  Users,
  QrCode,
  Download,
  FileText,
  GraduationCap,
  Link2,
  Copy,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/credentials")({
  component: CredentialsPage,
});

type CredStatus = "active" | "expiring" | "revoked";

const credChip: Record<CredStatus, { label: string; cls: string; Icon: typeof BadgeCheck }> = {
  active:   { label: "Active",    cls: "bg-emerald-50 text-emerald-700 ring-emerald-100", Icon: BadgeCheck },
  expiring: { label: "Expiring",  cls: "bg-amber-50 text-amber-700 ring-amber-100",       Icon: AlertTriangle },
  revoked:  { label: "Revoked",   cls: "bg-rose-50 text-rose-700 ring-rose-100",          Icon: Ban },
};

const stats = [
  { label: "Total Credentials", value: "127,450", sub: "across all professions", tint: "bg-teal-50 text-teal-600",   Icon: Users },
  { label: "Active",            value: "119,832", sub: "94% of registry",        tint: "bg-emerald-50 text-emerald-600", Icon: BadgeCheck },
  { label: "Expiring (30d)",    value: "2,847",   sub: "renewal required",       tint: "bg-amber-50 text-amber-600",  Icon: AlertTriangle },
  { label: "Revoked",           value: "892",     sub: "lifetime total",         tint: "bg-rose-50 text-rose-600",    Icon: Ban },
];

type Cred = {
  id: string;
  name: string;
  type: string;
  spec: string;
  issuer: string;
  valid: string;
  status: CredStatus;
};

const creds: Cred[] = [
  { id: "STR-50301234", name: "dr. Sarah Putri Wijayanti, Sp.PD", type: "STR + SIP", spec: "Penyakit Dalam",            issuer: "KKI",  valid: "Dec 2027", status: "active" },
  { id: "STR-40298721", name: "dr. Bimo Nugroho, Sp.JP",          type: "STR",       spec: "Jantung & Pembuluh Darah",  issuer: "KKI",  valid: "Mar 2026", status: "expiring" },
  { id: "STR-61847293", name: "dr. Ahmad Rifai, Sp.B",            type: "STR + SIP", spec: "Bedah Umum",                issuer: "KKI",  valid: "Jun 2028", status: "active" },
  { id: "STR-77291038", name: "Ns. Maya Kusuma, S.Kep",           type: "STR",       spec: "Keperawatan",               issuer: "MTKI", valid: "Aug 2026", status: "active" },
  { id: "STR-33810472", name: "dr. Reza Hakim",                   type: "STR",       spec: "Umum",                      issuer: "IDI",  valid: "Jan 2026", status: "revoked" },
  { id: "STR-28471930", name: "apt. Fitri Handayani, S.Farm",     type: "STR",       spec: "Apoteker",                  issuer: "IAI",  valid: "Sep 2027", status: "active" },
  { id: "STR-91827364", name: "drg. Citra Pertiwi",               type: "STR + SIP", spec: "Kedokteran Gigi",           issuer: "KKI",  valid: "Nov 2026", status: "active" },
  { id: "STR-55473829", name: "Bd. Lina Marlina, S.Tr.Keb",       type: "STR",       spec: "Bidan",                     issuer: "MTKI", valid: "Feb 2026", status: "expiring" },
];

function StatusBadge({ s }: { s: CredStatus }) {
  const { label, cls, Icon } = credChip[s];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cls}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}

/* QR Code (decorative SVG block-pattern) */
function FakeQR() {
  // deterministic pattern
  const cells: boolean[] = Array.from({ length: 21 * 21 }, (_, i) => {
    const x = i % 21, y = Math.floor(i / 21);
    if ((x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)) return false; // corners drawn separately
    return ((x * 31 + y * 17 + (x ^ y) * 7) % 5) > 1;
  });
  return (
    <div className="grid h-28 w-28 grid-cols-21 gap-0 rounded-md bg-white p-1 ring-1 ring-border" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
      {cells.map((on, i) => (
        <span key={i} className={on ? "bg-navy" : "bg-white"} style={{ aspectRatio: "1 / 1" }} />
      ))}
      {/* finder squares overlay */}
      <div className="pointer-events-none col-span-21 row-span-21 -mt-[7.16rem] grid grid-cols-21" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
        {[[0, 0], [14, 0], [0, 14]].map(([cx, cy], i) => (
          <span
            key={i}
            className="bg-white"
            style={{
              gridColumn: `${cx + 1} / span 7`,
              gridRow: `${cy + 1} / span 7`,
              boxShadow: "inset 0 0 0 4px var(--navy), inset 0 0 0 6px white, inset 0 0 0 9px var(--navy)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CredentialCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-navy via-navy-medium to-navy-bright px-5 py-3 text-white">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-highlight">
            <Link2 className="h-3.5 w-3.5" />
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-white/70">HealthChain</p>
            <p className="text-xs font-bold">Verifiable Credential</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-100 ring-1 ring-emerald-300/30">
          <ShieldCheck className="h-3 w-3" /> ACTIVE
        </span>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr_auto] md:items-start">
        {/* Avatar */}
        <div className="grid h-24 w-24 place-items-center rounded-xl bg-gradient-to-br from-navy-bright to-highlight text-2xl font-bold text-white shadow-md">
          SP
        </div>

        {/* Info */}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted-foreground">Konsil Kedokteran Indonesia</p>
          <h3 className="mt-0.5 text-lg font-bold tracking-tight text-foreground">dr. Sarah Putri Wijayanti, Sp.PD</h3>
          <p className="text-sm text-muted-foreground">Spesialis Penyakit Dalam · RSUP Dr. Cipto Mangunkusumo</p>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">STR No.</p>
              <p className="font-mono font-semibold text-foreground">50301234567</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">SIP No.</p>
              <p className="font-mono font-semibold text-foreground">SIP/14.2/0892/2024</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Issued</p>
              <p className="font-semibold text-foreground">01 Jan 2024</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Expires</p>
              <p className="font-semibold text-foreground">31 Dec 2027</p>
            </div>
          </div>

          {/* CME Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 font-semibold text-muted-foreground">
                <GraduationCap className="h-3.5 w-3.5" /> CME Points
              </span>
              <span className="font-bold text-foreground">142 / 150</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-highlight to-emerald-500" style={{ width: "94.6%" }} />
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-4">
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">Attached Certifications</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Sp.PD Certificate", "ACLS", "Infection Control"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-md bg-teal-50 px-2 py-1 text-[11px] font-semibold text-teal-700 ring-1 ring-teal-100">
                  <FileText className="h-3 w-3" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center gap-2">
          <FakeQR />
          <p className="text-[10px] text-muted-foreground">Scan to verify</p>
        </div>
      </div>

      {/* Footer / blockchain */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-gradient-to-br from-slate-50 to-blue-50/40 px-5 py-3">
        <div className="flex items-center gap-2 text-xs">
          <Link2 className="h-3.5 w-3.5 text-navy" />
          <span className="font-semibold text-navy">Verified on HealthChain</span>
          <span className="text-muted-foreground">·</span>
          <span className="font-mono font-semibold text-foreground">Block #1,244,201</span>
          <Copy className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-8 rounded-lg text-xs font-semibold">
            <Download className="mr-1 h-3 w-3" /> PDF
          </Button>
          <Button className="h-8 rounded-lg bg-navy text-xs font-semibold text-white hover:bg-navy-medium">
            View Full
          </Button>
        </div>
      </div>
    </div>
  );
}

function CredentialsPage() {
  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Dashboard</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground/70">Credentials</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Medical Professional Credentials</h1>
            <p className="mt-1 text-sm text-muted-foreground">Tamper-proof verification of healthcare workers</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="h-9 rounded-lg bg-navy font-semibold text-white hover:bg-navy-medium">
              <Plus className="mr-1.5 h-4 w-4" /> Issue Credential
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold">
              <Search className="mr-1.5 h-4 w-4" /> Verify Credential
            </Button>
            <Button variant="outline" className="h-9 rounded-lg font-semibold">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Reports
            </Button>
          </div>
        </div>

        {/* Quick verify widget */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-highlight" />
            <p className="text-sm font-bold tracking-tight">Quick Verify</p>
            <span className="text-xs text-muted-foreground">— Instant on-chain lookup</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter STR number, SIP number, or scan QR..."
                className="w-full rounded-lg border border-border bg-background py-2.5 pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:border-highlight focus:ring-2 focus:ring-highlight/20 focus:outline-none"
              />
            </div>
            <Button className="h-10 rounded-lg bg-highlight px-5 font-semibold text-white hover:bg-highlight/90">
              <Search className="mr-1.5 h-4 w-4" /> Verify Instantly
            </Button>
          </div>

          {/* Result */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">Verified</span>
                  <p className="text-sm font-bold text-foreground">dr. Sarah Putri Wijayanti, Sp.PD</p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  STR: <span className="font-mono font-semibold text-foreground">50301234567</span> · Valid until <span className="font-semibold text-foreground">31 Dec 2027</span>
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Issued by <span className="font-semibold">Konsil Kedokteran Indonesia</span> · Block <span className="font-mono font-semibold">#1,244,201</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 rounded-lg font-semibold">View Full</Button>
              <Button variant="outline" className="h-9 rounded-lg font-semibold">
                <Download className="mr-1.5 h-4 w-4" /> PDF
              </Button>
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

        {/* Two columns: table + credential card */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <h3 className="text-base font-bold tracking-tight">All Credentials</h3>
              <p className="text-xs text-muted-foreground">Cryptographically signed by issuing authorities</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/60 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    <th className="px-4 py-3">Credential ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Specialization</th>
                    <th className="px-4 py-3">Issuer</th>
                    <th className="px-4 py-3">Valid Until</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {creds.map((c, i) => (
                    <tr key={c.id} className={`${i % 2 === 1 ? "bg-background/40" : "bg-card"} hover:bg-accent/50`}>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">{c.id}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">{c.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-foreground">{c.spec}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.issuer}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.valid}</td>
                      <td className="px-4 py-3"><StatusBadge s={c.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button className="rounded-md px-2 py-1 text-xs font-semibold text-highlight hover:bg-highlight/10">View</button>
                          {c.status === "active" && (
                            <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-accent">
                              <QrCode className="h-3 w-3" /> QR
                            </button>
                          )}
                          {c.status === "expiring" && (
                            <button className="rounded-md px-2 py-1 text-xs font-semibold text-amber-600 hover:bg-amber-50">Renew</button>
                          )}
                          {c.status === "revoked" && (
                            <button className="rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-accent">Details</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CredentialCard />
        </div>
      </div>
    </AppShell>
  );
}
