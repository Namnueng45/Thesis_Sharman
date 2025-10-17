import React from "react";

const Navbar = () => {
  return (
    <nav className="absolute z-100 flex flex-wrap justify-between p-6 pr-14 w-[100%]">
      <ul
        className="navbar flex flex-1 justify-between items-center text-[1.1vw]"
        style={{ fontFamily: '"iannnnn-OWL', fontWeight: "bold" }}
      >
        <li>
          <div className="logosvg">
            <img src="/img/logo/sharmanLogo.svg" alt="logosharman" />
          </div>
        </li>
        <li>
          <a
            href="#synopsis"
            className="text-white hover:text-[#C23213] transition-colors"
          >
            STORY
          </a>
        </li>
        <li>
          <a
            href="#characters"
            className="text-white hover:text-[#C23213] transition-colors"
          >
            CHARACTER
          </a>
        </li>
        <li>
          <a
            href="#movie"
            className="text-white hover:text-[#C23213] transition-colors"
          >
            MOVIE
          </a>
        </li>
        <li>
          <a
            href="#gallery"
            className="text-white hover:text-[#C23213] transition-colors"
          >
            SCREENSHORT
          </a>
        </li>
        <li>
          <a
            href="#results"
            className="text-white hover:text-[#C23213] transition-colors"
          >
            RESULT
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
