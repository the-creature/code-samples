import React, { FC, KeyboardEvent, useEffect } from 'react';
import { IssueItem } from '../ProductComponentIssue_Styled';

interface IssueItemProps {
  /** Determines the view state of the button */
  active: boolean;
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
 * The IssueItem component is used to display the
 * product list as a button with an image and label
 */
const IssueItemComponent: FC<IssueItemProps> = ({
  active,
  hasFocus = false,
  name,
  id,
  tabIndex,
  onClick,
  onKeyDown,
}) => {
  /**
   * Reference to the product button
   * @type {React.RefObject<any>}
   */
  const issueRef = React.createRef<HTMLLIElement>();

  /**
   * Triggers the focus state for accessibility requirements
   */
  const handleButtonClick = () => {
    onClick();
    if (issueRef && issueRef.current !== null) {
      issueRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e);
  };

  useEffect(() => {
    if ((hasFocus || active) && issueRef && issueRef.current !== null) {
      issueRef.current.focus();
    }
  }, [active, hasFocus]);

  return (
    <IssueItem
      aria-label={name}
      aria-checked={active ? true : false}
      aria-selected={active ? true : false}
      tabIndex={tabIndex}
      id={id}
      active={active}
      onClick={handleButtonClick}
      onKeyDown={handleKeyDown}
      ref={issueRef}
      role="radio"
      className="issue"
    >
      {name}
    </IssueItem>
  );
};

export default IssueItemComponent;
