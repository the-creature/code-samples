import styled from 'styled-components';
import { SearchControl } from '../../../../../shared-components/Search/Search_Styled';
import { clean, defaultGray } from '../../../../../static/styles/colors';

export const ProductSection = styled.section`
  position: relative;
  width: 100%;
  padding: 0 22px;
  padding-bottom: 50px;
  background-color: rgb(248, 248, 245);
`;

export const ProductTitleSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 45px;
  z-index: 2;

  > label {
    width: 40%;
  }

  > ${SearchControl} {
    position: absolute;
    right: 0;
    height: 100%;
  }
`;

export const ProductListSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

export const ComponentSectionEmpty = styled.div`
  position: relative;
  height: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #555;
  border-top: 1px solid ${defaultGray};
  border-bottom: 1px solid ${defaultGray};
`;

export const ComponentSection = styled.section`
  position: relative;
  background-color: rgb(248, 248, 245);
  width: 100%;
`;

export const ComponentHeaderSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 22px;
  height: 36px;
  z-index: 2;
`;

export const ComponentTitleSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;

  > label {
    width: 40%;
  }

  > ${SearchControl} {
    position: absolute;
    right: 0;
  }
`;

export const ComponentMainSection = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  height: 150px;
  width: 100%;
  border-top: 1px solid ${defaultGray};
  border-bottom: 1px solid ${defaultGray};
  padding: 0;
`;

export const ComponentPanel = styled.div`
  position: relative;
  width: 50%;
  max-height: 150px;
  overflow-y: auto;
  font-size: 14.5px;
`;

export const ComponentItem = styled('li')<{ active: string | boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 0 12px 0 22px;
  font-weight: 600;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: hidden;
  outline: none;
  text-overflow: ellipsis;
  border-right: 1px solid ${defaultGray};
  background-color: ${({ active }) => {
    if (active === 'dull') return 'rgb(232, 232, 232)';
    if (active) return '#1271E3';
    return 'none';
  }};
  color: ${({ active }) => {
    if (active === 'dull') return 'black';
    if (active) return clean;
    return 'black';
  }};
  :hover {
    cursor: pointer;
  }
  :focus {
    background-color: #1271e3;
    color: white;
  }
`;

export const IssueItem = styled('li')<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  padding: 0 12px;
  font-weight: normal;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: hidden;
  outline: none;
  text-overflow: ellipsis;
  background-color: ${props => (props.active ? '#1271E3' : 'none')};
  color: ${props => (props.active ? clean : 'black')};
  :hover {
    cursor: pointer;
  }
  :focus {
    background-color: #1271e3;
    color: white;
  }
`;
