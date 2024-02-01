import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 4px solid #ffffff;
  border-right: 4px solid #ffffff;
  border-bottom: 4px solid #ffffff;
  border-left: 4px solid #6852e2;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <Container>
      <Loading />
    </Container>
  );
};

export default Loader;
