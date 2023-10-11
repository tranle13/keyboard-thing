import { BiSearchAlt } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center p-4 bg-sorta-black z-[100]">
      <h1 className="logo text-[50px] text-sorta-blue leading-9 pb-2">K.</h1>
      <nav>
        <ul className="list-none flex gap-5 font-semibold text-xl text-cream items-center">
          <li>
            <BiSearchAlt />
          </li>
          <li>GB</li>
          <li>IC</li>
          <li>About</li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
