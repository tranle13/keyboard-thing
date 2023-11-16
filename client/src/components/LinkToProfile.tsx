import state from "@/store";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSnapshot } from "valtio";

interface Props {
  children: ReactNode;
  username: string;
}

const LinkToProfile = ({ children, username }: Props) => {
  const snap = useSnapshot(state);
  const destination =
    username === snap.user?.username ? "/me" : `/profile/${username}`;

  return <Link to={destination}>{children}</Link>;
};

export default LinkToProfile;
