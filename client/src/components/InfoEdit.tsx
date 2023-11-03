import { User } from "@/entities/User";
import useMe from "@/queries/hooks/useMe";
import * as authServices from "@/queries/services/authService";
import { updateProfile } from "@/queries/services/userService";
import { AxiosError } from "axios";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
  user: User;
}

const InfoEdit = ({ user }: Props) => {
  // SECTION = Constants
  const token = authServices.getJwt();

  // SECTION = Hooks
  const [info, setInfo] = useState({
    bio: "",
    theme: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    data: me,
    isLoading,
    error: meError,
  } = useMe(user._id || "", token, (user) =>
    setInfo({ bio: user.bio || "", theme: user.theme || "" })
  );

  // SECTION = Functions
  const render = () => {
    if (!me) return;
    return (
      <div className="flex flex-col gap-3 w-full mt-5">
        <p className="text-sm text-base-content/50 w-full">{me.username}</p>
        <p>{me.bio}</p>
        <button
          className="btn-block btn btn-primary btn-sm"
          onClick={() => setIsEdit(true)}
        >
          Edit profile
        </button>
      </div>
    );
  };
  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const res = await updateProfile({
        _id: user._id || "",
        bio: info.bio,
        theme: info.theme.toLowerCase(),
      });
      authServices.loginWithJwt(res.headers["x-auth-token"]);
      setIsEdit(false);
    } catch (e) {
      const error = e as AxiosError;
      setError(error.response?.data as string);
    } finally {
      setIsUpdating(false);
    }
  };

  // SECTION = Returns
  if (meError) return null;

  return (
    <div className="flex flex-col gap-3 bg-base-200 p-10 rounded-2xl items-center z-10 mt-[150px] h-max w-1/4">
      {error && (
        <div className="alert alert-error">
          <AiOutlineCloseCircle />
          <span>{error}</span>
        </div>
      )}
      {isLoading ? (
        <span className="loading loading-spinner text-primary" />
      ) : (
        <>
          {me && (
            <img
              className="rounded-full bg-neutral shadow-[10px_10px_20px_base-100,-10px_-10px_20px_#ffffff] w-20 h-20"
              src={me.image}
              alt="profile-picture"
            />
          )}
          {isEdit ? (
            <div className="flex flex-col gap-4 w-full mt-5">
              <div className="indicator w-full">
                <span className="indicator-item badge -left-[10px] right-auto">
                  Bio
                </span>
                <textarea
                  value={info.bio}
                  className="textarea textarea-bordered textarea-secondary h-[150px] w-full"
                  placeholder="Whatever you want to say here..."
                  onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                />
              </div>
              <div className="indicator w-full">
                <span className="indicator-item badge -left-[20px] right-auto">
                  Theme
                </span>
                <div className="dropdown dropdown-hover w-full">
                  <label
                    tabIndex={0}
                    className="btn btn-sm btn-outline btn-secondary mb-1 w-full"
                  >
                    {info.theme}
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 bg-secondary rounded-box w-full"
                  >
                    {["Light", "Dark", "Dracula", "Bumblebee", "Halloween"].map(
                      (theme) => (
                        <li
                          key={theme}
                          onClick={() => setInfo({ ...info, theme })}
                        >
                          <a>{theme}</a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  className="btn btn-primary btn-sm flex-1"
                  onClick={() => handleUpdate()}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner" />
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  className="btn btn-outline btn-primary btn-sm flex-1"
                  onClick={() => setIsEdit(false)}
                  disabled={isUpdating}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            render()
          )}
        </>
      )}
    </div>
  );
};

export default InfoEdit;
