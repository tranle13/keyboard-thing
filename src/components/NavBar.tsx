import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleClick = () => {};
  return (
    <div className="sticky top-0 flex justify-between items-center py-4 px-10 bg-sorta-black z-[100]">
      <Link className="logo text-[50px] text-sorta-blue leading-9 pb-2" to="/">
        K.
      </Link>
      <nav>
        <ul className="list-none flex gap-10 font-semibold text-xl text-cream items-center">
          <li className="cursor-pointer" onClick={() => handleClick()}>
            <BiSearchAlt />
          </li>
          <Link to="/group-buy">Group Buy</Link>
          <Link to="/interest-check">Interest Check</Link>
          <Link to="/about">About</Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
