import React, { FC, useContext, useState } from 'react';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import ExpandLink from '../../../../../shared-components/ExpandLink/ExpandLink';
import Search from '../../../../../shared-components/Search/Search';
import { Label, Row } from '../../../Classification_Styled';
import {
  LinkSerialTop,
  LinkSerialBottom,
  LinkSerialButton,
  HintLabel,
} from './LinkSerialExpand_Styled';

interface LinkSerialExpandProps {
  showFilterProductGalleryButton: string;
  closeAddProduct: string;
  closeButton: string;
  addProduct: string;
  getSerial: string;
  label: string;
  labelExpand: string;
  labelHint: string;
  placeholder: string;
  results: string;
}

/**
 * Link Serial component used to display product information
 */
const LinkSerialComponent: FC<LinkSerialExpandProps> = React.memo(
  ({
    showFilterProductGalleryButton,
    closeAddProduct,
    closeButton,
    addProduct,
    getSerial,
    label,
    labelExpand,
    labelHint,
    placeholder,
    results,
  }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchOpen = () => setSearchOpen(true);
    const handleSearchClose = () => setSearchOpen(false);

    return (
      <ExpandLink text={labelExpand}>
        <Row>
          <LinkSerialTop>
            <Label>
              {label}
              <HintLabel>{labelHint}</HintLabel>
            </Label>
            <Search
              id="link-serial-search"
              ariaLabelShow={showFilterProductGalleryButton}
              ariaLabelClose={closeAddProduct}
              disabled
            />
          </LinkSerialTop>
        </Row>
        <Row>
          <LinkSerialBottom>
            <div>
              <span>{results}</span>
              <LinkSerialButton
                // @ts-ignore
                onClick={handleSearchOpen}
              >
                {addProduct}
              </LinkSerialButton>
            </div>
            {searchOpen && (
              <>
                <Search
                  id="link-serial-search"
                  ariaLabelClose={closeButton}
                  placeholder={placeholder}
                  showIcon={false}
                  onClose={handleSearchClose}
                />
                <div>
                  <LinkSerialButton open>{getSerial}</LinkSerialButton>
                </div>
              </>
            )}
          </LinkSerialBottom>
        </Row>
      </ExpandLink>
    );
  }
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { showFilterProductGalleryButton, closeAddProduct, closeButton },
        },
        data: {
          linkSerial: {
            expand,
            label,
            labelHint,
            productResults: { addProduct, getSerial, placeholder, results },
          },
        },
      },
    },
  } = workflowData;

  return {
    showFilterProductGalleryButton,
    closeAddProduct,
    closeButton,
    addProduct,
    getSerial,
    label,
    labelExpand: expand.label,
    labelHint,
    placeholder,
    results,
  };
};

export default connect(
  LinkSerialComponent,
  selector
);
