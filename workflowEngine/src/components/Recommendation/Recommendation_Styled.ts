import styled from 'styled-components';

export const RecommendationPane = styled.div`
  position: relative;
  margin-bottom: 0px;
  min-height: 250px;
  overflow-x: hide;
  width: 100%;
  overflow-y: auto;
  font-size: 13.5px;
  color: rgb(102, 102, 102);
`;

export const RecommendationPaneNone = styled.div`
  color: rgb(102, 102, 102);
  background-color: #f8f8f5;
  border-radius: 5px;
  height: 100%;
  padding: 10px;
  p {
    text-align: center;
    margin: 0;
    position: absolute;
    top: 50%;
  }
`;
