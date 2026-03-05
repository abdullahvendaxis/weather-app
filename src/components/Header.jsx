import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { APP_NAME } from "../config";

function Header() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="header-style sticky top-0 z-50">
      
      <div className="container-custom px-4 md:px-6 py-4 flex justify-between items-center">

        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="App Logo"
            className="w-9 h-9 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="heading-lg tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="btn-outline text-sm md:text-base px-4 md:px-6 py-2"
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>
    </header>
  );
}

export default Header;