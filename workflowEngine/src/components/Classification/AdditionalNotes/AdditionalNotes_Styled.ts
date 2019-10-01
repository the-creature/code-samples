import styled from 'styled-components';

export const AdditionalNotesSection = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'layout_buttons'
    'textarea';
`;

export const LayoutRow = styled.div`
  grid-area: layout_buttons;
  display: flex;
  align-items: center;
  height: 42px;
  padding: 10px 20px 5px;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;

  > button {
    border: none;
    height: 15px;
    width: 15px;
    margin: 0;
    margin-right: 3px;
    padding: 0;
    background-color: rgba(0, 0, 0, 0);

    > img {
      margin: 0;
      padding: 0;
      width: 15px;
      height: 15px;
    }

    :hover {
      cursor: pointer;
    }
  }
`;

export const TextArea = styled.div`
  position: absolute;
  grid-area: textarea;
  width: 100%;
  bottom: 0;
  border-radius: 0;
  height: calc(100% - 42px);

  > textarea {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
