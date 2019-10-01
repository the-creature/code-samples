import React, { ChangeEvent, MouseEvent } from 'react';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import Message from '../Message/Message';
const searchIcon = require('../../static/images/search-gray.png');

import {
  SearchContainer,
  SearchControl,
  SearchResults,
  SearchButton,
  SearchInput,
} from './Search_Styled';

interface SearchProps {
  id: string;
  ariaLabelShow: string;
  ariaLabelSearch: string;
  ariaLabelClose: string;
  value: string;
  placeholder?: string;
  hasFocus?: boolean;
  nextStep?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
  onClose?: () => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  options: any[];
  labelKey: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onSelect?: (data: any) => void;
  hasError?: boolean;
  /** for error message * */
  error?: string;
  errorPosition?: string;
}

interface SearchState {
  open: boolean;
  value: string;
}

/**
 * The Search component has two states - Icon and Input Field. The user
 * clicks on the search icon to open an input field. This input field
 * will be used to search an array of strings which will popup below
 * the field.
 */

class Search extends React.Component<SearchProps, SearchState> {
  static defaultProps = {
    ariaLabelShow: '',
    ariaLabelSearch: '',
    ariaLabelClose: '',
    value: undefined,
    placeholder: '',
    nextStep: null,
    disabled: false,
    showIcon: true,
    labelKey: 'name',
    errorPosition: 'bottom',
    options: [],
    hasFocus: false,
  };

  state = {
    value: this.props.value || '',
    open: false,
  };

  componentDidUpdate(prevProps: SearchProps, prevState: SearchState) {
    // Forces focus on the appropriate field and button for accessibility requirements
    if (prevState.open !== this.state.open) {
      if (this.state.open && this.inputRef !== null && this.inputRef.current !== null) {
        this.inputRef.current.focus();
      } else if (
        this.props.showIcon &&
        this.searchIconRef !== null &&
        this.searchIconRef.current !== null
      ) {
        this.searchIconRef.current.focus();
      }
    }
    if (prevProps.hasFocus !== this.props.hasFocus) {
      if (
        this.props.hasFocus &&
        this.props.showIcon &&
        this.searchIconRef !== null &&
        this.searchIconRef.current !== null
      ) {
        this.searchIconRef.current.focus();
      }
    }
  }

  /**
   * Reference to the search icon for accessibility requirements
   * @type {React.RefObject<any>}
   */
  searchIconRef = React.createRef<HTMLButtonElement>();

  /**
   * Reference to the input field for accessibility requirements
   * @type {React.RefObject<any>}
   */
  inputRef = React.createRef<HTMLInputElement>();

  /**
   * Handles the view state for the Search component
   * @param event - default object argument from event handling methods
   */
  handleClick = (event: MouseEvent) => {
    event.preventDefault();
    const { onClose, showIcon } = this.props;
    if (showIcon) {
      this.setState({
        open: !this.state.open,
      });
    } else if (onClose) {
      onClose();
    }
  };

  /**
   * Handles the input field's value
   * @param event - default object argument from event handling methods
   */
  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!this.props.disabled) {
      const { value } = event.target;
      this.setState({
        value,
      });
    }
  };
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onOptionSelect = (selectedOption: any) => (event: MouseEvent) => {
    event.preventDefault();
    const { onSelect } = this.props;
    if (onSelect) {
      onSelect(selectedOption);
    }
    this.setState({
      value: '',
      open: false,
    });
  };

  getHighlightedText = (text: string, highlight: string) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {}}
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  render() {
    const {
      id,
      ariaLabelShow,
      ariaLabelSearch,
      ariaLabelClose,
      placeholder,
      disabled,
      showIcon,
      options,
      labelKey,
      hasError,
      error,
      errorPosition,
      ...rest
    } = this.props;
    const { value, open } = this.state;
    let filteredOptions = [];

    if (!isEmpty(value)) {
      const searchValue = value.toLowerCase();
      filteredOptions = options.filter(item =>
        get(item, labelKey, '')
          .toLowerCase()
          .includes(searchValue)
      );
    }

    if (!open && showIcon && !hasError) {
      return (
        <SearchContainer className="SearchComponent" {...rest}>
          <SearchButton
            id={id}
            title={ariaLabelShow}
            onClick={this.handleClick}
            ref={this.searchIconRef}
            disabled={disabled}
          >
            <img src={searchIcon} alt="Search icon" aria-hidden="true" />
          </SearchButton>
        </SearchContainer>
      );
    }
    return (
      <SearchContainer>
        <Message error={error} errorPosition={errorPosition}>
          <SearchControl className="SearchComponent" {...rest}>
            <SearchInput
              aria-label={ariaLabelSearch}
              value={value}
              placeholder={placeholder}
              onChange={this.onChange}
              ref={this.inputRef}
            />
            <SearchButton aria-label={ariaLabelClose} onClick={this.handleClick}>
              x
            </SearchButton>
          </SearchControl>
        </Message>
        {filteredOptions.length > 0 && (
          <SearchResults>
            {filteredOptions.map((item, index) => {
              const optionText = get(item, labelKey);
              return (
                <li
                  key={`search_option_${index}`}
                  tabIndex={index === 0 ? index : -1}
                  aria-label={optionText}
                  title={optionText}
                  role="button"
                  onClick={this.onOptionSelect(item)}
                >
                  {this.getHighlightedText(optionText, value)}
                </li>
              );
            })}
          </SearchResults>
        )}
      </SearchContainer>
    );
  }
}

export default Search;
