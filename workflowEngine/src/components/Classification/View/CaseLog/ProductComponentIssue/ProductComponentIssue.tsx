import React, { MouseEvent, useContext } from 'react';
import get from 'lodash.get';
import has from 'lodash.has';
import isEmpty from 'lodash.isempty';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import Search from '../../../../../shared-components/Search/Search';
import ProductItem from './ProductItem/ProductItem';
import ComponentItem from './ComponentItem/ComponentItem';
import IssueItem from './IssueItem/IssueItem';
import { Label } from '../../../Classification_Styled';
import {
  ComponentType,
  IssueType,
  ProductType,
  WorkflowEvent,
} from '../../../../../redux/modules/workflow';
import {
  ProductListSection,
  ProductSection,
  ProductTitleSection,
  ComponentSectionEmpty,
  ComponentSection,
  ComponentHeaderSection,
  ComponentTitleSection,
  ComponentMainSection,
  ComponentPanel,
} from './ProductComponentIssue_Styled';

interface ProductComponentIssueProps {
  activeComponentIndex: number;
  activeIssueIndex: number;
  activeProductIndex: number;
  affectedProductGallery: string;
  affectedProductLabel: string;
  enterSearchResults: string;
  focus: string;
  showFilterAffectedProductButton: string;
  hideFilterAffectedProductButton: string;
  showFilterComponentIssueButton: string;
  hideFilterComponentIssueButton: string;
  componentIssueSectionLabel: string;
  componentSectionLabel: string;
  issueSectionLabel: string;
  components: ComponentType[];
  issues: IssueType[];
  errorIssue: string | undefined;
  errorProduct: string | undefined;
  hasActiveComponentIndex: boolean;
  hasIssueError: boolean;
  hasProductError: boolean;
  label: string;
  placeholder: string;
  productItems: ProductType[];
  componentsAndIssues: ComponentAndIssuesType;
  trigger: (data: WorkflowEvent) => void;
  updateComponent: (data?: ComponentType) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
  updateIssue: (data?: IssueType) => void;
  updateProduct: (data?: ProductType) => void;
}

interface ComponentAndIssuesType {
  defaultText: string;
  label: string;
  search: {
    placeholder: string;
    errorMessage: string;
  };
}

interface IssueWithComponentNameType extends IssueType {
  component: string;
}

class ProductComponentIssue extends React.Component<ProductComponentIssueProps> {
  componentListRef = React.createRef<HTMLLIElement>();
  issueListRef = React.createRef<HTMLLIElement>();

  /**
   * This event listener is used to update the state of the affected product buttons
   * @param e - default object argument from event handling methods
   * @param index - used to trigger the active state for an affected product
   * @param data - product data
   */
  handleProductClick = (_e: MouseEvent | null, index: number, data: ProductType) => {
    const { components = false } = data;
    const { trigger, updateField, updateProduct, updateComponent, updateIssue } = this.props;
    if (components) {
      const { component } = components;
      // If the product has components, update the state with components
      if (component.length > 0) {
        updateField({
          name: 'components',
          value: component,
        });
      }
    } else {
      // Reset the components state
      updateField({
        name: 'components',
        value: [],
      });
    }
    updateField({
      name: 'issues',
      value: [],
    });
    updateField({
      name: 'activeProductIndex',
      value: index,
    });
    updateProduct(data);
    updateComponent();
    updateIssue();
    trigger({
      name: 'product',
      type: 'click',
    });
  };

  // handle product selection from search options
  handleProductSearchSelection = (data: ProductType) => {
    const { components = false } = data;
    const {
      productItems,
      trigger,
      updateField,
      updateProduct,
      updateComponent,
      updateIssue,
    } = this.props;
    if (components) {
      const { component } = components;
      // If the product has components, update the state with components
      if (component.length > 0) {
        updateField({
          name: 'components',
          value: component,
        });
      }
    } else {
      // Reset the components state
      updateField({
        name: 'components',
        value: [],
      });
    }
    updateField({
      name: 'issues',
      value: [],
    });
    updateField({
      name: 'activeProductIndex',
      value: productItems.findIndex((item: ProductType) => item.name === data.name),
    });
    updateProduct(data);
    updateComponent();
    updateIssue();
    trigger({
      name: 'product',
      type: 'click',
    });
  };

  handleComponentClick = (_e: MouseEvent | null, index: number, data: ComponentType) => {
    const {
      issues: { issue },
    } = data;
    const { activeComponentIndex, trigger, updateField, updateComponent, updateIssue } = this.props;

    updateField({
      name: 'issues',
      value: issue,
    });
    updateField({
      name: 'activeComponentIndex',
      value: index,
    });
    if (activeComponentIndex !== index) {
      // switch to different component, reset issue index to 0
      updateField({
        name: 'activeIssueIndex',
        value: -1,
      });
    }
    updateComponent(data);
    updateIssue();
    trigger({
      name: 'component',
      type: 'click',
    });
  };

  handleIssueClick = (_e: MouseEvent | null, index: number, data: IssueType) => {
    const { updateField, updateIssue, trigger } = this.props;

    updateField({
      name: 'activeIssueIndex',
      value: index,
    });
    updateIssue(data);
    trigger({
      name: 'issue',
      type: 'click',
    });
  };

  handleIssueSearchSelection = (data: IssueWithComponentNameType) => {
    const { components, updateField, updateComponent, updateIssue, trigger } = this.props;
    const componentIndex = components.findIndex(
      (item: ComponentType) => item.name === data.component
    );
    if (componentIndex >= 0) {
      const issues = get(components[componentIndex], 'issues.issue', []);
      const issueIndex = issues.findIndex((item: IssueType) => item.name === data.name);
      if (issueIndex >= 0) {
        updateField({
          name: 'activeComponentIndex',
          value: componentIndex,
        });
        updateComponent(components[componentIndex]);
        updateField({
          name: 'issues',
          value: issues,
        });
        updateField({
          name: 'activeIssueIndex',
          value: issueIndex,
        });
        updateIssue(issues[issueIndex]);
        trigger({
          name: 'issue',
          type: 'click',
        });
      }
    }
  };

  handleKeyDown = (e: KeyboardEvent, section: string, index: number) => {
    e.preventDefault();

    const { activeComponentIndex, components, issues, productItems, updateField } = this.props;
    // First and last elements in a section
    let elements: ProductType[] | ComponentType[] | IssueType[] = [];
    switch (section) {
      case 'products':
        elements = productItems;
        break;
      case 'components':
        elements = components;
        break;
      case 'issuues':
        elements = issues;
        break;
    }
    const isFirst = index === 0;
    const isLast = index + 1 === elements.length;

    const userIn = {
      products: section === 'products',
      components: section === 'components',
      issues: section === 'issues',
      searchResults: section === 'search-results',
      lists: section === 'components' || section === 'issues' || section === 'search-results',
      caseOptions: section === 'case-options',
    };

    const pressed = {
      forward: userIn.products
        ? e.key === 'ArrowRight' || e.key === 'ArrowDown'
        : e.key === 'ArrowDown',
      backward: userIn.products
        ? e.key === 'ArrowLeft' || e.key === 'ArrowUp'
        : e.key === 'ArrowUp',
      right: e.key === 'ArrowRight',
      left: e.key === 'ArrowLeft',
      tab: e.key === 'Tab',
      withShift: e.shiftKey,
      selectKeys: e.key === ' ' || e.key === 'Enter',
    };

    const moveBy = (numDirection: number) => {
      switch (section) {
        case 'products':
          this.handleProductClick(null, index + numDirection, productItems[index + numDirection]);
          break;
        case 'components':
          this.handleComponentClick(null, index + numDirection, components[index + numDirection]);
          break;
        case 'issues':
          this.handleIssueClick(null, index + numDirection, issues[index + numDirection]);
          break;
      }
    };

    const focusOnComponentLi = () => {
      if (components.length > 0) {
        updateField({
          name: 'focus',
          value: `classification_component_${
            activeComponentIndex !== null ? activeComponentIndex + 1 : 1
          }`,
        });
      }
    };

    const focusOnIssueLi = () => {
      if (issues.length > 0) {
        updateField({
          name: 'focus',
          value: 'classification_issue_1',
        });
      } else {
        updateField({
          name: 'focus',
          value: 'continue-to-troubleshoot',
        });
      }
    };

    const focusOnSection = (focusSection: string) => {};

    if (pressed.selectKeys && !userIn.caseOptions) {
      switch (section) {
        case 'products':
          this.handleProductClick(null, index, productItems[index]);
          break;
        case 'components':
          this.handleComponentClick(null, index, components[index]);
          break;
        case 'issues':
          this.handleIssueClick(null, index, issues[index]);
          break;
      }
    }

    // Right/left nav between component/issue lists
    if (userIn.lists) {
      if (userIn.components && pressed.right) focusOnIssueLi();
      else if (userIn.issues && pressed.left) focusOnComponentLi();
    }

    // Forward/backward nav among items
    if (pressed.forward) isLast ? null : moveBy(1);
    else if (pressed.backward) isFirst ? null : moveBy(-1);
    // Tab/shift+tab key nav
    else if (pressed.tab) {
      if (userIn.caseOptions) {
        // setTimeout(() => document.getElementById('case-options-button').focus(), 10);
      }

      if (pressed.withShift) {
        if (userIn.components || userIn.issues) focusOnSection('component-issue');
        else if (userIn.products) focusOnSection('affected-product');
        else if (userIn.searchResults) {
          // const productSearchInput = document.getElementById('affected-product-input');
          // productSearchInput.focus();
        }
      } else {
        if (userIn.lists) {
          if (userIn.components) focusOnIssueLi();
          else if (userIn.issues) {
            updateField({
              name: 'focus',
              value: 'continue-to-troubleshoot',
            });
          } /* else if (userIn.searchResults) {
          }*/
        } else if (userIn.products) {
          if (components.length > 0) {
            updateField({
              name: 'focus',
              value: 'component-issue-search',
            });
          } else {
            updateField({
              name: 'focus',
              value: 'continue-to-troubleshoot',
            });
          }
        }
      }
    }
  };

  /**
   * Renders the affected product buttons as a list
   * @param data - product data
   */
  renderProductList = (data: ProductType[]) => {
    const { activeProductIndex } = this.props;
    // @ts-ignore
    return data.map((product, i) => {
      const isActive = activeProductIndex === i;
      const {
        $: { img },
        name,
      } = product;
      const imagePath = require(`../../../../../static/${img}`);
      const tabIndex = isEmpty(activeProductIndex) ? 0 : isActive ? 0 : -1;
      return (
        <div
          id={`classification_product_${name.toLowerCase()}`.replace(' ', '_')}
          key={`product_list_${i + 1}`}
        >
          <ProductItem
            active={isActive}
            image={imagePath}
            name={name}
            tabIndex={tabIndex}
            // @ts-ignore
            onClick={e => this.handleProductClick(e, i, product)}
            // @ts-ignore
            onKeyDown={e => this.handleKeyDown(e, 'products', i)}
          />
        </div>
      );
    });
  };

  /**
   * Renders the component list
   * @param data - component list data
   */
  renderComponentList = (data: ComponentType[]) => {
    const { activeComponentIndex, activeIssueIndex, focus } = this.props;

    // @ts-ignore
    return data.map((component, i) => {
      let isActive: boolean | string = false;
      if (activeComponentIndex === i) {
        if (typeof activeIssueIndex === 'number') {
          isActive = 'dull';
        } else {
          isActive = true;
        }
      }
      const hasFocus = focus === `classification_component_${i + 1}`;
      const tabIndex = isActive || (!activeComponentIndex && i === 0) ? 0 : -1;

      return (
        <ComponentItem
          key={`component_list_${i + 1}`}
          id={`classification_component_${i + 1}`}
          active={isActive}
          hasFocus={hasFocus}
          name={component.name}
          tabIndex={tabIndex}
          // @ts-ignore
          onClick={e => this.handleComponentClick(e, i, component)}
          // @ts-ignore
          onKeyDown={e => this.handleKeyDown(e, 'components', i)}
        />
      );
    });
  };

  /**
   * Renders the issue list
   * @param data - issue list data
   */
  renderIssueList = (data: IssueType[]) => {
    const { activeIssueIndex, focus } = this.props;

    // @ts-ignore
    return data.map((issue, i) => {
      const hasFocus = focus === `classification_issue_${i + 1}`;
      const isActive = activeIssueIndex === i;
      const tabIndex = isActive || (activeIssueIndex < 0 && i === 0) ? 0 : -1;

      return (
        <IssueItem
          key={`issue_list_${i + 1}`}
          id={`classification_issue_${i + 1}`}
          active={isActive}
          hasFocus={hasFocus}
          name={issue.name}
          tabIndex={tabIndex}
          // @ts-ignore
          onClick={e => this.handleIssueClick(e, i, issue)}
          // @ts-ignore
          onKeyDown={e => this.handleKeyDown(e, 'issues', i)}
        />
      );
    });
  };

  /**
   * Renders the Component and Issues layout based on the active
   * affect product.
   */
  renderComponentAndIssueSection = ({ defaultText, search }: ComponentAndIssuesType) => {
    const {
      showFilterComponentIssueButton,
      hideFilterComponentIssueButton,
      componentIssueSectionLabel,
      componentSectionLabel,
      issueSectionLabel,
      activeComponentIndex,
      components,
      errorIssue,
      hasActiveComponentIndex,
      hasIssueError,
      issues,
      focus,
    } = this.props;

    const searchOptions =
      hasActiveComponentIndex && activeComponentIndex >= 0
        ? issues.map((item: IssueType) => ({
            ...item,
            component: components[activeComponentIndex].name,
          }))
        : components.reduce((allIssues: IssueWithComponentNameType[], comp: ComponentType) => {
            allIssues = [
              ...allIssues,
              ...get(comp, 'issues.issue', []).map((item: IssueType) => ({
                ...item,
                component: comp.name,
              })),
            ];
            return allIssues;
          }, []);

    if (components.length === 0) {
      return <ComponentSectionEmpty>{defaultText}</ComponentSectionEmpty>;
    }
    return (
      <React.Fragment>
        <ComponentHeaderSection>
          <ComponentTitleSection>
            <Label>Components and Issues</Label>
            <Search
              id="component-issue-search"
              hasFocus={focus === 'component-issue-search'}
              ariaLabelShow={showFilterComponentIssueButton}
              ariaLabelClose={hideFilterComponentIssueButton}
              hasError={hasIssueError}
              error={errorIssue}
              errorPosition="bottom"
              options={searchOptions}
              labelKey="name"
              placeholder={search.placeholder}
              onSelect={this.handleIssueSearchSelection}
            />
          </ComponentTitleSection>
        </ComponentHeaderSection>
        <ComponentMainSection aria-label={componentIssueSectionLabel} role="group">
          <ComponentPanel id="component-list">
            <ul aria-label={componentSectionLabel} role="tablist">
              {this.renderComponentList(components)}
            </ul>
          </ComponentPanel>
          <ComponentPanel id="issue-list">
            <ul aria-label={issueSectionLabel} role="tablist">
              {issues.length > 0 && this.renderIssueList(issues)}
            </ul>
          </ComponentPanel>
        </ComponentMainSection>
      </React.Fragment>
    );
  };

  render() {
    const {
      focus,
      errorProduct,
      hasProductError,
      label,
      affectedProductGallery,
      affectedProductLabel,
      enterSearchResults,
      showFilterAffectedProductButton,
      hideFilterAffectedProductButton,
      placeholder,
      productItems,
      componentsAndIssues,
    } = this.props;

    return (
      <React.Fragment>
        <ProductSection
          id="classification_affected_product_section"
          role="group"
          aria-label={affectedProductLabel}
        >
          <ProductTitleSection>
            <Label>{label}</Label>
            <Search
              id="affected-product-search"
              hasFocus={focus === 'affected-product-search'}
              ariaLabelShow={showFilterAffectedProductButton}
              ariaLabelSearch={enterSearchResults}
              ariaLabelClose={hideFilterAffectedProductButton}
              hasError={hasProductError}
              error={errorProduct}
              errorPosition="bottom"
              options={productItems}
              labelKey="name"
              placeholder={placeholder}
              onSelect={this.handleProductSearchSelection}
            />
          </ProductTitleSection>
          <ProductListSection
            role="radiogroup"
            id="classification_affected_product_list"
            aria-label={affectedProductGallery}
          >
            {this.renderProductList(productItems)}
          </ProductListSection>
        </ProductSection>
        <ComponentSection id="classification_components_issues_section">
          {this.renderComponentAndIssueSection(componentsAndIssues)}
        </ComponentSection>
      </React.Fragment>
    );
  }
}

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: {
            affectedProductGallery,
            affectedProductLabel,
            enterSearchResults,
            showFilterAffectedProductButton,
            hideFilterAffectedProductButton,
            showFilterComponentIssueButton,
            hideFilterComponentIssueButton,
            componentIssueSectionLabel,
            componentSectionLabel,
            issueSectionLabel,
          },
        },
        data: { affectedProducts, componentsAndIssues },
      },
    },
    context,
    context: { errors, focus },
  } = workflowData;
  const { trigger, updateField, updateProduct, updateComponent, updateIssue } = actions;

  return {
    focus,
    activeComponentIndex: get(context, 'activeComponentIndex'),
    activeIssueIndex: get(context, 'activeIssueIndex'),
    activeProductIndex: get(context, 'activeProductIndex'),
    affectedProductGallery,
    affectedProductLabel,
    enterSearchResults,
    showFilterAffectedProductButton,
    hideFilterAffectedProductButton,
    showFilterComponentIssueButton,
    hideFilterComponentIssueButton,
    componentIssueSectionLabel,
    componentSectionLabel,
    issueSectionLabel,
    components: get(context, 'components', []),
    issues: get(context, 'issues', []),
    errorIssue: get(errors, 'issue'),
    errorProduct: get(errors, 'product'),
    hasActiveComponentIndex: has(context, 'activeComponentIndex'),
    hasIssueError: get(errors, 'issue'),
    hasProductError: has(errors, 'product'),
    label: affectedProducts.label,
    placeholder: affectedProducts.search.placeholder,
    productItems: affectedProducts.product,
    componentsAndIssues,
    trigger,
    updateComponent,
    updateField,
    updateIssue,
    updateProduct,
  };
};

export default connect(
  React.memo(ProductComponentIssue),
  selector
);
