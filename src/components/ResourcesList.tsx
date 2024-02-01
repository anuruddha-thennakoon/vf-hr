import { styled } from "styled-components";
import { ResourceType } from "../utils/types";

const ListContainer = styled.div`
  margin-top: 40px;
`;

const ListItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid #bebebe;
  cursor: pointer;
`;

type ResourcesListProps = {
  resourceData: ResourceType[];
  onClick: (resource: ResourceType) => void;
};

const ResourcesList = ({ resourceData, onClick }: ResourcesListProps) => {
  const handleResourceClick = (resource: ResourceType) => {
    onClick(resource);
  };

  return (
    <ListContainer>
      {resourceData?.map((resource: ResourceType) => (
        <ListItem
          key={resource.id}
          onClick={() => handleResourceClick(resource)}
        >
          {resource.name}
        </ListItem>
      ))}
    </ListContainer>
  );
};

export default ResourcesList;
