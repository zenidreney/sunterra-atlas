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
        className={`block min-w-34 text-center rounded-lg  px-2 py-1 text-white font-bold transition-colors
              ${
                pathname === href
                  ? "bg-amber-500"
                  : "text-white bg-amber-800 hover:bg-amber-600"
              } 
              `}
      >
        {children}
      </Link>
    );
  }