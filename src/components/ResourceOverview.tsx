import React from "react";
import { useQuery } from "react-query";
import { fetchResource } from "../utils/api";
import { styled } from "styled-components";
import Loader from "./shared/Loader";
import Error from "./shared/Error";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Label = styled.div`
  font-size: 16px;
  margin-top: 20px;
`;
const Content = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
`;

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
    <Container>
      <Label>Role</Label>
      <Content>{resourceData?.role}</Content>
      <Label>Email</Label>
      <Content>{resourceData?.email}</Content>
    </Container>
  );
};

export default ResourceOverview;
