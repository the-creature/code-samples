import styled from 'styled-components';
import { lightGray } from '../../../../../static/styles/colors';

export const DescriptionContainer = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: ${lightGray};
  display: grid;
  overflow: auto;
  grid-template-columns: 100px 1fr auto;
  grid-template-rows: 30px 1fr;
  grid-template-areas:
    'description_icon description_title description_edit'
    'description_icon description_content description_edit';
`;

export const DescriptionIcon = styled.img`
  grid-area: description_icon;
  height: 80px;
  width: 80px;
  border-radius: 17px;
`;

export const DescriptionTitle = styled.h3`
  grid-area: description_title;
  width: 100%;
  height: 26px;
`;

export const DescriptionContent = styled.div`
  position: relative;
  grid-area: description_content;
  font-size: 14px;
  color: #555;
`;

export const DescriptionEdit = styled.div`
  grid-area: description_edit;
  color: #3788e6;
  cursor: pointer;
`;
