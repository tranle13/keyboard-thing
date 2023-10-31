import { bg } from "@/assets";
import useTopics from "@/queries/hooks/useTopics";
import authService from "@/queries/services/authService";
import { useState } from "react";

interface Checked {
  createdTopic: boolean;
  followedTopic: boolean;
}

const ProfilePage = () => {
  const user = authService.getCurrentUser();
  const [checked, setChecked] = useState<Checked>({
    createdTopic: true,
    followedTopic: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const { data: topics } = useTopics({
    page: 1,
    pageSize: 20,
  });

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <div className="flex gap-5 justify-center w-full relative flex-1 pb-10">
      <img
        src={bg}
        alt="background-image"
        className="absolute h-[200px] w-full object-cover bg-base-200 blur-[2px]"
        loading="lazy"
      />
      <div className="flex flex-col gap-3 bg-base-200 p-10 rounded-2xl items-center z-10 mt-[150px] h-max w-1/4">
        <img
          className="rounded-full bg-neutral shadow-[10px_10px_20px_#bebebe,-10px_-10px_20px_#ffffff] w-20 h-20"
          src={user.image}
          alt="profile-picture"
        />
        {isEdit ? (
          <div className="flex flex-col gap-4 w-full mt-5">
            <div className="indicator w-full">
              <span className="indicator-item badge -left-[10px] right-auto">
                Bio
              </span>
              <textarea
                className="textarea textarea-bordered textarea-secondary max-h-[150px] w-full"
                placeholder="Whatever you want to say here..."
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
                  Click
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 bg-secondary rounded-box w-full"
                >
                  <li>
                    <a>Dracula</a>
                  </li>
                  <li>
                    <a>Bumblebee</a>
                  </li>
                  <li>
                    <a>Halloween</a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="btn-block btn btn-primary"
              onClick={() => setIsEdit(false)}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full mt-5">
            <p className="text-sm text-neutral-content w-full">
              {user.username}
            </p>
            <p>User bio goes here</p>
            <button
              className="btn-block btn btn-primary"
              onClick={() => setIsEdit(true)}
            >
              Edit profile
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col bg-base-200 p-10 rounded-2xl w-1/2 z-10 mt-[150px] gap-5 h-[calc(100vh-266px)] flex-none">
        <div className="tabs tabs-boxed p-0 flex-none">
          <a
            className={`tab w-1/2 ${checked.createdTopic ? "tab-active" : ""}`}
            onClick={() =>
              setChecked({
                createdTopic: true,
                followedTopic: false,
              })
            }
          >
            Created topics
          </a>
          <a
            className={`tab w-1/2 ${checked.followedTopic ? "tab-active" : ""}`}
            onClick={() =>
              setChecked({
                createdTopic: false,
                followedTopic: true,
              })
            }
          >
            Followed Topics
          </a>
        </div>
        <div className="grid grid-cols-3 gap-7 flex-1 overflow-y-auto">
          {topics &&
            topics.data.map((topic, index) => (
              <div
                className="card card-compact bg-base-300 cursor-pointer group"
                key={index}
              >
                <figure>
                  <img
                    src={topic.cover_image}
                    alt="cover-image"
                    className="h-[150px] object-cover w-full group-hover:scale-100"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title line-clamp-1">{topic.title}</h2>
                  <div>
                    {topic.categories.map((cat) => (
                      <span className="badge" key={cat}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          {topics &&
            topics.data.map((topic, index) => (
              <div
                className="card card-compact bg-base-300 cursor-pointer group"
                key={index}
              >
                <figure>
                  <img
                    src={topic.cover_image}
                    alt="cover-image"
                    className="h-[150px] object-cover w-full group-hover:scale-100"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title line-clamp-1">{topic.title}</h2>
                  <div>
                    {topic.categories.map((cat) => (
                      <span className="badge" key={cat}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
