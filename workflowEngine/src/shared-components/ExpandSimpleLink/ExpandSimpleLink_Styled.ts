import styled from 'styled-components';

export const ExpandSimpleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50px;
  > div,
  p {
    width: 100%;
  }
`;

export const ExpandSimpleButton = styled.button`
  outline: none;
  border: none;
  color: #3788e6;
  background-color: rgba(0, 0, 0, 0);
  height: 20px;
  font-size: 13.5px;
  z-index: 2;
  padding: 5px 0;

  :hover {
    cursor: pointer;
  }
`;
