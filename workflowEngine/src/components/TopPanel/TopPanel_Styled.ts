import styled from 'styled-components';
import { clean, secondaryGray } from '../../static/styles/colors';

export const TopPanel = styled.div`
  display: block;
  width: 100%;
  background-color: #faf9f8;
  border: 1px solid ${secondaryGray};
  grid-area: topPanel;
  padding: 10px;
  height: 40px;
`;

export const TopPanelCustomerName = styled.div`
  box-sizing: border-box;
  position: relative;
  padding-right: 20px;
  text-align: left;
  float: left;
  color: rgb(51, 51, 51);
  font-size: 16px;
  font-weight: bold;
`;

export const TopPanelRegionLanguage = styled.div`
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-left: 10px;
  padding-top: 2px;
  color: rgb(51, 51, 51);
  font-size: 14px;
`;

export const TopPanelCustomerActions = styled.button`
  background: #2a64d5;
  border: none;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  float: right;
  color: ${clean};

  span {
    display: inline-block;
    font-weight: bold;
    color: white;
    position: relative;
    top: -3px;
    right: 3px;
  }
`;
