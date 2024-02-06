import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { sortDataArray } from "../utils/helpers";
import { fetchResources } from "../utils/api";
import { ResourceType } from "../utils/types";

import AddResource from "../components/AddResource";
import SortingControls from "../components/SortingControls";
import ResourceView from "../components/ResourceView";
import ResourcesList from "../components/ResourcesList";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const resourceId = queryParams.get("resourceId");
  const sort = queryParams.get("sort") || "asc";

  const [selectedResource, setSelectedResource] = useState<ResourceType | any>(
    {}
  );
  const [sortingMethod, setSortingMethod] = useState(sort);
  const [sortedData, setSortedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleDisplayModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const {
    data: resourceData,
    isLoading,
    error,
  } = useQuery(["resources"], fetchResources, {
    onSuccess: (data) => {
      const selected =
        data.find((resource: ResourceType) => resource.id === resourceId) ||
        data[0];
      setSelectedResource(selected);
      setSortedData(sortDataArray(data, sortingMethod));
    },
  });

  useEffect(() => {
    if (resourceData && sortingMethod) {
      setSortedData(sortDataArray(resourceData, sortingMethod));
    }
  }, [resourceData, sortingMethod]);

  const handleResourceClick = (resource: ResourceType) => {
    queryParams.set("resourceId", resource?.id);
    navigate(`?${queryParams.toString()}`);

    setSelectedResource(resource);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      {isOpen && (
        <AddResource
          handleDisplayModal={handleDisplayModal}
          handleResourceClick={handleResourceClick}
        />
      )}
      <div className="flex flex-row h-screen">
        <div className="bg-gray-300 p-16">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 text-white font-bold text-2xl p-4 rounded-lg">
              VF
            </div>
            <div className="text-2xl uppercase">Resourcing</div>
          </div>
          <SortingControls
            sortingMethod={sortingMethod}
            setSortingMethod={setSortingMethod}
          />
          <ResourcesList
            resourceData={sortedData}
            onClick={handleResourceClick}
          />
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-auto mt-4 absolute bottom-4"
            onClick={handleDisplayModal}
          >
            + New Resource
          </button>
        </div>
        <ResourceView selectedResource={selectedResource} />
      </div>
    </>
  );
};

export default HomePage;
