import React, { FC, useContext } from 'react';
import Collapsible from '../../../shared-components/Collapsible/Collapsible';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowEvent } from '../../../redux/modules/workflow';
import { CustomerDetails, DetailsListItem, CustomerDetailsList } from './CustomerDetails_Styled';

interface CustomerDetailsProps {
  customerDetailsLabel: string;
  labelTitle: string;
  labelName: string;
  labelAppleId: string;
  labelLanguage: string;
  labelPhone: string;
  labelEmail: string;
  labelAddress: string;
  name: string;
  appleId: string;
  language: string;
  phone: string;
  email: string;
  address: string;
  trigger: (data: WorkflowEvent) => void;
}

/**
 * A CaseView component.
 */
const CustomerDetailsComponent: FC<CustomerDetailsProps> = React.memo(
  ({
    customerDetailsLabel,
    labelTitle,
    labelName,
    labelAppleId,
    labelLanguage,
    labelPhone,
    labelEmail,
    labelAddress,
    name,
    appleId,
    language,
    phone,
    email,
    address,
    trigger,
  }) => (
    <CustomerDetails id="CaseViewCustomerDetails">
      <Collapsible
        title={labelTitle}
        onOpen={() =>
          trigger({
            name: `CustomerDetailsAccordionOpen`,
            type: 'click',
          })
        }
        onClose={() =>
          trigger({
            name: `CustomerDetailsAccordionClose`,
            type: 'click',
          })
        }
      >
        <div>
          <CustomerDetailsList aria-label={customerDetailsLabel} role="list" tabIndex={0}>
            <DetailsListItem role="listitem">
              <label>{labelName}</label>
              <p>{name}</p>
            </DetailsListItem>
            <DetailsListItem
              role="listitem"
              id="Customer_Details_Apple_ID"
              onClick={() => {
                trigger({
                  name: 'Customer_Details_Apple_ID',
                  type: 'click',
                });
              }}
            >
              <label>{labelAppleId}</label>
              <p>{appleId}</p>
            </DetailsListItem>
            <DetailsListItem role="listitem">
              <label>{labelLanguage}</label>
              <p>{language}</p>
            </DetailsListItem>
            <DetailsListItem role="listitem">
              <label>{labelPhone}</label>
              <p>{phone}</p>
            </DetailsListItem>
            <DetailsListItem role="listitem">
              <label>{labelEmail}</label>
              <p>{email}</p>
            </DetailsListItem>
            <DetailsListItem role="listitem">
              <label>{labelAddress}</label>
              <p>{address}</p>
            </DetailsListItem>
          </CustomerDetailsList>
        </div>
      </Collapsible>
    </CustomerDetails>
  )
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        setup: {
          accessibilityLabels: { customerDetailsLabel },
        },
        customer: {
          labelTitle,
          labelName,
          labelAppleId,
          labelLanguage,
          labelPhone,
          labelEmail,
          labelAddress,
          name,
          appleId,
          language,
          phone,
          email,
          address,
        },
      },
    },
  } = workflowData;
  const { trigger } = actions;

  return {
    customerDetailsLabel,
    labelTitle,
    labelName,
    labelAppleId,
    labelLanguage,
    labelPhone,
    labelEmail,
    labelAddress,
    name,
    appleId,
    language,
    phone,
    email,
    address,
    trigger,
  };
};

export default connect(
  CustomerDetailsComponent,
  selector
);
