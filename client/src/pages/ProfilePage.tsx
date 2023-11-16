import InfoEdit from "@/components/InfoEdit";
import Topics from "@/components/topic/Topics";
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
    <div className="flex gap-5 justify-center w-full relative flex-1 my-5 max-md:flex-col max-md:items-center">
      <InfoEdit user={user} />

      <div className="flex flex-col bg-base-300 p-10 rounded-2xl w-[92%] md:w-1/2 z-10 gap-5 h-[calc(100vh-104px)] flex-none min-h-[500px] max-md:z-0">
        <div className="tabs tabs-boxed p-0 flex-none">
          <a
            className={`tab w-1/2 h-fit ${
              checked.createdTopic ? "tab-active" : ""
            }`}
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
            className={`tab w-1/2 h-fit ${
              checked.followedTopic ? "tab-active" : ""
            }`}
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
            extraClass="max-md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
