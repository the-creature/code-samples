import React, { FC, useContext } from 'react';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import {
  TopPanel,
  TopPanelCustomerName,
  TopPanelRegionLanguage,
  TopPanelCustomerActions,
} from './TopPanel_Styled';

interface TopPanelProps {
  customerActionsLabel: string;
  topPanelLabel: string;
  language: string;
  name: string;
}

const TopPanelComponent: FC<TopPanelProps> = React.memo(
  ({ customerActionsLabel, topPanelLabel, language, name }) => {
    return (
      <TopPanel id="TopPanel" aria-label={topPanelLabel} role="group">
        <TopPanelCustomerName>{name}</TopPanelCustomerName>
        <TopPanelRegionLanguage>{language}</TopPanelRegionLanguage>
        <TopPanelCustomerActions title={`${customerActionsLabel}`}>
          <span>...</span>
        </TopPanelCustomerActions>
      </TopPanel>
    );
  }
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        setup: {
          accessibilityLabels: { customerActionsLabel, topPanelLabel },
        },
        customer: { name, language },
      },
    },
  } = workflowData;

  return {
    customerActionsLabel,
    topPanelLabel,
    language,
    name,
  };
};

export default connect(
  TopPanelComponent,
  selector
);
