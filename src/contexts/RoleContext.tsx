import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  Pill,
  Building2,
  FlaskConical,
  BadgeCheck,
  Link2,
  Bell,
  Settings,
  User,
  Stethoscope,
  Hospital,
  Landmark,
  ShieldCheck,
  Heart,
  ClipboardList,
  Wallet,
  Lock,
  HandHeart,
  UserSearch,
  PenSquare,
  Send,
  GitBranch,
  ListChecks,
  AlertTriangle,
  Banknote,
  MapPinned,
  Siren,
  ShoppingBag,
  Vote,
  Database,
  Package,
  PackageCheck,
  PackageSearch,
  Users,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export type RoleKey =
  | "patient"
  | "doctor"
  | "hospital"
  | "pharmacy"
  | "bpjs"
  | "researcher"
  | "bpom";

export type MenuItem = { title: string; to?: string; icon: LucideIcon };
export type MenuSection = { label: string; items: MenuItem[] };

export type Role = {
  key: RoleKey;
  label: string;
  name: string;
  icon: LucideIcon;
  greeting: string;
  menu: MenuSection[];
};

const systemMenu: MenuSection = {
  label: "System",
  items: [
    { title: "Blockchain Explorer", to: "/explorer", icon: Link2 },
    { title: "Notifications", icon: Bell },
    { title: "Settings", icon: Settings },
  ],
};

export const roles: Role[] = [
  {
    key: "patient",
    label: "Patient",
    name: "Budi Santoso",
    icon: User,
    greeting: "Selamat datang kembali, Budi",
    menu: [
      {
        label: "Akun Anda",
        items: [
          { title: "Beranda", to: "/", icon: LayoutDashboard },
          { title: "Rekam Medis Saya", to: "/ehr", icon: Heart },
          { title: "Resep Saya", to: "/medicine", icon: Pill },
          { title: "Klaim Saya", to: "/claims", icon: Wallet },
          { title: "Pengaturan Consent", icon: Lock },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "doctor",
    label: "Doctor",
    name: "dr. Sarah Putri",
    icon: Stethoscope,
    greeting: "Welcome back, dr. Sarah Putri",
    menu: [
      {
        label: "Clinical",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "My Patients", to: "/ehr", icon: UserSearch },
          { title: "EHR Input", to: "/ehr", icon: PenSquare },
          { title: "Prescriptions", to: "/medicine", icon: Pill },
          { title: "Referrals", icon: Send },
          { title: "My Credentials", to: "/credentials", icon: BadgeCheck },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "hospital",
    label: "Hospital Admin",
    name: "RSUP Dr. Cipto",
    icon: Hospital,
    greeting: "Welcome back, RSUP Dr. Cipto",
    menu: [
      {
        label: "Main Menu",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "Medical Records", to: "/ehr", icon: FileText },
          { title: "Medicine Supply Chain", to: "/medicine", icon: Pill },
          { title: "Insurance Claims", to: "/claims", icon: Building2 },
          { title: "Research Data", to: "/research", icon: FlaskConical },
          { title: "Medical Credentials", to: "/credentials", icon: BadgeCheck },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "pharmacy",
    label: "Pharmacy",
    name: "Apotek Kimia Farma",
    icon: Pill,
    greeting: "Welcome back, Apotek Kimia Farma",
    menu: [
      {
        label: "Operations",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "Inventory", to: "/medicine", icon: Package },
          { title: "Medicine Verification", to: "/medicine", icon: PackageCheck },
          { title: "Dispensing Log", to: "/medicine", icon: PackageSearch },
          { title: "Prescriptions", to: "/medicine", icon: ClipboardList },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "bpjs",
    label: "BPJS Officer",
    name: "Regional Jakarta",
    icon: Landmark,
    greeting: "Welcome back, BPJS Regional Jakarta",
    menu: [
      {
        label: "Claims Desk",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "Claims Queue", to: "/claims", icon: ListChecks },
          { title: "Fraud Alerts", to: "/claims", icon: AlertTriangle },
          { title: "Payment Processing", to: "/claims", icon: Banknote },
          { title: "Utilization Reports", icon: MapPinned },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "researcher",
    label: "Researcher",
    name: "UI Faculty of Medicine",
    icon: FlaskConical,
    greeting: "Welcome back, UI Faculty of Medicine",
    menu: [
      {
        label: "Research",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "Marketplace", to: "/research", icon: Database },
          { title: "My Purchases", to: "/research", icon: ShoppingBag },
          { title: "Ethics Committee", to: "/research", icon: Vote },
          { title: "My Proposals", icon: GitBranch },
        ],
      },
      systemMenu,
    ],
  },
  {
    key: "bpom",
    label: "BPOM Inspector",
    name: "Central Office",
    icon: ShieldCheck,
    greeting: "Welcome back, BPOM Inspector",
    menu: [
      {
        label: "Regulatory",
        items: [
          { title: "Dashboard", to: "/", icon: LayoutDashboard },
          { title: "Supply Chain", to: "/medicine", icon: Pill },
          { title: "Recall Management", to: "/medicine", icon: Siren },
          { title: "Product Verification", to: "/medicine", icon: PackageCheck },
          { title: "Inspections", icon: Users },
          { title: "Compliance Reports", icon: BarChart3 },
        ],
      },
      systemMenu,
    ],
  },
];

type Ctx = {
  role: Role;
  setRoleByKey: (k: RoleKey) => void;
  roles: Role[];
};

const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [roleKey, setRoleKey] = useState<RoleKey>("doctor");

  const setRoleByKey = useCallback((k: RoleKey) => {
    setRoleKey(k);
    const r = roles.find((x) => x.key === k);
    if (r) toast.success(`Switched to ${r.label} view`, { description: r.name });
  }, []);

  const role = useMemo(() => roles.find((r) => r.key === roleKey)!, [roleKey]);

  return (
    <RoleContext.Provider value={{ role, setRoleByKey, roles }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}
