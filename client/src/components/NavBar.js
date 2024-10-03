import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { themes } from "../styles";

const NavBar = () => {
  const [currentTheme, setCurrentTheme] = useState("");
  const htmlElem = document.querySelector("html");
  const handleChangeTheme = (theme) => {
    htmlElem.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const themeSaved = localStorage.getItem("theme");
    htmlElem.setAttribute("data-theme", themeSaved);
    setCurrentTheme(themeSaved);
  }, [htmlElem]);

  return (
    <div className="navbar bg-base-100 sticky top-0 inset-x-0 mb-10 bg-[var(--fallback-b1,oklch(var(--b1)/1))]">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          پەیوانە-
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>تەوەرەی تایبەت بەخۆت</summary>
              <ul className="bg-base-100 rounded-t-none p-2 max-h-80 overflow-y-auto min-w-fit overflow-x-hidden">
                {themes.map((theme) => (
                  <li
                    className={twMerge(
                      currentTheme === theme ? "bg-base-300" : ""
                    )}
                    key={theme}
                  >
                    <span onClick={() => handleChangeTheme(theme)}>
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
