import styled from 'styled-components';
import { clean } from '../../../static/styles/colors';

export const CallPlayBar = styled.div`
  background: #4f545b;
  height: 100%;
  width: 268px;
  position: relative;
  border-radius: 0 5px 5px 0;
  border-left: 1px solid #777;
  display: flex;
  align-items: center;
`;

export const PauseButton = styled('button')<{ isFocus: boolean }>`
  display: flex;
  cursor: pointer;
  margin-left: 7.5px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: ${props => (props.isFocus ? clean : '#60666C')};

  img {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
    filter: ${props => (props.isFocus ? 'invert(0.65)' : 'none')};
  }

  span {
    margin-top: -3px;
    margin-left: -7px;
  }
`;

export const PhoneButton = styled.button`
  display: flex;
  cursor: pointer;
  margin-left: 7.5px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: #fc3c38;

  img {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
  }

  span {
    margin-top: -3px;
    margin-left: -7px;
  }
`;

export const MuteButton = styled('button')<{ isFocus: boolean }>`
  display: flex;
  cursor: pointer;
  margin-left: 7.5px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: ${props => (props.isFocus ? clean : '#60666C')};

  img {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
    filter: ${props => (props.isFocus ? 'invert(0.65)' : 'none')};
  }

  span {
    margin-top: -3px;
    margin-left: -7px;
  }
`;

export const InfoButton = styled('button')<{ isFocus: boolean }>`
  display: flex;
  cursor: pointer;
  margin-left: 7.5px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: ${props => (props.isFocus ? clean : '#60666C')};

  img {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
    filter: ${props => (props.isFocus ? 'invert(0.65)' : 'none')};
  }

  span {
    margin-top: -3px;
    margin-left: -7px;
  }
`;

export const DialButton = styled.button`
  display: flex;
  cursor: pointer;
  margin-left: 7.5px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: #60666c;

  img {
    width: 40px;
    height: 40px;
    object-fit: scale-down;
  }
  span {
    margin-top: -3px;
    margin-left: -7px;
  }
`;
