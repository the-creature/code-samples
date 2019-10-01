import React, { FC, useContext } from 'react';
import get from 'lodash.get';
import orderBy from 'lodash.orderby';
import WorkflowContext, {
  connect,
} from '../../../shared-components/WorkflowContext/WorkflowContext';
import { WorkflowActions } from '../../../pages/Workflow';
import { WorkflowDataType, WorkflowEvent } from '../../../redux/modules/workflow';
import SelectField from '../../../shared-components/Fields/SelectField/SelectField';
import {
  History,
  LeftSectionHistoryTitle,
  LeftSectionHistory,
  LeftSectionHistoryFilterSection,
  LeftSectionHistoryFilterLeftRight,
  LeftProductSectionHistory,
  LeftInfo,
  LeftInfoProductName,
  LeftInfoProductSerial,
  LeftInfoProductDateInfo,
  LeftInfoProductBlueMore,
} from './History_Styled';

interface HistoryProps {
  labelTitle: string;
  actionsLabel: string;
  recentCasesLabel: string;
  sortElements: HistoryEventWithValueType[];
  historyItems: HistoryItemType[];
  trigger: (data: WorkflowEvent) => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
}

interface HistoryItemType {
  $: {
    img: string;
  };
  title: string;
  details: string;
  dateinfo: string;
  createdDate: string;
  modifiedDate: string;
}

interface HistoryEventType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  options: {
    option: HistoryEventOption[];
  };
}

interface HistoryEventWithValueType extends HistoryEventType {
  value: string;
}

interface HistoryEventOption {
  $?: {
    correct: string;
  };
  value: string;
}

/**
 * A CaseView component.
 */
const HistoryComponent: FC<HistoryProps> = React.memo(
  ({
    labelTitle,
    actionsLabel,
    recentCasesLabel,
    sortElements,
    historyItems,
    trigger,
    updateField,
  }) => {
    // @ts-ignore
    const HistoryItems = historyItems.map((item: HistoryItemType, i: number) => (
      <LeftProductSectionHistory
        role="listitem"
        id={`caseviewhistory${i}`}
        tabIndex={0}
        key={i}
        onClick={() => {
          trigger({
            name: `caseviewhistory${i}`,
            type: 'click',
          });
        }}
      >
        <LeftInfoProductDateInfo>{item.dateinfo}</LeftInfoProductDateInfo>
        <LeftInfo>
          <img src={require(`../../../static/images/${item.$.img}`)} aria-hidden="true" />
          <LeftInfoProductName>{item.title}</LeftInfoProductName>
          <LeftInfoProductSerial>{item.details}</LeftInfoProductSerial>
        </LeftInfo>

        <LeftInfoProductBlueMore title={`${actionsLabel} (${item.title})`}>
          <span>…</span>
        </LeftInfoProductBlueMore>
      </LeftProductSectionHistory>
    ));

    return (
      <History id="CaseViewHistory">
        <LeftSectionHistory>
          <LeftSectionHistoryTitle>{labelTitle}</LeftSectionHistoryTitle>
          <br />

          <LeftSectionHistoryFilterSection>
            {sortElements.map((item: HistoryEventWithValueType, index: number) => (
              <LeftSectionHistoryFilterLeftRight
                key={`history-filter-${get(item, '$.name')}`}
                id={`HistorySort${index + 1}`}
              >
                <label>{get(item, 'label')}:</label>
                <SelectField
                  onSelect={data => {
                    updateField({
                      name: get(item, '$.name'),
                      value: data.value,
                    });

                    trigger({
                      name: get(item, '$.name'),
                      type: 'change',
                    });
                  }}
                  options={item.options.option}
                  value={get(item, 'value')}
                />
              </LeftSectionHistoryFilterLeftRight>
            ))}
          </LeftSectionHistoryFilterSection>

          <div id="history-section-items" aria-label={recentCasesLabel} role="list">
            {HistoryItems}
          </div>
        </LeftSectionHistory>
      </History>
    );
  }
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      caseView: {
        setup: {
          accessibilityLabels: { actionsLabel, recentCasesLabel },
        },
        history: { labelTitle, element, historyItem },
      },
    },
    context,
    context: { caseViewHistorySortBy = 'Modified Date', caseViewHistorySortDir = 'Descending' },
  } = workflowData as WorkflowDataType;
  const { trigger, updateField } = actions as WorkflowActions;
  const historyItems = orderBy(
    historyItem,
    [caseViewHistorySortBy === 'Modified Date' ? 'modifiedDate' : 'createdDate'],
    [caseViewHistorySortDir === 'Descending' ? 'desc' : 'asc']
  );
  const sortElements = element.map((item: HistoryEventType) => ({
    ...item,
    value: get(context, get(item, '$.name')),
  }));

  return {
    labelTitle,
    actionsLabel,
    recentCasesLabel,
    sortElements,
    historyItems,
    trigger,
    updateField,
  };
};

export default connect(
  HistoryComponent,
  selector
);
