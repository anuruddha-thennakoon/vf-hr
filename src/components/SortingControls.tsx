//@ts-nocheck
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: right;
  align-items: center;
  margin-top: 30px;
`;
const Selection = styled.span`
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  width: 28px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid #bebebe;
  background-color: ${(props) => (props.active ? "#6852e2" : "initial")};
  color: ${(props) => (props.active ? "white" : "initial")};
`;

type SortingControlsProps = {
  sortingMethod: string;
  setSortingMethod: (method: string) => void;
};

export default function SortingControls({
  sortingMethod,
  setSortingMethod,
}: SortingControlsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const handleSorting = (method: string) => {
    queryParams.set("sort", method);
    navigate(`?${queryParams.toString()}`);
    setSortingMethod(method);
  };

  return (
    <Container>
      SORT
      <Selection
        active={sortingMethod === "asc"}
        onClick={() => handleSorting("asc")}
      >
        A-Z
      </Selection>
      <Selection
        active={sortingMethod === "desc"}
        onClick={() => handleSorting("desc")}
      >
        Z-A
      </Selection>
    </Container>
  );
}
