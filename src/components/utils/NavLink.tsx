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
  console.log(pathname);

    return (
      <Link
        href={href}
        className={`w-4 rounded-lg bg-amber-800 px-2 py-1 text-white font-bold transition-colors
              ${
                pathname === href
                  ? "bg-orange-500"
                  : "text-white hover:bg-orange-500"
              } 
              `}
      >
        {children}
      </Link>
    );
  }