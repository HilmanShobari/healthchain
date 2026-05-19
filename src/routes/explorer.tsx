import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Layers,
  Activity,
  Cpu,
  Gauge,
  Clock,
  GitBranch,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/explorer")({
  component: ExplorerPage,
});

type Block = {
  num: string;
  ts: string;
  txns: number;
  channel: string;
  proposer: string;
  hash: string;
  size: string;
};

const blocks: Block[] = [
  { num: "1,247,832", ts: "Just now", txns: 14, channel: "channel-ehr",        proposer: "RSUP Dr. Cipto",      hash: "0xa3f2c8b1f4e2…91d4", size: "4.2 KB" },
  { num: "1,247,831", ts: "2s ago",   txns: 8,  channel: "channel-claim",      proposer: "BPJS Jakarta",        hash: "0xb7c14d2e8a01…48dc", size: "2.8 KB" },
  { num: "1,247,830", ts: "5s ago",   txns: 23, channel: "channel-supply",     proposer: "PT Enseval",          hash: "0xc9a31f7290bd…12af", size: "7.1 KB" },
  { num: "1,247,829", ts: "8s ago",   txns: 5,  channel: "channel-credential", proposer: "KKI Central",         hash: "0xd4421ee83c91…77b3", size: "1.9 KB" },
  { num: "1,247,828", ts: "11s ago",  txns: 11, channel: "channel-ehr",        proposer: "RS Pondok Indah",     hash: "0xe88fb501a2d4…35e1", size: "3.6 KB" },
  { num: "1,247,827", ts: "14s ago",  txns: 19, channel: "channel-research",   proposer: "UI Faculty",          hash: "0xf102aa44b71c…aa18", size: "5.4 KB" },
  { num: "1,247,826", ts: "17s ago",  txns: 7,  channel: "channel-claim",      proposer: "BPJS Bandung",        hash: "0x9b3cef41d8e7…ef42", size: "2.4 KB" },
  { num: "1,247,825", ts: "20s ago",  txns: 13, channel: "channel-supply",     proposer: "Kimia Farma DC",      hash: "0x77a8221c4f93…22d0", size: "4.0 KB" },
  { num: "1,247,824", ts: "23s ago",  txns: 6,  channel: "channel-ehr",        proposer: "RSUD Bekasi",         hash: "0x4c81e90711ab…6e7c", size: "2.1 KB" },
  { num: "1,247,823", ts: "26s ago",  txns: 16, channel: "channel-credential", proposer: "IDI Pusat",           hash: "0x2d10a76c44f1…1a9b", size: "4.8 KB" },
];

const channelTint: Record<string, string> = {
  "channel-ehr":        "bg-blue-50 text-blue-700 ring-blue-100",
  "channel-claim":      "bg-emerald-50 text-emerald-700 ring-emerald-100",
  "channel-supply":     "bg-orange-50 text-orange-700 ring-orange-100",
  "channel-research":   "bg-violet-50 text-violet-700 ring-violet-100",
  "channel-credential": "bg-teal-50 text-teal-700 ring-teal-100",
};

const channels = [
  { name: "channel-ehr",        status: "active",  nodes: 482, tps: 847 },
  { name: "channel-supply",     status: "active",  nodes: 312, tps: 203 },
  { name: "channel-claim",      status: "active",  nodes: 289, tps: 167 },
  { name: "channel-research",   status: "syncing", nodes: 145, tps: 89 },
  { name: "channel-credential", status: "active",  nodes: 412, tps: 134 },
] as const;

const networkStats = [
  { Icon: Layers,    label: "Latest Block",   value: "#1,247,832" },
  { Icon: GitBranch, label: "Transactions",   value: "24,891,203" },
  { Icon: Cpu,       label: "Active Nodes",   value: "847" },
  { Icon: Gauge,     label: "TPS",            value: "1,247" },
  { Icon: Clock,     label: "Avg Block Time", value: "2.1s" },
  { Icon: Activity,  label: "Channels",       value: "5" },
];

/* fake txns inside a block */
const blockTxns = [
  { id: "tx-0xa3f2c8…01", type: "EHR_UPDATE",      who: "dr. Sarah Putri",  ts: "0s",  ok: true },
  { id: "tx-0xa3f2c8…02", type: "CONSENT_GRANT",   who: "Patient #29183",    ts: "1s",  ok: true },
  { id: "tx-0xa3f2c8…03", type: "PRESCRIPTION",    who: "dr. Sarah Putri",  ts: "1s",  ok: true },
  { id: "tx-0xa3f2c8…04", type: "LAB_RESULT",      who: "Lab Prodia",        ts: "1s",  ok: true },
  { id: "tx-0xa3f2c8…05", type: "EHR_UPDATE",      who: "Ns. Maya Kusuma",   ts: "2s",  ok: true },
];

function ChannelBadge({ name }: { name: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold ring-1 ${channelTint[name]}`}>
      {name}
    </span>
  );
}

function ExplorerPage() {
  const [openBlock, setOpenBlock] = useState<string | null>("1,247,832");

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Dashboard</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground/70">Blockchain Explorer</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Blockchain Explorer</h1>
            <p className="mt-1 text-sm text-muted-foreground">Real-time view of the HealthChain ledger</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3 text-sm font-semibold hover:bg-accent">
              Mainnet <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <span className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Healthy
            </span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-navy via-navy-medium to-navy-bright text-white shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-3 lg:grid-cols-6">
            {networkStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <s.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wider text-white/55 uppercase">{s.label}</p>
                  <p className="truncate font-mono text-sm font-bold">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel health */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold tracking-tight">Channel Health</h3>
              <p className="text-xs text-muted-foreground">Hyperledger channels partitioning the ledger by domain</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {channels.map((c) => {
              const ok = c.status === "active";
              return (
                <div key={c.name} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <ChannelBadge name={c.name} />
                    {ok ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ACTIVE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" /> SYNCING
                      </span>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Nodes</p>
                      <p className="text-sm font-bold">{c.nodes}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">TPS</p>
                      <p className="text-sm font-bold">{c.tps}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Latest blocks */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="text-base font-bold tracking-tight">Latest Blocks</h3>
              <p className="text-xs text-muted-foreground">Streaming · click a block to inspect its transactions</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Live
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-left text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">Block</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Txns</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Proposer</th>
                  <th className="px-4 py-3">Hash</th>
                  <th className="px-4 py-3">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blocks.map((b, i) => {
                  const open = openBlock === b.num;
                  return (
                    <>
                      <tr
                        key={b.num}
                        onClick={() => setOpenBlock(open ? null : b.num)}
                        className={[
                          "cursor-pointer transition-colors",
                          i % 2 === 1 ? "bg-background/40" : "bg-card",
                          open ? "bg-highlight/5" : "hover:bg-accent/50",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 text-muted-foreground">
                          <ChevronRight className={`h-4 w-4 transition-transform ${open ? "rotate-90 text-highlight" : ""}`} />
                        </td>
                        <td className="px-4 py-3 font-mono text-xs font-semibold text-navy">#{b.num}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.ts}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold">{b.txns}</span>
                        </td>
                        <td className="px-4 py-3"><ChannelBadge name={b.channel} /></td>
                        <td className="px-4 py-3 text-foreground">{b.proposer}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-highlight">
                            {b.hash}
                            <Copy className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground" />
                          </span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{b.size}</td>
                      </tr>
                      {open && (
                        <tr className="bg-highlight/[0.03]">
                          <td colSpan={8} className="px-4 py-4">
                            <div className="rounded-lg border border-border bg-card p-4">
                              <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Transactions in block #{b.num}
                              </p>
                              <table className="w-full text-xs">
                                <thead className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                  <tr><th className="py-1 text-left">TxID</th><th className="text-left">Type</th><th className="text-left">Initiator</th><th className="text-left">Time</th><th className="text-right">Status</th></tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                  {blockTxns.slice(0, Math.min(5, b.txns)).map((t) => (
                                    <tr key={t.id}>
                                      <td className="py-2 font-mono text-highlight">{t.id}</td>
                                      <td><span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-semibold">{t.type}</span></td>
                                      <td className="text-foreground">{t.who}</td>
                                      <td className="text-muted-foreground">+{t.ts}</td>
                                      <td className="text-right">
                                        {t.ok ? (
                                          <span className="inline-flex items-center gap-1 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> committed</span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1 text-rose-700"><AlertTriangle className="h-3 w-3" /> failed</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
