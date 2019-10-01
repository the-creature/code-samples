import styled from 'styled-components';
import { Message } from '../../shared-components/Message/Message_Styled';
import { sand, clean, dark, lightGray } from '../../static/styles/colors';

const selectArrow = require('../../static/images/selectBoxArrow.png');

export const ClassificationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 160px 80px;
  grid-template-areas:
    'main'
    'notes'
    'submit';
`;

export const Main = styled.main`
  grid-area: main;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'main_header'
    'main_body';
`;

export const MainHeaderSection = styled.div`
  grid-area: main_header;
  position: relative;
  padding: 15px 30px;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: ${lightGray};
`;

export const MainBodySection = styled.div`
  grid-area: main_body;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  height: auto;
  max-height: 100%;
  background-color: ${sand};
`;

export const NoteSection = styled.div`
  grid-area: notes;
  position: relative;
  background-color: ${clean};
`;

export const SubmitSection = styled.div`
  grid-area: submit;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  width: 100%;
  border-radius: 0 0 5px 5px;
  background-color: ${lightGray};
  flex-wrap: nowrap;

  > ${Message} {
    width: 180px;

    select {
      display: flex;
      align-items: center;
      text-align: center;
      appearance: none;
      height: 36px;
      border: 1px solid #e3e3e3;
      font-size: 15px;
      font-weight: 400;
      color: ${dark};
      text-indent: 10px;
      cursor: pointer;
      background-image: url(${selectArrow}), linear-gradient(#fefefe, #e3e3e3);
      background-repeat: no-repeat, repeat;
      background-position: right center;
      width: 110%;
      box-sizing: border-box;
    }

    > div {
      width: 135px !important;
      select {
        width: 100%;
      }
    }
  }

  > button {
    color: ${clean};
    background-image: linear-gradient(#62a1e0, #2e6bce);
    appearance: none;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 400;
    cursor: pointer;
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  text-align: left;
`;

export const Row = styled.div`
  position: relative;
  width: 100%;
  background-color: rgb(248, 248, 245);
`;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 22px;
  background-color: ${sand};

  > label {
    word-break: normal;
    line-height: 22px;
    margin-right: 22px;
  }

  > label,
  div {
    width: 50%;
  }

  > input,
  select,
  ${Message} {
    width: 50%;
    select {
      width: 100%;
    }
  }
`;
