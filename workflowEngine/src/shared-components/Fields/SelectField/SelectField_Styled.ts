import styled from 'styled-components';
const selectArrow = require('../../../static/images/selectBoxArrow.png');
import { defaultGray } from '../../../static/styles/colors';

export default styled.select`
  font-size: 14px;
  font-weight: normal;
  border-radius: 4px;
  border: 1px solid ${defaultGray};
  height: 30px;
  width: 100%;
  appearance: none;
  padding-left: 6px;
  background-image: url(${selectArrow});
  background-position: center right;
  background-repeat: no-repeat;

  :after {
    content: '›';
    background-color: blue;
    display: block;
  }
`;
