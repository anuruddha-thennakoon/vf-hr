import { useQuery } from "react-query";

import Loader from "./shared/Loader";
import Error from "./shared/Error";

import { fetchResource } from "../utils/api";

type ResourcesListProps = {
  resourceId: string;
};

const ResourceOverview = ({ resourceId }: ResourcesListProps) => {
  const {
    data: resourceData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["resource", resourceId],
    enabled: resourceId !== undefined,
    queryFn: () => fetchResource(resourceId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="mt-5">
      <div className="font-bold text-lg mt-2">Role</div>
      <div className="text-lg mt-1">{resourceData?.role}</div>
      <div className="font-bold text-lg mt-2">Email</div>
      <div className="text-lg mt-1">{resourceData?.email}</div>
    </div>
  );
};

export default ResourceOverview;
