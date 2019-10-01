import styled from 'styled-components';

export const CollapsibleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollapsibleHeader = styled('button')<{ open?: boolean }>`
  position: relative;
  font-size: 16px;
  font-weight: 600;
  padding-left: 18px;
  border: none;
  background: none;
  text-align: left;
  :before {
    content: '▶';
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    color: #666;
    transition: transform 300ms;
    transform: ${({ open }) => (open ? 'rotate(90deg)' : 'none')};
  }
  &.expanded {
    :before {
      transform: rotate(90deg) scaleX(1.25);
    }
  }
`;

export const CollapsibleBody = styled.div`
  display: block;
  position: relative;
`;
