import styled from 'styled-components';
import { clean } from '../../../static/styles/colors';

export const CallInfoPopup = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 50px;
  right: 0;
  top: 82px;
  height: 154px;
  width: 443px;
  z-index: 100;
`;

export const CallInfoTail = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  text-align: center;
  top: 10px;
  width: 18px;
  height: 12px;
  z-index: 100;
  img {
    position: relative;
    width: 100%;
    height: 100%;
    top: -6px;
  }
`;

export const CallInfoContent = styled.div`
  background-color: #8e8d8d;
  border-color: #6e6c6f;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 40px 0px;
  box-sizing: border-box;
  color: ${clean};
  display: inline-block;
  font-family: system-ui, sans-serif;
  font-size: 13.5px;
  height: 138px;
  margin: 0px;
  padding: 0px;
  text-align: left;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 442px;
`;

export const CallInfoTopRow = styled.div`
  border-bottom-color: rgba(255, 255, 255, 0.5);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  box-sizing: border-box;
  display: block;
  font-size: 13.5px;
  height: 86px;
  padding: 15px;
  text-align: left;
  width: 100%;
  position: fixed;
`;

export const CallInfoIcon = styled.div`
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  display: inline-block;
  font-family: system-ui, sans-serif;
  font-size: 13.5px;
  height: 30px;
  width: 30px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: 10px;
  text-align: left;
  vertical-align: middle;

  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
`;

export const CallInfoContentSection = styled.div`
  box-sizing: border-box;
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  width: 300px;
  left: 30;
  text-align: left;
  font-size: 13.5px;
  font-weight: bold;
  height: 50px;
  line-height: 25px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 10px;
  margin-top: 0px;
`;

export const CallInfoUser = styled.div`
  box-sizing: border-box;
  display: inline;
  font-weight: normal;
  line-height: 25px;
  text-align: left;
`;

export const CallInfoCallInfo = styled.div`
  display: inline-block;
  position: absolute;
  vertical-align: middle;
  text-align: left;
  right: 0;
  width: 100%;
`;

export const CallInfoTimeSection = styled.div`
  display: inline-block;
  box-sizing: border-box;
  position: absolute;
  right: 20px;
  height: 55px;
  width: 55px;
  text-align: left;
  vertical-align: middle;
  transform: matrix(1, 0, 0, 1, 0, 0);

  img {
    vertical-align: middle;
    width: 20px;
    top: -2px;
  }
`;

export const CallInfoTotalOnCall = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: fixed;
  left: 0px;
  height: 20px;
  margin-bottom: 5px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 5px;
  padding: 0px;
  width: 100%;
  color: ${clean};
`;

export const CallInfoTotalCallTimer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
`;

export const CallInfoTotalOnHold = styled.div`
  box-sizing: border-box;
  display: inline-block;
  position: fixed;
  left: 0px;
  top: 25px;
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 5px;
  padding: 0px;
  color: ${clean};
`;

export const CallInfoTotalOnHoldTimer = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
`;

export const CallInfoBottomRow = styled.div`
  display: inline-block;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
`;

export const CallInfoTransfers = styled.div`
  box-sizing: border-box;
  display: inline-block;
  border-right-color: rgba(255, 255, 255, 0.5);
  border-right-style: solid;
  border-right-width: 1px;
  height: 50px;
  width: 33%;
  padding: 15px;
  text-align: left;
`;

export const CallInfoTransfersBody = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  box-sizing: border-box;
  font-size: 13.5px;
  height: 16px;
  text-align: left;
  vertical-align: middle;
`;

export const CallInfoTransferNumber = styled.div`
  box-sizing: border-box;
  display: block;
  float: right;
  right: 0;
  font-size: 17px;
  font-weight: 600;
  height: 20px;
  text-align: left;
`;

export const CallInfoWait = styled.div`
  border-right-color: rgba(255, 255, 255, 0.5);
  border-right-style: solid;
  border-right-width: 1px;
  box-sizing: border-box;
  display: inline-block;
  height: 50px;
  width: 34%;
  padding: 15px;
  text-align: left;
`;

export const CallInfoWaitBody = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  box-sizing: border-box;
  font-size: 13.5px;
  height: 16px;
  text-align: left;
  vertical-align: middle;
`;

export const CallInfoTotalWaitTimer = styled.div`
  box-sizing: border-box;
  display: block;
  float: right;
  right: 0;
  font-size: 17px;
  font-weight: 600;
  height: 20px;
  text-align: left;
`;

export const CallInfoTalk = styled.div`
  border-right-width: 0px;
  box-sizing: border-box;
  display: inline-block;
  right: 0px;
  height: 50px;
  width: 33%;
  padding: 15px;
  text-align: left;
`;

export const CallInfoTalkBody = styled.div`
  display: inline-block;
  position: relative;
  left: 0;
  box-sizing: border-box;
  font-size: 13.5px;
  height: 16px;
  text-align: left;
  vertical-align: middle;
`;

export const CallInfoTotalTalkTimer = styled.div`
  box-sizing: border-box;
  display: block;
  float: right;
  right: 0;
  font-size: 17px;
  font-weight: 600;
  height: 20px;
  text-align: left;
`;
