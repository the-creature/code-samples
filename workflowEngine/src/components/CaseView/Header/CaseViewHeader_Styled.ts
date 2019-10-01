import styled from 'styled-components';
import { sand, clean, dark, lightGray } from '../../../static/styles/colors';

export const CaseViewHeader = styled.div`
  p {
    font-weight: 600;
    color: ${dark};
    font-size: 22px;
    padding-bottom: 5px;
  }
`;

export const LeftHeader = styled.div`
  position: relative;
  width: 100%;
  height: 77px;
  background-color: ${sand};
  border-bottom: 1px solid ${lightGray};
  padding: 10px 20px;
  border-radius: 5px 5px 0 0;
  display: block;
`;

export const LeftHeaderBurger = styled.button`
  appearance: none;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  background-origin: padding-box;
  background-size: auto;
  border-style: none;
  border-width: 0px;
  color: rgb(136, 136, 136);
  cursor: pointer;
  font-family: system-ui, sans-serif;
  font-size: 17px;
  text-align: center;
  top: -15px;
  left: -7px;

  > span {
    display: float;
    position: absolute;
    left: 7px;
    top: 5px;
    color: ${sand};
  }
`;

export const LeftHeaderRefresh = styled.button`
  appearance: none;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  background-origin: padding-box;
  background-size: auto;
  border-style: none;
  border-width: 0px;
  color: rgb(136, 136, 136);
  cursor: pointer;
  font-family: system-ui, sans-serif;
  font-size: 17px;
  text-align: center;
  top: -15px;
  left: 290px;
`;

export const CaseViewCustomerActions = styled.button`
  box-sizing: border-box;
  position: absolute;
  top: 15px;
  right: 25px;
  align-items: center;
  cursor: pointer;
  float: right;
  color: ${clean};
  border-radius: 100%;
  border-style: none;
  border-width: 0px;
  background-color: rgb(42, 100, 213);
  font-size: 13px;
  font-weight: bold;
  height: 20px;
  text-align: center;
  text-indent: -1px;
  text-shadow: none;
  width: 20px;
  vertical-align: middle;
  line-height: 0px;

  span {
    position: absolute;
    top: 6px;
    right: 4px;
  }
`;
