import React, { FC, useContext } from 'react';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import CaseLog from './View/CaseLog/CaseLog';
import Combined from './View/Combined/Combined';
import TroubleShoot from './View/TroubleShoot/TroubleShoot';
import AdditionalNotes from './AdditionalNotes/AdditionalNotes';
import CaseOptions from './CaseOptions/CaseOptions';
import { ClassificationContainer, Main, NoteSection, SubmitSection } from './Classification_Styled';

interface ClassificationProps {
  caseActionsLabel: string;
  mainLabel: string;
  notesLabel: string;
  view: string;
}

/**
 * The Classification smart component accepts core classification xml data
 * and renders them appropriately to set up the component for the workflow.
 */
const ClassificationComponent: FC<ClassificationProps> = React.memo(
  ({ caseActionsLabel, mainLabel, notesLabel, view }) => (
    <ClassificationContainer id="classification_container">
      {view === 'troubleshoot' && (
        <Main id="classification_main_section_troubleshoot" role="region" aria-label={mainLabel}>
          <TroubleShoot />
        </Main>
      )}
      {view === 'case_log' && (
        <Main id="classification_main_section_caselog" role="region" aria-label={mainLabel}>
          <CaseLog />
        </Main>
      )}
      {view === 'combined' && (
        <Main id="classification_main_section_combined" role="region" aria-label={mainLabel}>
          <Combined />
        </Main>
      )}
      <NoteSection id="classification_note_section" role="region" aria-label={notesLabel}>
        <AdditionalNotes />
      </NoteSection>
      <SubmitSection
        id="classification_case_actions_section"
        role="region"
        aria-label={caseActionsLabel}
      >
        <CaseOptions />
      </SubmitSection>
    </ClassificationContainer>
  )
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { caseActionsLabel, mainLabel, notesLabel },
        },
      },
    },
    context: { view },
  } = workflowData;

  return {
    caseActionsLabel,
    mainLabel,
    notesLabel,
    view,
  };
};

export default connect(
  ClassificationComponent,
  selector
);
