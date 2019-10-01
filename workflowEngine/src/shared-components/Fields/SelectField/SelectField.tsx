import React, { ChangeEvent } from 'react';
import Message from '../../Message/Message';
import SelectField from './SelectField_Styled';

interface Option {
  value: string;
}

interface SelectFieldProps {
  /** The placeholder value for input fields */
  placeholder?: string;
  /** The required value to trigger nextStep */
  requiredValue?: string;
  /** The step action used to trigger the next step */
  nextStep?: () => void;
  /** Disables the component */
  disabled?: boolean;
  /** Allows parent to pass on onSelect method for external use */
  onSelect?: (e: Option) => void;
  options: Option[];
  value: string;

  /** for error message * */
  error?: string;
  errorPosition?: string;
}

// type SelectFieldState = {
//   value: string;
// }

/**
 * The TextField component is an accessible input field component.
 */
class SelectFieldComponent extends React.Component<SelectFieldProps> {
  static defaultProps = {
    placeholder: '',
    nextStep: null,
    disabled: false,
    onChange: null,
    value: '',
    error: null,
    errorPosition: 'bottom',
  };

  /**
   * References the input field dom element for accessibility requirements
   * @type {React.RefObject<any>}
   */
  inputRef = React.createRef<HTMLSelectElement>();

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
  onSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    if (this.props.onSelect) {
      const optionData = this.props.options.filter(option => {
        return option.value === event.target.value;
      });
      this.props.onSelect(optionData[0]);
    }
  };

  render() {
    const { options, value, error, errorPosition } = this.props;
    return (
      <Message error={error} errorPosition={errorPosition}>
        <SelectField
          ref={this.inputRef}
          value={value}
          onChange={this.onSelect}
          onClick={this.onFocus}
        >
          {options.map((option, i) => {
            return (
              <option value={option.value} key={`select_field_${option.value}_${i + 1}`}>
                {option.value}
              </option>
            );
          })}
        </SelectField>
      </Message>
    );
  }
}

export default SelectFieldComponent;
