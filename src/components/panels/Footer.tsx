export default function Footer() {
  return (
    <footer
      className="flex flex-col md:flex-row justify-evenly py-1 sm:py-2 text-sm 
    bg-amber-100 border-t border-amber-800 text-center"
    >
      <div>
        <span>Data Source: </span>
        <a className="font-bold inline-block underline hover:text-red-900" href="https://power.larc.nasa.gov/">NASA POWER API</a>
      </div>

      <div>
        <span>Built by: </span>
        <a
          className="font-bold inline-block underline hover:text-red-900"
          href="https://github.com/zenidreney/"
        >
          Deniz Yener
        </a>
      </div>
    </footer>
  );
}
