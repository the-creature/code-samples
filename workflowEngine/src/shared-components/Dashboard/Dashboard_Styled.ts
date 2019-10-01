import styled from 'styled-components';
import { secondaryGray } from '../../static/styles/colors';

const homeIcon = require('../../static/images/home.png');
const layoutIcon = require('../../static/images/layout.png');
const plusIcon = require('../../static/images/plus.png');
const searchIcon = require('../../static/images/search.png');
const casesIcon = require('../../static/images/cases.png');
const workbinsIcon = require('../../static/images/email.png');
const scheduledLearningIcon = require('../../static/images/clock.png');
const myLearningIcon = require('../../static/images/mylearning.png');
const knowledgeBaseIcon = require('../../static/images/knowledgeBase.png');

export const Dashboard = styled.div`
  position: absolute;
  display: grid;
  height: 100%;
  width: 100%;
  min-width: 1420px;
  padding: 10px;
  grid-template-columns: 100%;
  grid-template-rows: 93px 40px calc(100% - 133px);
  grid-template-areas:
    'header'
    'topPanel'
    'main';
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  background-image: linear-gradient(#eee, #cdcdcd);
  cursor: default;
  border: 1px solid ${secondaryGray};
  border-radius: 10px 10px 0 0;
  text-align: center;
  display: grid;
  grid-area: header;
  grid-template-columns: 300px 1fr 300px;
  grid-template-rows: 30px 63px;
  grid-template-areas:
    'windowButtons title empty'
    'leftHeaderPanel middleHeaderPanel rightHeaderPanel';
`;

export const Title = styled.h2`
  grid-area: title;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const LeftHeaderPanel = styled.div`
  grid-area: leftHeaderPanel;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding: 10px;
  margin-top: -7px;
  margin-left: 1px;
`;

export const MiddleHeaderPanel = styled.div`
  grid-area: middleHeaderPanel;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const RightHeaderPanel = styled.div`
  grid-area: rightHeaderPanel;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  padding: 10px;
  margin-top: -7px;
  margin-left: 1px;
`;

export const TopPanel = styled.div`
  position: absolute;
  display: block;
  width: 100%;
  background-color: #faf9f8;
  outline: 1px solid ${secondaryGray};
  grid-area: topPanel;
  padding: 10px;
  height: 40px;
  top: 92px;
`;

export const Main = styled.div`
  position: relative;
  display: grid;
  padding: 10px;
  width: inherit;
  border: 1px solid ${secondaryGray};
  border-radius: 0 0 10px 10px;
  background-color: rgb(195, 197, 198);
  grid-area: main;
  grid-template-columns: 390px 1fr 390px;
  grid-column-gap: 10px;
  grid-template-areas: 'leftPanel middlePanel rightPanel';
  > div {
    display: flex;
    align-content: flex-start;
    width: 100%;
  }
`;

export const LeftPanel = styled.div`
  position: relative;
  grid-area: leftPanel;
  flex-wrap: wrap;
  overflow-y: auto;
  > div {
    margin-bottom: 10px;
  }
  > div:last-child {
    margin-bottom: 0;
  }
`;

export const MiddlePanel = styled.div`
  grid-area: middlePanel;
  overflow-y: auto;
  min-width: 560px;
  > div {
    margin-bottom: 10px;
  }
  > div:last-child {
    margin-bottom: 0;
  }
`;

export const RightPanel = styled.div`
  position: relative;
  grid-area: rightPanel;
  flex-wrap: wrap;
  overflow-y: auto;
  > div {
    margin-bottom: 10px;
  }
  > div:last-child {
    margin-bottom: 0;
  }
`;

export const WindowButtons = styled.div`
  grid-area: windowButtons;
  width: 100%;
  height: 21px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const WindowButtonsRed = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  top: 8.5px;
  left: 10px;
  background-color: rgb(252, 13, 27);
  border-color: rgb(226, 36, 51);
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
`;

export const WindowButtonsYellow = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  top: 8.5px;
  left: 30px;
  background-color: rgb(253, 188, 64);
  border-color: rgb(234, 171, 61);
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
`;

export const WindowButtonsGreen = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  top: 8.5px;
  left: 50px;
  background-color: rgb(52, 199, 73);
  border-color: rgb(63, 191, 77);
  border-radius: 100%;
  border-style: solid;
  border-width: 1px;
`;

export const HeaderButtonHome = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  appearance: none;
  user-select: none;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${homeIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin: 10px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonLayout = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${layoutIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 3px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonPlus = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${plusIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-left: 15px;
  margin-right: 0px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonSearch = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${searchIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-left: -1px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonCases = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${casesIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-right: 16px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonWorkbins = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${workbinsIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-right: 16px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonScheduledLearning = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${scheduledLearningIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-top-right-radius: 4px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-right: 16px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonMyLearning = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${myLearningIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-right: 16px;
  width: 35px;
  height: 24px;
`;

export const HeaderButtonKnowledgeBase = styled.button`
  box-sizing: border-box;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  background-color: rgb(249, 248, 249);
  color: rgb(51, 51, 51);
  background-image: url(${knowledgeBaseIcon});
  background-position: 40% -30%;
  background-repeat: no-repeat;
  background-size: contain;
  border-color: rgb(197, 197, 197);
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 0px;
  margin-right: 13px;
  width: 35px;
  height: 24px;
`;
