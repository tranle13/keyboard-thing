import { Status, StatusType } from "@/entities/Status";
import { Topic } from "@/entities/Topic";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  isEdit: boolean;
  topic?: Topic;
}

const AddStatus = forwardRef<Status, Props>((props, ref) => {
  const statuses: StatusType[] = props.isEdit
    ? ["IC", "GB", "CLOSED"]
    : ["IC", "GB"];
  const statusRef = useRef<Status>();
  const [status, setStatus] = useState<Status>({
    status: "IC",
    icLink: "",
  });

  useImperativeHandle(ref, () => {
    statusRef.current = status;
    return statusRef.current as Status;
  });

  useEffect(() => {
    props.topic &&
      setStatus({
        status: props.topic.status,
        icLink: props.topic.ic_link,
      });
  }, [props.topic]);

  if (!ref) return null;

  return (
    <div className="flex gap-3">
      <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn btn-sm w-20">
          {status.status}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {statuses.map((s) => (
            <li key={s}>
              <a onClick={() => setStatus({ ...status, status: s })}>{s}</a>
            </li>
          ))}
        </ul>
      </div>
      {status.status === "IC" && (
        <input
          type="text"
          placeholder="IC link"
          className="input input-primary input-sm"
          value={status.icLink}
          onChange={(e) => setStatus({ ...status, icLink: e.target.value })}
        />
      )}
    </div>
  );
});

export default AddStatus;
