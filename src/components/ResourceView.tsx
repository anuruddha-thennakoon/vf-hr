//@ts-nocheck
import { useEffect, useState } from "react";
import ResourceOverview from "./ResourceOverview";
import ResourceSkills from "./ResourceSkills";
import { useLocation, useNavigate } from "react-router-dom";
import InitialsAvatar from "react-initials-avatar";
import { styled } from "styled-components";
import { ResourceType } from "../utils/types";

const ResourceViewContainer = styled.div`
  width: 250px;
  padding: 60px;
`;
const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-bottom: 40px;
  font-size: 18px;
  font-weight: 800;
`;
const Selection = styled.span`
  border: 1px solid #bebebe;
  background-color: blue;
  padding: 10px;
  border-radius: 16px;
  cursor: pointer;
  width: 100px;
  text-align: center;
  background-color: ${(props) => (props.active ? "#6852e2" : "initial")};
  color: ${(props) => (props.active ? "white" : "initial")};
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Sections = styled.div`
  display: flex;
  justify-content: space-between;
`;

type ResourceViewProps = {
  selectedResource: ResourceType;
};

const ResourceView = ({ selectedResource }: ResourceViewProps) => {
  console.log("selectedResource", selectedResource);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selection = queryParams.get("selection");

  let { id, name } = selectedResource;
  const [currentSection, setCurrentSection] = useState("overview");

  useEffect(() => {
    if (selection) {
      setCurrentSection(selection);
    }
  }, [selection]);

  const renderSection = () => {
    switch (currentSection) {
      case "overview":
        return <ResourceOverview resourceId={id} />;
      case "skills":
        return <ResourceSkills resourceId={id} />;
      default:
        return <ResourceOverview resourceId={id} />;
    }
  };

  const handleSelection = (selection: string) => {
    queryParams.set("selection", selection);
    navigate(`?${queryParams.toString()}`);
    setCurrentSection(selection);
  };

  return (
    <ResourceViewContainer>
      <AvatarContainer>
        <InitialsAvatar name={name} />
        {name}
      </AvatarContainer>
      <SectionContainer>
        <Sections>
          <Selection
            active={currentSection === "overview"}
            onClick={() => handleSelection("overview")}
          >
            Overview
          </Selection>
          <Selection
            active={currentSection === "skills"}
            onClick={() => handleSelection("skills")}
          >
            Skills
          </Selection>
        </Sections>
        <>{renderSection()}</>
      </SectionContainer>
    </ResourceViewContainer>
  );
};

export default ResourceView;
