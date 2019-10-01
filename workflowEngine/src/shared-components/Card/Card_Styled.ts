import styled from 'styled-components';
import { sand } from '../../static/styles/colors';

export default styled('div')<{ height: string | undefined }>`
  position: relative;
  border-radius: 5px;
  background-color: ${sand};
  width: 100%;
  height: ${props => props.height};
  min-height: 250px;
  overflow-y: auto;
  word-break: break-all;
`;
