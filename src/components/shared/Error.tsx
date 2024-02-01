import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  height: 40px;
  color: red;
  align-items: center;
  justify-content: center;
`;

const Error = () => {
  return <Container>Something went wrong (API Error)</Container>;
};

export default Error;
