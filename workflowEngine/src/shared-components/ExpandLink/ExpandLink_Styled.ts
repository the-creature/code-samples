import styled from 'styled-components';
import { sand } from '../../static/styles/colors';

export const ExpandContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: 50px;
`;

export const ExpandButton = styled.button`
  background-color: ${sand};
  border: none;
  color: #3788e6;
  font-size: 15px;
  z-index: 2;
  cursor: pointer;
`;
