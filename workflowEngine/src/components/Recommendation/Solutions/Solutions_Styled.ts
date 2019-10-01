import styled from 'styled-components';

export const SolutionsItem = styled.div`
  background-color: rgb(248, 248, 245);
  width: 390px;
  border-radius: 5px;
  padding: 15px;
`;

export const SolutionsTitle = styled.div`
  display: flex;
  flex-direction: row;
  position: static;
`;

export const SolutionsTitleIcon = styled.div`
  img {
    height: 25px;
  }
`;

export const SolutionsTitleTitle = styled.div`
  position: relative;
  width: 150px;
  font-size: 18px;
  font-weight: 500;
  top: 2px;
  left: 3px;
`;
