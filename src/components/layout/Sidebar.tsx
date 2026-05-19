import { Link, useRouterState } from "@tanstack/react-router";
import { Link2, Activity } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

export function Sidebar() {
  const { role } = useRole();
  const currentPath = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/5 px-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-highlight shadow-lg">
          <Link2 className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold tracking-tight">HealthChain</p>
          <p className="text-[10px] text-white/50">{role.label} workspace</p>
        </div>
      </div>

      <nav key={role.key} className="flex-1 animate-in fade-in slide-in-from-left-2 overflow-y-auto py-2 duration-300 scrollbar-thin">
        {role.menu.map((section) => (
          <div key={section.label} className="px-3">
            <p className="px-3 pt-5 pb-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
              {section.label}
            </p>
            <ul className="space-y-1">
              {section.items.map((it, i) => {
                const active = it.to ? currentPath === it.to : false;
                const cls = [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-highlight text-white shadow-sm"
                    : "text-white/75 hover:bg-navy-medium hover:text-white",
                ].join(" ");
                const inner = (
                  <>
                    <it.icon className="h-[18px] w-[18px] shrink-0" />
                    <span className="truncate">{it.title}</span>
                  </>
                );
                return (
                  <li key={`${section.label}-${it.title}-${i}`}>
                    {it.to ? (
                      <Link to={it.to} className={cls}>{inner}</Link>
                    ) : (
                      <a href="#" className={cls} onClick={(e) => e.preventDefault()}>{inner}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-lg border border-white/5 bg-navy-medium/60 p-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </span>
          <p className="text-xs font-semibold text-white">Network Active</p>
        </div>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-white/60">
          <Activity className="h-3 w-3" /> 847 nodes synced
        </p>
      </div>
    </aside>
  );
}
