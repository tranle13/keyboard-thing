import { bg } from "@/assets";
import InfoEdit from "@/components/InfoEdit";
import Topics from "@/components/Topics";
import { useUserTopics } from "@/queries/hooks/useTopics";
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
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useUserTopics({
    username: user?.username,
    page: currentPage,
    limit: 20,
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

      <InfoEdit user={user} />

      <div className="flex flex-col bg-neutral p-10 rounded-2xl w-1/2 z-10 mt-[150px] gap-5 h-[calc(100vh-266px)] flex-none min-h-[500px]">
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
        <div className="flex-1 overflow-y-auto">
          <Topics
            data={data}
            setCurrentPage={(nextPage) => setCurrentPage(nextPage)}
            extraClass="grid-cols-[repeat(auto-fit,minmax(30%,47%))]"
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
