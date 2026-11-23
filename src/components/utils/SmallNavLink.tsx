import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
              ${
                pathname === href
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:bg-white hover:text-stone-950"
              } 
              `}
    >
      {children}
    </Link>
  );
}
