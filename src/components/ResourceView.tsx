import { useEffect, useState } from "react";
import ResourceOverview from "./ResourceOverview";
import ResourceSkills from "./ResourceSkills";
import { useLocation, useNavigate } from "react-router-dom";
import InitialsAvatar from "react-initials-avatar";
import { ResourceType } from "../utils/types";

type ResourceViewProps = {
  selectedResource: ResourceType;
};

const ResourceView = ({ selectedResource }: ResourceViewProps) => {
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
    <div className="p-16 w-full">
      <div className="flex flex-row items-center gap-2 pb-9 text-2xl font-bold">
        <InitialsAvatar name={name} />
        {name}
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2">
          <span
            className={`px-4 py-2 rounded-3xl cursor-pointer text-sm font-bold border ${
              currentSection === "overview"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-transparent text-gray-700 border-gray-300"
            }`}
            onClick={() => handleSelection("overview")}
          >
            Overview
          </span>
          <span
            className={`px-4 py-2 rounded-3xl cursor-pointer text-sm font-bold border ${
              currentSection === "skills"
                ? "bg-indigo-600 text-white indigo-purple-600"
                : "bg-transparent text-gray-700 border-gray-300"
            }`}
            onClick={() => handleSelection("skills")}
          >
            Skills
          </span>
        </div>
        {renderSection()}
      </div>
    </div>
  );
};

export default ResourceView;
