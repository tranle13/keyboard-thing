interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  if (totalPages < 2) return null;

  const paginate = (direction: "prev" | "next" | "jump", index?: number) => {
    switch (direction) {
      case "prev":
        if (currentPage - 1 < 0) onPageChange(currentPage - 1);
        else onPageChange(1);
        break;
      case "jump":
        if (index) onPageChange(index);
        break;
      default:
        if (currentPage + 1 < totalPages) onPageChange(currentPage + 1);
        else onPageChange(totalPages);
        break;
    }
  };

  return (
    <div className="join justify-center">
      <button className="join-item btn" onClick={() => paginate("prev")}>
        «
      </button>
      <div className="join-item btn p-0">
        <div className="dropdown dropdown-top">
          <label tabIndex={0} className="btn h-full min-h-full">
            Page {currentPage}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box left-[10%]"
          >
            {[...Array(totalPages)].map((_, i) => (
              <li key={i}>
                <a
                  onClick={() =>
                    currentPage !== i + 1 && paginate("jump", i + 1)
                  }
                >
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="join-item btn" onClick={() => paginate("next")}>
        »
      </button>
    </div>
  );
};

export default Pagination;
