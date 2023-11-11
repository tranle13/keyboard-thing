import { unknown } from "@/assets";
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-300 px-5 sticky top-0 z-[100] flex-none max-sm:gap-5 sm:px-10">
      <div className="sm:flex-1 flex-none">
        <Link className="logo text-[50px] text-primary leading-9 pb-2" to="/">
          K.
        </Link>
      </div>
      <div className="sm:flex-none flex-1 gap-2">
        <div className="form-control text-xl max-sm:flex-1">
          <input
            type="text"
            placeholder="Search"
            className="input input-primary input-sm w-full md:w-auto"
          />
        </div>
        <div className="max-sm:hidden flex">
          <div className="dropdown dropdown-hover dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-sm bg-base-300 border-base-300"
            >
              Topics
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-2xl bg-secondary text-secondary-content rounded-box w-52"
            >
              <li>
                <Link to="/interest-check">Interest Check</Link>
              </li>
              <li>
                <Link to="/group-buy">Group Buy</Link>
              </li>

              <li>
                <Link to="/closed">Closed</Link>
              </li>
            </ul>
          </div>
          {user ? (
            <>
              <Link
                className="btn btn-sm bg-base-300 border-base-300"
                to="/topic/new"
              >
                New
              </Link>
              <Link to="/me">
                <div className="w-8 mask mask-hexagon">
                  <img src={user.image || unknown} alt="profile" />
                </div>
              </Link>
            </>
          ) : (
            <Link
              className="btn btn-sm bg-base-300 border-base-300"
              to="/login"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
      <BurgerMenu />
    </div>
  );
};

export default NavBar;
