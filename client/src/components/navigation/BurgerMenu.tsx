import { unknown } from "@/assets";
import state from "@/store";
import { HiMenuAlt3 } from "react-icons/hi";
import { useSnapshot } from "valtio";

const BurgerMenu = () => {
  const snap = useSnapshot(state);

  return (
    <div className="sm:hidden dropdown dropdown-end">
      <label tabIndex={0} className="btn text-3xl p-0">
        <HiMenuAlt3 />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow bg-base-200 rounded-box w-52 text-lg"
      >
        <li>
          <a href="/topic/new">New</a>
        </li>
        <li>
          <details open>
            <summary>Topic</summary>
            <ul>
              <li>
                <a href="/interest-check">Interest Check</a>
              </li>
              <li>
                <a href="/group-buy">Group Buy</a>
              </li>
              <li>
                <a href="/closed">Closed</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          {snap.user ? (
            <details open>
              <summary>
                <div className="w-8 mask mask-hexagon">
                  <img src={snap.user?.image || unknown} alt="profile" />
                </div>
              </summary>
              <ul>
                <li>
                  <a href="/me">Profile</a>
                </li>
                <li>
                  <a href="/logout">Log out</a>
                </li>
              </ul>
            </details>
          ) : (
            <a href="/login">Log in</a>
          )}
        </li>
      </ul>
    </div>
  );
};

export default BurgerMenu;
