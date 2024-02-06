import { useQuery } from "react-query";

import Error from "./shared/Error";
import Loader from "./shared/Loader";

import { SkillType } from "../utils/types";
import { fetchSkills } from "../utils/api";

type ResourceSkillsProps = {
  resourceId: string;
};

const ResourceSkills = ({ resourceId }: ResourceSkillsProps) => {
  const {
    data: resourceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills", resourceId],
    enabled: resourceId !== undefined,
    retry: 2,
    queryFn: () => fetchSkills(resourceId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex mt-5">
      <ul className="pl-5">
        {resourceData.map((skill: SkillType, index: number) => (
          <li key={index} className="text-lg mt-2">
            {skill?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceSkills;
