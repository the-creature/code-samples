import React, { ChangeEvent } from 'react';
import get from 'lodash.get';
import Message from '../../Message/Message';

interface Option {
  $?: {
    defaultValue: string;
  };
  label?: string;
  value: string;
  children?: {
    value: string | string[];
  };
}

interface SelectFieldNestedProps {
  /** The placeholder value for input fields */
  placeholder?: string;
  /** The required value to trigger nextStep */
  requiredValue?: string;
  /** The step action used to trigger the next step */
  nextStep?: () => void;
  /** Disables the component */
  disabled?: boolean;
  /** Allows parent to pass on onSelect method for external use */
  onSelect?: (data: string) => void;
  options: Option[];
  value: string;
  id?: string;

  /** for error message * */
  error?: string;
  errorPosition?: string;
}

interface SelectFieldNestedState {
  value: string;
}

/**
 * The SelectedFieldNested component is an accessible input field component.
 */
class SelectFieldNestedComponent extends React.Component<
  SelectFieldNestedProps,
  SelectFieldNestedState
> {
  static defaultProps = {
    placeholder: '',
    nextStep: null,
    disabled: false,
    onSelect: null,
    error: null,
    errorPosition: 'bottom',
  };

  state = {
    value: '',
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
      this.props.onSelect(event.target.value);
    }
  };

  /**
   * Render nested options. Note that only one nested layer can be added to
   * to the select option menu. This is based on the html5 standards.
   * @param option - Can be an array or a single object for the option's value
   */
  renderNestedOptions = (option: string | string[]) => {
    if (Array.isArray(option)) {
      return option.map((value, j) => (
        <option value={value} key={`select_field_nested_child_${value}_${j + 1}`}>
          {value}
        </option>
      ));
    }
    return (
      <option value={option} key={`select_field_nested_child_${option}_0`}>
        {option}
      </option>
    );
  };

  render() {
    const { id, value, options, error, errorPosition } = this.props;
    const defaultOption = options.find(item => get(item, '$.defaultValue') === 'true');
    let defaultValue = '';
    if (defaultOption) {
      defaultValue = get(defaultOption, 'value');
    }
    return (
      <Message
        id={id}
        ariaConfig={{ 'aria-haspopup': 'listbox' }}
        error={error}
        errorPosition={errorPosition}
      >
        <select
          value={value || defaultValue}
          ref={this.inputRef}
          onChange={this.onSelect}
          onClick={this.onFocus}
        >
          {options.map((option, i) => {
            if (option.value) {
              // const selected = option.$ ? !!option.$.defaultValue : false;
              return (
                <option value={option.value} key={`select_field_nested_${option.value}_${i + 1}`}>
                  {option.value}
                </option>
              );
            }
            return (
              <optgroup
                key={`select_field_nested_group_${option.label}_${i + 1}`}
                label={option.label}
              >
                {this.renderNestedOptions(get(option, 'children.value') || [])}
              </optgroup>
            );
          })}
        </select>
      </Message>
    );
  }
}

export default SelectFieldNestedComponent;
