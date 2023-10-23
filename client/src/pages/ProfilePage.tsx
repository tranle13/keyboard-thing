import authService from "@/services/authService";

const ProfilePage = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    window.location.href = "/";
    return;
  }

  return (
    <div className="w-1/2 flex gap-3 m-auto">
      <img className="rounded" src={user.image} alt="profile-picture" />
      <div>
        <div className="flex gap-2">
          <label htmlFor="username">Username: </label>
          <p id="username" className="text-gray-400">
            {user.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
