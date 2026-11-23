export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-1 border-t border-stone-200/80 bg-white/70 px-4 py-2 text-center text-xs text-stone-500 backdrop-blur-sm sm:flex-row sm:px-6">
      <div>
        <span>Data from </span>
        <a
          className="inline-block font-semibold text-stone-700 transition-colors hover:text-amber-700"
          href="https://power.larc.nasa.gov/"
        >
          NASA POWER
        </a>
      </div>

      <div>
        <span>Built by </span>
        <a
          className="inline-block font-semibold text-stone-700 transition-colors hover:text-amber-700"
          href="https://github.com/zenidreney/"
        >
          Deniz Yener
        </a>
      </div>
    </footer>
  );
}
