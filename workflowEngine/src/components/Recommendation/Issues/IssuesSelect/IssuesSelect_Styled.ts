import styled from 'styled-components';
const selectArrow = require('../../../../static/images/selectBoxArrow.png');

export const IssuesSelect = styled.div`
  float: left;
  width: auto;
  margin-left: 10px;
  select {
    box-sizing: border-box;
    display: inline-block;
    appearance: none;
    background-image: url(${selectArrow});
    background-position: center right;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-clip: border-box;
    background-color: rgb(214, 214, 214);
    border: none;
    border-radius: 5px;
    color: rgb(51, 51, 51);
    font-size: 13px;
    height: 22px;
    line-height: 16px;
    padding-bottom: 2px;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 2px;
    width: 150px;
  }
`;
