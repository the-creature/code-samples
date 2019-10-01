import React, { FC, KeyboardEvent, useEffect } from 'react';
import { ComponentItem } from '../ProductComponentIssue_Styled';

interface ComponentItemProps {
  /** Determines the view state of the button */
  active: string | boolean;
  hasFocus?: boolean;
  /** The text label displayed underneath the image */
  name: string;
  id?: string;
  tabIndex: number;
  /** Allows the parent component to trigger certain actions */
  onClick: (e?: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

/**
 * The ComponentItem component is used to display the
 * product list as a button with an image and label
 */
const ComponentItemComponent: FC<ComponentItemProps> = ({
  active,
  name,
  id,
  hasFocus = false,
  tabIndex,
  onClick,
  onKeyDown,
}) => {
  /**
   * Reference to the product button
   * @type {React.RefObject<any>}
   */
  const componentRef = React.createRef<HTMLLIElement>();

  /**
   * Triggers the focus state for accessibility requirements
   */
  const handleButtonClick = () => {
    onClick();
    if (componentRef && componentRef.current !== null) {
      componentRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e);
  };

  useEffect(() => {
    if ((hasFocus || active) && componentRef && componentRef.current !== null) {
      componentRef.current.focus();
    }
  }, [active, hasFocus]);

  return (
    <ComponentItem
      aria-label={name}
      aria-checked={active ? true : false}
      aria-selected={active ? true : false}
      tabIndex={tabIndex}
      id={id}
      active={active}
      onClick={handleButtonClick}
      onKeyDown={handleKeyDown}
      ref={componentRef}
      role="radio"
      className="component"
    >
      {name}
    </ComponentItem>
  );
};

export default ComponentItemComponent;
