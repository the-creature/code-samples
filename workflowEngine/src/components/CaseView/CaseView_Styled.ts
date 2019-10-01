import styled from 'styled-components';
import { sand } from '../../static/styles/colors';

export const CaseWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  background-color: ${sand};
  width: 100%;
  height: 1000px;
  max-height: 100%;
  min-height: 250px;
  overflow-y: hidden;
  word-break: normal;
`;

export const ScrollContainer = styled.div`
  height: calc(100% - 77px);
  overflow-y: scroll;
  overflow-x: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.01);
  width: 100%;
`;
