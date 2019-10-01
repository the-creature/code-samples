import styled from 'styled-components';
import { clean } from '../../../static/styles/colors';

export const CallInfo = styled.div`
  background: #1c1d23;
  height: 100%;
  width: 280px;
  position: relative;
  margin-left: 0px;
  padding: 0px 10px;
  border-left: 1px solid #777;
  overflow: hidden;
  opacity: 1;
  text-align: left;
  cursor: default;
`;

export const ImgCallerIcon = styled.img`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 11px;
`;

export const CallerName = styled.div`
  p {
    position: relative;
    color: ${clean};
    top: 4.1px;
    text-align: left;
    font-size: 15.5px;
    font-weight: 450;
    width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SpeakerIcon = styled('div')<{ type: string }>`
  img {
    position: relative;
    width: 15px;
    left: 10px;
    opacity: ${props => (props.type === 'dim' ? '0.4' : '1.0')};
  }
`;

export const CallCounterTop = styled.div`
  position: absolute;
  display: flex;
  color: ${clean};
  right: 6px;
  top: 9px;
  width: 70px;
  img {
    position: relative;
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;

export const CallCounterBottom = styled.div`
  position: absolute;
  display: flex;
  color: ${clean};
  right: 6px;
  top: 29px;
  width: 70px;
  img {
    position: relative;
    display: inline-block;
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
`;

export const TimeWrapper = styled('div')<{ type: string }>`
  position: relative;
  display: flex;
  font-size: 14px;
  top: 0px;
  right: 0px;
  opacity: ${props => (props.type === 'dim' ? '0.4' : '1.0')};
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

export const CallerContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 2px;
`;
