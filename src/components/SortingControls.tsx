import { useLocation, useNavigate } from "react-router-dom";

type SortingControlsProps = {
  sortingMethod: string;
  setSortingMethod: (method: string) => void;
};

const SortingControls = ({
  sortingMethod,
  setSortingMethod,
}: SortingControlsProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const handleSorting = (method: string) => {
    queryParams.set("sort", method);
    navigate(`?${queryParams.toString()}`);
    setSortingMethod(method);
  };

  return (
    <div className="flex gap-1 justify-end items-center mt-5">
      <span className="text-sm font-semibold">SORT</span>
      <span
        className={`px-2 py-1 rounded-md cursor-pointer text-xs font-bold border border-gray-300 ${
          sortingMethod === "asc"
            ? "bg-indigo-600 text-white"
            : "bg-transparent text-gray-700"
        }`}
        onClick={() => handleSorting("asc")}
      >
        A-Z
      </span>
      <span
        className={`px-2 py-1 rounded-md cursor-pointer text-xs font-bold border border-gray-300 ${
          sortingMethod === "desc"
            ? "bg-indigo-600 text-white"
            : "bg-transparent text-gray-700"
        }`}
        onClick={() => handleSorting("desc")}
      >
        Z-A
      </span>
    </div>
  );
};

export default SortingControls;
