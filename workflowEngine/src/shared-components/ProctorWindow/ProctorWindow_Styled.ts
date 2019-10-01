import styled, { keyframes, css } from 'styled-components';
import { clean, gray, darkGray } from '../../static/styles/colors';

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Popper = styled.div`
  z-index: 4;
  position: absolute;
  top: 0;
  right: 120px;
`;

export const DragHeader = styled.div`
  border-radius: 10px 10px 0px 0px;
  position: absolute;
  cursor: move;
  height: 40px;
  width: 100%;
  left: 0px;
  top: 0px;
`;

export const Layover = styled('div')<{ active?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: ${({ active }) => {
    if (active) return 'block';
    return 'none';
  }};
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ active }) => {
    if (active) return '1000';
    return '-1';
  }};
  animation: ${fade} 0.3s;
`;

export const ProctorButton = styled.button`
  position: absolute;
  border-radius: 0px 0px 10px 10px;
  width: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 7px;
  padding-bottom: 20px;
  height: 40px;
  top: 0px;
  right: 100px;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: ${clean};
  font-size: 20px;
  font-weight: bold;
  backdrop-filter: saturate(1000%) blur(2px);
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
`;

export const Proctor = styled.div`
  position: relative;
  width: 400px;
  top: 400px;
  right: 320px;
  height: auto;
  color: ${clean};
  border-radius: 10px;
  backdrop-filter: saturate(1000%) blur(10px);
  background: rgba(0, 0, 0, 0.5);
  outline: none;
  z-index: 999;
  padding: 10px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
  transform-origin: 0% -25%;
`;

export const ProctorCloseButton = styled.button`
  height: 20px;
  width: 20px;
  position: relative;
  z-index: 9 !important;
  border: none;
  color: ${clean};
  background-color: rgba(0, 0, 0, 0);

  :after {
    content: '';
    height: 20px;
    border-left: 2px solid ${clean};
    position: absolute;
    transform: rotate(45deg);
    left: 10px;
    top: 0px;
    z-index: 10 !important;
  }

  :before {
    content: '';
    height: 20px;
    border-left: 2px solid ${clean};
    position: absolute;
    transform: rotate(-45deg);
    left: 10px;
    top: 0px;
    z-index: 10 !important;
  }

  :hover {
    cursor: pointer;
  }
`;

export const ProctorTitle = styled.div`
  color: ${clean};
  font-size: 22px;
  margin: 0 auto;
  padding-top: 5px;
  padding-bottom: 0px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: 600;
`;

export const ProctorContent = styled.div`
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  text-align: left;
  color: ${clean};
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  font-weight: 500;
  line-height: 23px;
  ul {
    list-style-type: disc;
    padding: 0 0 1rem 1rem;
    li {
      display: list-item;
    }
  }
`;

export const ProctorFooter = styled.div`
  margin: 0 25px;
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0 0;
  border-top: 1px solid ${gray};
`;

const sharedStyleButton = css`
  background: ${darkGray};
  color: ${clean};
  border: none;
  height: 33px;
  border-radius: 5px;
  font-size: 20px;
  width: 33px;

  :hover {
    cursor: pointer;
  }
`;

export const ProctorHintButton = styled.button`
  ${sharedStyleButton}
  font-size: 13px;
  line-height: 20px;
  font-weight: bold;
  width: 60px;
`;

export const ProctorPrevButton = styled.button`
  ${sharedStyleButton}
`;

export const ProctorRefreshButton = styled.button<{ flexbox?: boolean }>`
  ${sharedStyleButton}
`;
