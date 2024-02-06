import { ResourceType } from "../utils/types";

type ResourcesListProps = {
  resourceData: ResourceType[];
  onClick: (resource: ResourceType) => void;
};

const ResourcesList = ({ resourceData, onClick }: ResourcesListProps) => {
  const handleResourceClick = (resource: ResourceType) => {
    onClick(resource);
  };

  return (
    <div className="mt-10">
      {resourceData?.map((resource: ResourceType) => (
        <div
          key={resource.id}
          onClick={() => handleResourceClick(resource)}
          className="p-3 border-b border-gray-400 cursor-pointer"
        >
          <span className="text-lg">{resource.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourcesList;
