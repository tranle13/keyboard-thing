export type Status = "IC" | "GB";

interface Props {
  status: Status;
  setStatus: (status: Status) => void;
  icLink: string;
  setIcLink: (link: string) => void;
}

const AddStatus = ({ status, setStatus, icLink, setIcLink }: Props) => {
  const statuses: Status[] = ["IC", "GB"];

  return (
    <div className="flex gap-3">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn btn-sm w-20">
          {status}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {statuses.map((s) => (
            <li key={s}>
              <a onClick={() => setStatus(s)}>{s}</a>
            </li>
          ))}
        </ul>
      </div>
      {status === "IC" && (
        <input
          type="text"
          placeholder="IC link"
          className="input input-primary input-sm"
          value={icLink}
          onChange={(e) => setIcLink(e.target.value)}
        />
      )}
    </div>
  );
};

export default AddStatus;
