import { useState } from "react";
import {
  Search,
  Bell,
  Globe,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRole } from "@/contexts/RoleContext";

export function Topbar() {
  const { role, roles, setRoleByKey } = useRole();
  const [lang, setLang] = useState<"EN" | "ID">("EN");
  const RoleIcon = role.icon;

  return (
    <header className="fixed top-0 right-0 left-64 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/95 px-6 backdrop-blur">
      <div className="relative max-w-xl flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search patients, medicines, claims..."
          className="w-full rounded-lg border border-border bg-background py-2 pr-3 pl-9 text-sm placeholder:text-muted-foreground focus:border-highlight focus:ring-2 focus:ring-highlight/20 focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-foreground hover:bg-accent">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
            5
          </span>
        </button>

        <button
          onClick={() => setLang(lang === "EN" ? "ID" : "EN")}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-xs font-semibold text-foreground hover:bg-accent"
        >
          <Globe className="h-3.5 w-3.5" />
          <span className={lang === "EN" ? "text-highlight" : "text-muted-foreground"}>EN</span>
          <span className="text-muted-foreground">|</span>
          <span className={lang === "ID" ? "text-highlight" : "text-muted-foreground"}>ID</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-full border-border bg-white pr-3 pl-3 text-xs font-semibold hover:bg-accent"
            >
              <RoleIcon className="h-4 w-4 text-highlight" />
              <span className="text-foreground">{role.label}</span>
              <span className="hidden text-muted-foreground md:inline">— {role.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="text-xs">Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((r) => {
              const Icon = r.icon;
              const active = r.key === role.key;
              return (
                <DropdownMenuItem
                  key={r.key}
                  onClick={() => setRoleByKey(r.key)}
                  className={`gap-2.5 py-2.5 ${active ? "bg-highlight/10" : ""}`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-highlight" : "text-muted-foreground"}`} />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{r.label}</span>
                    <span className="text-[11px] text-muted-foreground">{r.name}</span>
                  </div>
                  {active && <span className="ml-auto text-[10px] font-bold text-highlight">ACTIVE</span>}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-navy-bright to-highlight text-xs font-bold text-white shadow-sm">
              {role.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{role.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
            <DropdownMenuItem><HelpCircle className="mr-2 h-4 w-4" /> Help</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger"><LogOut className="mr-2 h-4 w-4" /> Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
