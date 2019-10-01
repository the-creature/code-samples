import styled from 'styled-components';
import { sand, clean, defaultGray } from '../../../../../../static/styles/colors';

export const ProductItem = styled('button')<{ active: string | boolean }>`
  position: relative;
  width: 100px;
  height: 110px;
  border-radius: 4px;
  border: 1px solid ${defaultGray};
  transition: transform 0.15s ease;
  margin-right: 10px;
  font-size: 12.5px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  background-color: ${props => (props.active ? clean : sand)};
  transform: ${props => (props.active ? 'scale3d(1.18, 1.18, 1.18)' : 'scale(1)')};
  z-index: ${props => (props.active ? '2' : '1')};

  > img {
    height: 60px;
    width: 60px;
    margin-bottom: 3px;
  }
`;
