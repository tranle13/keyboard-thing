import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-300 px-10 sticky top-0 z-[100] flex-none">
      <div className="flex-1">
        <Link className="logo text-[50px] text-primary leading-9 pb-2" to="/">
          K.
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-primary input-sm w-24 md:w-auto"
          />
        </div>
        <ul className="menu menu-horizontal px-1 items-center">
          <li>
            <Link to="/group-buy">Group Buy</Link>
          </li>
          <li>
            <Link to="/interest-check">Interest Check</Link>
          </li>
          <li>
            {user ? (
              <Link to="/me">
                <div className="w-8 mask mask-hexagon">
                  <img src={user?.image} alt="profile" />
                </div>
              </Link>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
