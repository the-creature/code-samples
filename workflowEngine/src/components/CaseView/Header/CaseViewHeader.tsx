import React, { FC, useContext } from 'react';
import moment from 'moment';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowDataType } from '../../../redux/modules/workflow';
import {
  CaseViewHeader,
  LeftHeader,
  LeftHeaderBurger,
  LeftHeaderRefresh,
  CaseViewCustomerActions,
} from './CaseViewHeader_Styled';

interface CaseViewHeaderProps {
  name: string;
  time: string;
  actionsLabel: string;
  showFilterLabel: string;
}

/**
 * A CaseView component.
 */
const CaseViewHeaderComponent: FC<CaseViewHeaderProps> = React.memo(
  ({ name, time, actionsLabel, showFilterLabel }) => (
    <CaseViewHeader>
      <LeftHeader>
        <p>{name}</p>
        <CaseViewCustomerActions title={`${actionsLabel} (${name})`}>
          <span>…</span>
        </CaseViewCustomerActions>
        <LeftHeaderBurger title={showFilterLabel}>
          ☰<span>|</span>
        </LeftHeaderBurger>
        <LeftHeaderRefresh title={time}>↻</LeftHeaderRefresh>
      </LeftHeader>
    </CaseViewHeader>
  )
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        header: { name },
        setup: {
          accessibilityLabels: { actionsLabel, showFilterLabel },
        },
      },
    },
  } = workflowData as WorkflowDataType;

  return {
    name,
    time: moment().format('ddd YYYY-MM-DD H:mm a'),
    actionsLabel,
    showFilterLabel,
  };
};

export default connect(
  CaseViewHeaderComponent,
  selector
);
