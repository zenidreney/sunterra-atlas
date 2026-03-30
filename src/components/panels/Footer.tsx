export default function Footer() {
  return (
    <footer
      className="py-5 
    bg-amber-100 border-t border-amber-800 text-center"
    >
      <p>
        Made with
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          //   fill="red"
          //   className="bi bi-heart-fill"
          className="fill-red-900 inline-block mx-3"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
          />
        </svg>
        by{" "}
        <a
          className="font-bold underline hover:text-red-900"
          href="https://github.com/zenidreney/"
        >
          Deniz Yener
        </a>
      </p>
    </footer>
  );
}
