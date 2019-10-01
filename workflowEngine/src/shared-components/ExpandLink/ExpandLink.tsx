import React, { FC, MouseEvent, createRef, useEffect, useState } from 'react';
import Line from '../Line/Line';
import { ExpandContainer, ExpandButton } from './ExpandLink_Styled';

interface ExpandLinkProps {
  id?: string;
  /** The link text content */
  text: string;
  hasFocus?: boolean;
  /** The step action used to trigger the next step */
  nextStep?: () => void;
  onClick?: (e: MouseEvent) => void;
  /** Prevents the link from expanding */
  disabled?: boolean;
}

/**
 * The ExpandLink component initially starts off as a link with a line
 * passing through the background. After the user clicks on this component,
 * the component will expand and reveal children components.
 */
const ExpandLinkComponent: FC<ExpandLinkProps> = ({
  id,
  text,
  hasFocus = false,
  nextStep = null,
  disabled = false,
  onClick,
  children,
}) => {
  const buttonRef = createRef<HTMLButtonElement>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (hasFocus && buttonRef && buttonRef.current !== null) {
      buttonRef.current.focus();
    }
  }, [hasFocus]);

  /**
   * The click event handler that determines whether or not the component
   * should expand.
   * @param e - default object argument from event handling methods
   */
  const handleClick = (e: MouseEvent) => {
    if (nextStep) {
      nextStep();
    }
    if (onClick) {
      onClick(e);
    }
    if (disabled) {
      return null;
    }
    setOpen(true);
  };

  if (!open) {
    return (
      <ExpandContainer>
        <Line aria-hidden="true" />
        <ExpandButton
          id={id}
          onClick={handleClick}
          ref={buttonRef}
          aria-expanded="false"
          title={text}
        >
          {text}
        </ExpandButton>
      </ExpandContainer>
    );
  }
  return (
    <ExpandContainer aria-expanded="true" title={text}>
      {children}
    </ExpandContainer>
  );
};

export default ExpandLinkComponent;
