import React, { FC, useContext } from 'react';
import Collapsible from '../../../shared-components/Collapsible/Collapsible';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowActions } from '../../../pages/Workflow';
import { WorkflowDataType, WorkflowEvent } from '../../../redux/modules/workflow';
import {
  Products,
  ProductEntry,
  DetailsListItem,
  DetailLeftInfo,
  DetailLeftInfoProductName,
  DetailLeftInfoProductSerial,
  ProductBlueMore,
} from './Products_Styled';

interface ProductProps {
  actionsLabel: string;
  productsLabel: string;
  labelTitle: string;
  labelProductDetails: string;
  productItems: ProductItemType[];
  trigger: (data: WorkflowEvent) => void;
}

interface ProductItemType {
  $: {
    img: string;
  };
  name: string;
  serial: string;
}

/**
 * A CaseView component.
 */
const ProductsComponent: FC<ProductProps> = React.memo(
  ({ actionsLabel, productsLabel, labelTitle, labelProductDetails, productItems, trigger }) => {
    const listItems = productItems.map((item: ProductItemType, i: number) => (
      <ProductEntry key={i}>
        <DetailsListItem
          role="listitem"
          id={`productsListItem${i}`}
          tabIndex={0}
          aria-label={item.name}
        >
          <img src={require(`../../../static/images/${item.$.img}`)} aria-hidden="true" />
          <DetailLeftInfo>
            <DetailLeftInfoProductName>{item.name}</DetailLeftInfoProductName>
            <DetailLeftInfoProductSerial>
              {item.serial}
              <button
                id={`ProductsListItemInfo${i}`}
                aria-label={labelProductDetails}
                onClick={() => {
                  trigger({
                    name: `Product_Details_Question_Ball${i}`,
                    type: 'click',
                  });
                }}
              >
                i
              </button>
            </DetailLeftInfoProductSerial>
          </DetailLeftInfo>

          <ProductBlueMore aria-label={`${actionsLabel} (${item.name})`}>
            <span>…</span>
          </ProductBlueMore>
        </DetailsListItem>
      </ProductEntry>
    ));

    return (
      <Products id="CaseViewProducts">
        <div>
          <Collapsible
            title={`${labelTitle} (${listItems.length})`}
            onOpen={() =>
              trigger({
                name: `productAccordionOpen`,
                type: 'click',
              })
            }
            onClose={() =>
              trigger({
                name: `productAccordionClose`,
                type: 'click',
              })
            }
          >
            <div>
              <div aria-label={productsLabel} role="list" tabIndex={0}>
                {listItems}
              </div>
            </div>
          </Collapsible>
        </div>
      </Products>
    );
  }
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        setup: {
          accessibilityLabels: { actionsLabel, productsLabel },
        },
        products: { labelTitle, labelProductDetails, product },
      },
    },
  } = workflowData as WorkflowDataType;
  const { trigger } = actions as WorkflowActions;

  return {
    actionsLabel,
    productsLabel,
    labelTitle,
    labelProductDetails,
    productItems: product,
    trigger,
  };
};

export default connect(
  ProductsComponent,
  selector
);
