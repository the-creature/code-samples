import styled from 'styled-components';
import { clean, defaultGray } from '../../../../../static/styles/colors';

export const ButtonList = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;

  > button:first-child {
    border-radius: 4px 0 0 4px;
  }

  > button:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

export const Button = styled('button')<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
  height: 30px;
  border-radius: 0;
  font-size: 15px;
  font-weight: 400;
  background-color: ${props => (props.active ? '#1766D9' : 'rgba(0,0,0,0)')};
  color: ${props => (props.active ? clean : 'black')};
  border: ${props => (props.active ? '1px solid #1766D9' : `1px solid ${defaultGray}`)};

  :hover {
    cursor: pointer;
  }
`;
