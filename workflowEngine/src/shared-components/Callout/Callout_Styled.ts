import styled from 'styled-components';
import { lightGray } from '../../static/styles/colors';

export const CalloutContainer = styled.div`
  position: relative;
  background-color: ${lightGray};
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  margin: 22px;

  > p {
    padding: 15px 20px 15px 30px;
    width: calc(100% - 20px);
    margin-left: 20px;
    font-size: 13.5px;
    color: #686868;
    line-height: 20px;
    word-break: normal;
  }
`;

export const CalloutIcon = styled.span`
  position: absolute;
  border: 2.5px solid #ed1f00;
  height: 20px;
  width: 20px;
  left: 20px;
  top: 20px;
  border-radius: 10px;
  transform: translateY(-5px);

  :after {
    content: '!';
    font-size: 14px;
    color: #ed1f00;
    position: absolute;
    top: 50%;
    left: calc(50% + 0.5px);
    transform: translate(-50%, -50%);
  }
`;
