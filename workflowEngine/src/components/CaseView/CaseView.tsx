import React, { FC, useContext } from 'react';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import { CaseWrapper, ScrollContainer } from './CaseView_Styled';
import CaseViewHeader from './Header/CaseViewHeader';
import CustomerDetails from './CustomerDetails/CustomerDetails';
import Products from './Products/Products';
import History from './History/History';

interface CaseViewProps {
  detailsLabel: string;
}

const CaseViewComponent: FC<CaseViewProps> = ({ detailsLabel }) => (
  <CaseWrapper id="CaseViewWrapper">
    <CaseViewHeader />
    <ScrollContainer aria-label={detailsLabel} role="group">
      <CustomerDetails />
      <Products />
      <History />
    </ScrollContainer>
  </CaseWrapper>
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        setup: {
          accessibilityLabels: { detailsLabel },
        },
      },
    },
  } = workflowData;

  return {
    detailsLabel,
  };
};

export default connect(
  React.memo(CaseViewComponent),
  selector
);
