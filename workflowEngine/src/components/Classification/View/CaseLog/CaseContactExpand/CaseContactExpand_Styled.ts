import styled from 'styled-components';
import { dark } from '../../../../../static/styles/colors';
export const CaseContactContainer = styled.div`
  position: relative;
  width: 100%;
  padding-left: 25px;
`;

export const CaseContactField = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  padding-left: 5px;
  font-size: 15px;
  font-weight: 550;
`;
export const CaseContactExpandLabel = styled.div`
  position: absolute;
  display: inline-block;
  width: 150px;
  top: 50%;
  transform: translateY(-50%);
  color: ${dark};
`;
export const CaseContactExpandInputHolder = styled.div`
  position: relative;
  display: inline-block;
  float: right;
  clear: left;
  width: 300px;
  margin-right: 30px;
  div {
    padding-top: 4px;
    padding-bottom: 4px;
    right: 10px;
    width: 300px;
  }
`;
