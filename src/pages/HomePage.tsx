import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { sortDataArray } from "../utils/helpers";
import { fetchResources } from "../utils/api";

import AddResource from "../components/AddResource";
import SortingControls from "../components/SortingControls";
import ResourceView from "../components/ResourceView";
import ResourcesList from "../components/ResourcesList";
import { ResourceType } from "../utils/types";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
const ResourceContainer = styled.div`
  background-color: #e1e1e1;
  width: 250px;
  padding: 60px;
`;
const Button = styled.button`
  background-color: #6852e2;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 250px;
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
`;
const VFLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Logo = styled.div`
  display: flex;
  background-color: #6852e2;
  color: white;
  font-size: 34px;
  padding: 10px;
  border-radius: 12px;
`;
const Name = styled.div`
  display: flex;
  font-size: 30px;
  text-transform: uppercase;
`;

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
      <Container>
        <ResourceContainer>
          <VFLogo>
            <Logo>VF</Logo>
            <Name>Resourcing</Name>
          </VFLogo>
          <SortingControls
            sortingMethod={sortingMethod}
            setSortingMethod={setSortingMethod}
          />
          <ResourcesList
            resourceData={sortedData}
            onClick={handleResourceClick}
          />
          <Button onClick={handleDisplayModal}>+ New Resource</Button>
        </ResourceContainer>
        <ResourceView selectedResource={selectedResource} />
      </Container>
    </>
  );
};

export default HomePage;
