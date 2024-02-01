import { useQuery } from "react-query";
import { fetchSkills } from "../utils/api";

import { styled } from "styled-components";
import Error from "./shared/Error";
import Loader from "./shared/Loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const List = styled.ul`
  padding-left: 18px;
`;
const ListItem = styled.li`
  font-size: 18px;
  font-weight: bold;
  margin-top: 6px;
`;

type ResourceSkillsProps = {
  resourceId: string;
};

export default function ResourceSkills({ resourceId }: ResourceSkillsProps) {
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
    <Container>
      <List>
        {resourceData.map((skill: any, index: any) => (
          <ListItem key={index}>{skill?.name}</ListItem>
        ))}
      </List>
    </Container>
  );
}
