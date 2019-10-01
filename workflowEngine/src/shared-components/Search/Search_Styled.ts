import styled from 'styled-components';
import { Message } from '../Message/Message_Styled';
import { clean, lightGray, defaultGray } from '../../static/styles/colors';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  ${/* sc-selector */ Message} {
    [data-error]:before {
      right: 55px;
    }

    [data-error]:after {
      right: 30px;
    }
  }
`;

export const SearchControl = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

export const SearchResults = styled.ul`
  background: ${clean};
  border: 1px solid ${defaultGray};
  border-radius: 4px;
  position: absolute;
  width: 260px;
  height: 160px;
  top: 40px;
  right: 29px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.25s ease;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;

  li {
    padding: 7px 12px;
    outline: none;
    cursor: pointer;
    &:hover,
    &:focus,
    &.selected {
      background: #1271e3 !important;
      color: ${clean} !important;
    }
  }
`;

export const SearchButton = styled.button`
  border: none;
  height: 30px;
  width: 30px;
  background-color: rgba(0, 0, 0, 0);
  font-weight: 200;
  font-size: 14px;
  line-height: 16px;
  opacity: ${({ disabled }) => {
    if (disabled) return '0.5';
    return '1';
  }};
  pointer-events: ${({ disabled }) => {
    if (disabled) return 'none';
    return 'auto';
  }};
  :hover {
    cursor: pointer;
  }
  > img {
    height: 20px;
    width: 20px;
  }
`;

export const SearchInput = styled('input')<{ inputSize?: string | undefined }>`
  display: inline-block;
  vertical-align: center;
  font-size: ${({ inputSize }) => {
    if (inputSize === 'large') return '21px';
    return '14px';
  }};
  font-weight: ${({ inputSize }) => {
    if (inputSize === 'large') return '500';
    return 'normal';
  }};
  height: 30px;
  width: 100%;
  min-width: 260px;
  padding: ${({ inputSize }) => {
    if (inputSize === 'large') return '19px 13px';
    return '6px 15px';
  }};
  border-radius: 5px;
  border: 1px solid ${lightGray};
`;
