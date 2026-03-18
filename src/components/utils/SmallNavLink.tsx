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
        className={`rounded-lg  px-2 py-0.5 font-bold transition-colors text-sm
              ${
                pathname === href
                  ? "bg-amber-500 text-white"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
              } 
              `}
      >
        {children}
      </Link>
    );
  }