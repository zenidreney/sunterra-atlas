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
        className={`w-2 rounded-lg bg-red-400 px-1 py-0.5 font-bold text-white transition-colors
              ${
                pathname === href
                  ? "bg-red-500"
                  : "text-white hover:bg-red-300"
              } 
              `}
      >
        {children}
      </Link>
    );
  }