import styled from 'styled-components';
import { sand, dark } from '../../../static/styles/colors';

export const CustomerDetails = styled.div`
  position: relative;
  outline: none;
  display: block;
  cursor: pointer;
  padding-left: 25px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 550;
  color: ${dark};
  background-color: ${sand};
  [role='listitem'] {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    .details-label {
      width: 25%;
    }
    .details-value {
      font-weight: normal;
      width: 70%;
    }
  }
`;

export const CustomerDetailsList = styled.div`
  padding-left: 20px;
`;

export const DetailsListItem = styled.div`
  label {
    font-weight: bold;
    width: 30%;
    font-size: 13px;
    vertical-align: top;
    display: inline-block;
  }
  p {
    font-size: 12px;
    padding-left: 10px;
    line-height: 12px;
    width: 60%;
    display: inline-block;
    box-sizing: border-box;
    color: rgb(51, 51, 51);
  }
`;
