import styled from 'styled-components';
import { sand, clean, dark, sea } from '../../../static/styles/colors';

export const Products = styled.div`
  position: relative;
  outline: none;
  display: inline-block;
  cursor: pointer;
  padding-left: 25px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: 550;
  color: ${dark};
  background-color: ${sand};
`;

export const ProductEntry = styled.div`
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
`;

export const DetailsListItem = styled.div`
  box-sizing: border-box;
  display: block;
  width: 320px;
  border-radius: 5px;
  border-bottom: 1px solid #eee;
  margin: 0;
  color: ${dark};
  line-height: 23px;
  height: 91px;
  padding-bottom: 15px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 15px;
  text-align: left;

  img {
    float: left;
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 0px;
    margin-top: 0px;
    border-radius: 10px;
    width: 60px;
    vertical-align: middle;
  }

  :focus {
    background: ${sea};
    color: ${clean};
    > button span {
      color: ${clean};
    }
    > div div {
      color: ${clean};
    }
  }
`;

export const DetailLeftInfo = styled.div`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  height: 60px;
  width: 225px;
  line-height: 23px;
  text-align: left;
`;

export const DetailLeftInfoProductName = styled.div`
  font-size: 14px;
  padding-bottom: 3px;
  padding-top: 10px;
  color: ${dark};
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: break-word;
`;

export const DetailLeftInfoProductSerial = styled.div`
  font-size: 12px;
  line-height: 18px;
  button {
    display: inline-block;
    align-items: flex-start;
    box-sizing: border-box;
    cursor: pointer;
    appearance: none;
    background-color: rgb(137, 136, 137);
    border-radius: 100%;
    border-color: rgb(255, 255, 255);
    border-style: none;
    border-width: 0;
    color: rgb(255, 255, 255);
    font-family: serif;
    font-size: 15px;
    font-weight: bold;
    height: 18px;
    width: 18px;
    line-height: 18px;
    letter-spacing: normal;
    margin-bottom: 0px;
    margin-left: 10px;
    margin-right: 5px;
    margin-top: 0px;
  }
`;

export const ProductBlueMore = styled.button`
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  margin: 0px;
  padding: 0px;
  cursor: pointer;
  background: none;
  border: none;
  left: -3px;
  top: -20px;

  span {
    position: relative;
    font-weight: bold;
    color: ${sea};
    font-size: 20px;
  }
`;
