import styled from 'styled-components';
import { defaultGray } from '../../static/styles/colors';

export default styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${defaultGray};
  position: absolute;
  z-index: 1;
  margin: 0;
  opacity: 0.3;
`;
