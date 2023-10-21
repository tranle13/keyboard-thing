import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {};

  return (
    <div className="sticky top-0 flex justify-between items-center py-4 px-10 bg-sorta-black z-[100]">
      <Link className="logo text-[50px] text-sorta-blue leading-9 pb-2" to="/">
        K.
      </Link>
      <nav>
        <ul className="list-none flex gap-10 font-semibold text-xl text-cream items-center max-md:hidden">
          <li className="cursor-pointer" onClick={() => handleClick()}>
            <IoSearch />
          </li>
          <Link to="/group-buy">Group Buy</Link>
          <Link to="/interest-check">Interest Check</Link>
          <Link to="/login">Log In</Link>
        </ul>

        {/* menu on mobile devices */}
        <div className="mobile-menu md:hidden text-cream flex text-2xl gap-10 items-center">
          <IoSearch />
          <div>
            <div
              className={`ham-menu cursor-pointer ${toggle ? "close" : "open"}`}
              onClick={() => setToggle(!toggle)}
            >
              <div className="h-[2.5px]"></div>
            </div>
            <ul
              className={`absolute ${
                toggle ? "close" : "open"
              } flex right-10 top-[110%] flex-col bg-sorta-black rounded-xl p-5 gap-5 shadow-2xl`}
            >
              <Link to="/group-buy">Group Buy</Link>
              <Link to="/interest-check">Interest Check</Link>
              <Link to="/about">About</Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
