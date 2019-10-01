import styled, { keyframes } from 'styled-components';
import { clean, grass } from '../../../static/styles/colors';

const sound = keyframes`
  0% {
      height: 3px;
  }
  100% {
    height: 13px;
  }
`;

export const CallBarIcon = styled.div`
  height: 25px;
  width: 30px;
`;

export const CallBarBar = styled.div`
  background: ${grass};
  height: 6px;
  margin-left: 16px;
  bottom: 21px;
  position: absolute;
  width: 3px;
  animation: ${sound} 0ms -800ms linear infinite alternate;

  &:nth-child(1) {
    left: 2px;
    animation-duration: 474ms;
  }
  &:nth-child(2) {
    left: 7px;
    animation-duration: 433ms;
  }
  &:nth-child(3) {
    left: 12px;
    animation-duration: 407ms;
  }
  &:nth-child(4) {
    left: 17px;
    animation-duration: 458ms;
  }
`;

export const CallBarTimer = styled.div`
  color: ${clean};
  font-size: 15.5px;
  font-weight: 500;
  text-align: left !important;
  padding-left: 35px;
  padding-right: 18px;
  display: flex;
  align-items: center;
`;

export const CallBarGreen = styled.div`
  background: #25864a;
  display: flex;
  border-radius: 5px 0 0 5px;
  cursor: default;
`;

export const VisuallyHidden = styled.div`
  display: none;
`;
