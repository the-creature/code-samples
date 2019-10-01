import styled from 'styled-components';
import { lightGray } from '../../../../../static/styles/colors';

export const TopicSection = styled.section`
  grid-area: main_header;
  position: relative;
  padding: 15px 30px;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: ${lightGray};
  flex-wrap: wrap;

  > div {
    width: 100%;
  }
`;

export const TopicMessage = styled.div`
  font-size: 12px;
  color: #777;
  padding: 7px 0 12px 3px;
`;
