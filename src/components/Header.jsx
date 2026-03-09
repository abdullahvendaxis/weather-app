import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { APP_NAME } from "../config";
import DarkModeToggle from "./DarkModeToggle";
import InstallButton from "./InstallButton";

function Header() {
  return (
    <header className="header w-full bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">

          <img
            src={logo}
            alt="App Logo"
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
          />

          <span className="text-base sm:text-lg md:text-xl font-semibold text-black tracking-tight">
            {APP_NAME}
          </span>

        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          <DarkModeToggle />

          <InstallButton />

        </div>

      </div>

    </header>
  );
}

export default Header;