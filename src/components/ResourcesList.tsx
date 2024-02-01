import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sortParam = queryParams.get("sort");

  const handleResourceClick = (resource: ResourceType) => {
    queryParams.set("resourceId", resource?.id);
    navigate(`?${queryParams.toString()}`);
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
