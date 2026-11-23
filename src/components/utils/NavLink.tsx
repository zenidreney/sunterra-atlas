import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-xl px-3 py-2 text-center text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
              ${
                pathname === href
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-950"
              } 
              `}
    >
      {children}
    </Link>
  );
}
