import styled from 'styled-components';
import { SearchControl } from '../../../../../shared-components/Search/Search_Styled';
import { sand } from '../../../../../static/styles/colors';

export const LinkSerialTop = styled.div`
  display: flex;
  position: relative;
  padding: 22px;
  width: inherit;
  justify-content: space-between;
`;

export const LinkSerialBottom = styled.div`
  display: flex;
  position: relative;
  padding: 22px;
  font-size: 13.5px;
  flex-direction: column;
  ${SearchControl} {
    width: 100%;
  }
  input {
    margin: 15px 0;
  }
`;

export const LinkSerialButton = styled('button')<{ open?: boolean }>`
  background-color: ${sand};
  outline: none;
  border: none;
  color: #3788e6;
  height: 20px;
  font-size: 13.5px;
  z-index: 2;
  padding: ${({ open }) => {
    if (open) return '0 12px 3px 12px';
    return '0 12px 3px 0';
  }};

  :hover {
    cursor: pointer;
  }
`;

export const HintLabel = styled.span`
  font-size: 13px;
  font-weight: 400;
  padding-left: 5px;
  color: gray;
`;
