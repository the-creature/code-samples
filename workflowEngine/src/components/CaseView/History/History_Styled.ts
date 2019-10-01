import styled from 'styled-components';
import { sand, clean, sea } from '../../../static/styles/colors';

export const History = styled.div`
  width: 100%;
  background: ${sand};
  padding: 0px 0px 10px 6px;
  position: relative;
  display: block;
`;

export const LeftSectionHistory = styled.div`
  padding: 10px;
  background: ${sand};
`;

export const LeftSectionHistoryTitle = styled.div`
  cursor: normal;
  font-weight: 600;
  font-size: 16px;
  padding-bottom: 5px;
  margin-left: 10px;
  background: ${sand};
`;

export const LeftSectionHistoryFilterSection = styled.div`
  position: relative;
  display: flex;
  padding: 0 0 10px 10px;
  border-bottom: 1px solid #ededec;
  justify-content: space-between;
  background: ${sand};

  label {
    background-color: ${sand};
    white-space: nowrap;
  }
`;

export const LeftSectionHistoryFilterLeftRight = styled.div`
  float: right;
  display: flex;
  align-items: center;
  font-size: 11px;
  width: 45%;
  margin-right: 10px;
  background: ${sand};

  select {
    font-size: 11px;
    border-radius: 5px;
    cursor: default;
    appearance: menulist;
    background-image: none;
    height: auto;
    width: auto;
    padding: 50px;
  }
`;

export const LeftProductSectionHistory = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 30px;
  padding-bottom: 20px;
  width: 100%;
  border-radius: 5px;

  :focus {
    background: ${sea};
    color: ${clean};

    > button span {
      color: ${clean};
    }
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    margin-bottom: 0px;
    margin-top: 0px;
    border-radius: 10px !important;
    float: left;
    width: 60px;
    background: ${clean};
  }
`;

export const LeftInfo = styled.div`
  position: relative;
  display: block;
  padding-right: 50px;
`;

export const LeftInfoProductName = styled.div`
  position: relative;
  display: block;
  padding-bottom: 3px;
  font-size: 13px;
  font-weight: bold;
  padding-right: 20px;
`;

export const LeftInfoProductSerial = styled.div`
  position: relative;
  display: block;
  font-size: 11px;
  line-height: 18px;
  width: 100%;
  padding-right: 10px;
`;

export const LeftInfoProductDateInfo = styled.div`
  position: absolute;
  display: block;
  right: 10px;
  top: 15px;
  font-size: 11.5px;
  padding-left: 5px;
  width: auto;
`;

export const LeftInfoProductBlueMore = styled.button`
  position: absolute;
  display: block;
  right: 0;
  top: 20px;
  margin-right: 10px;
  background: none;
  border: none;

  span {
    display: block;
    color: ${sea};
    font-size: 20px;
    font-weight: bold;
    position: relative;
  }
`;
