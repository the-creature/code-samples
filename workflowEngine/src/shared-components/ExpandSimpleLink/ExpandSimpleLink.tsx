import React, { MouseEvent } from 'react';
import { ExpandSimpleContainer, ExpandSimpleButton } from './ExpandSimpleLink_Styled';

interface ExpandSimpleLinkProps {
  /** The open link text */
  openText: string;
  /** The close link text */
  closeText: string;
  /** The step action used to trigger the next step */
  nextStep?: () => void;
  onClick?: (e: MouseEvent) => void;
  /** Prevents the link from expanding */
  disabled?: boolean;
}

interface ExpandSimpleLinkState {
  open: boolean;
}

/**
 * The ExpandSimpleLink component initially starts off as a link with a line
 * passing through the background. After the user clicks on this component,
 * the component will expand and reveal children components.
 */
class ExpandSimpleLinkComponent extends React.Component<
  ExpandSimpleLinkProps,
  ExpandSimpleLinkState
> {
  static defaultProps = {
    nextStep: null,
    disabled: false,
  };

  state = {
    open: false,
  };

  /**
   * The click event handler that determines whether or not the component
   * should expand.
   * @param e - default object argument from event handling methods
   */
  handleClick = (e: MouseEvent) => {
    if (this.props.nextStep) {
      this.props.nextStep();
    }
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    if (this.props.disabled) {
      return null;
    }
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    if (!this.state.open) {
      return (
        <ExpandSimpleButton onClick={this.handleClick} aria-expanded="false">
          {this.props.openText}
        </ExpandSimpleButton>
      );
    }
    return (
      <ExpandSimpleContainer>
        <p>{this.props.children}</p>
        <ExpandSimpleButton onClick={this.handleClose} aria-expanded="true">
          {this.props.closeText}
        </ExpandSimpleButton>
      </ExpandSimpleContainer>
    );
  }
}

export default ExpandSimpleLinkComponent;
