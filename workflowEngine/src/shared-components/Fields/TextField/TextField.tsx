import React, { ChangeEvent, RefObject } from 'react';
import Message from '../../Message/Message';
import { InputField, TextAreaField } from './TextField_Styled';

interface TextFieldProps {
  id?: string;
  /** The value for input field */
  value: string;
  /** The required value for input field for nextStep to trigger s */
  requiredValue?: string;
  /** The placeholder value for input fields */
  placeholder?: string;
  /** Defaults to "text", but can be switched to "textarea" */
  type: 'text' | 'textarea';
  /** Allows developers to change the size of the input field */
  inputSize?: string | undefined;
  /** The step action used to trigger the next step */
  /** Disables the component */
  disabled?: boolean;
  /** Allows parent to pass on onChange method for external use */
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;

  /** for error message * */
  error?: string;
  errorPosition?: string;
}

/**
 * The TextField component is an accessible input field component.
 */
class TextFieldComponent extends React.Component<TextFieldProps> {
  static defaultProps = {
    value: undefined,
    placeholder: '',
    type: 'text',
    inputSize: null,
    disabled: false,
    onChange: null,
    error: null,
    errorPosition: 'bottom',
  };

  /**
   * References the input field dom element for accessibility requirements
   * @type {React.RefObject<any>}
   */
  inputRef = React.createRef<HTMLTextAreaElement | HTMLInputElement>();

  // The input field component's focus method for accessibility requirements
  onFocus = () => {
    if (this.inputRef !== null && this.inputRef.current !== null) {
      this.inputRef.current.focus();
    }
  };

  /**
   * The onChange method updates the input field's value
   * @param event - default object argument from event handling methods
   */
  onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  render() {
    /**
     * onChange and value are destructed to separate those props from the
     * ...rest property. Please keep them here to prevent conflicts.
     */
    const { placeholder, type, inputSize, value, error, errorPosition, ...rest } = this.props;
    if (type === 'textarea') {
      return (
        <Message error={error} errorPosition={errorPosition}>
          <TextAreaField
            value={value}
            placeholder={placeholder}
            onChange={this.onChange}
            ref={this.inputRef as RefObject<HTMLTextAreaElement>}
            onClick={this.onFocus}
            autoComplete="off"
            name="notASearchField" // Prevents Safari's auto complete feature
            {...rest}
          />
        </Message>
      );
    }
    return (
      <Message error={error} errorPosition={errorPosition}>
        <InputField
          value={value}
          placeholder={placeholder}
          type={type}
          inputSize={inputSize}
          onChange={this.onChange}
          ref={this.inputRef as RefObject<HTMLInputElement>}
          onClick={this.onFocus}
          autoComplete="off"
          name="notASearchField" // Prevents Safari's auto complete feature
          {...rest}
        />
      </Message>
    );
  }
}

export default TextFieldComponent;
