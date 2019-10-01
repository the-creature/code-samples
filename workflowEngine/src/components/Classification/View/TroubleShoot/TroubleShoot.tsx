import React, { FC, createRef, memo, useContext, useEffect } from 'react';
import WorkflowContext, {
  connect,
} from '../../../../shared-components/WorkflowContext/WorkflowContext';
import Description from './Description/Description';
import Fields from './Fields/Fields';
import { MainBodySection, MainHeaderSection } from '../../Classification_Styled';

interface TroubleShootProps {
  id: string;
  classificationPaneHeaderLabel: string;
  troubleshootingLabel: string;
  hasFocus?: boolean;
}

// Renders the troubleshoot view state for Classification
const TroubleShoot: FC<TroubleShootProps> = ({
  id,
  classificationPaneHeaderLabel,
  troubleshootingLabel,
  hasFocus = false,
}) => {
  const divRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (hasFocus && divRef && divRef.current !== null) {
      divRef.current.focus();
    }
  }, [hasFocus]);

  return (
    <>
      <MainHeaderSection
        id={id}
        role="group"
        aria-label={classificationPaneHeaderLabel}
        ref={divRef}
        tabIndex={0}
      >
        <Description />
      </MainHeaderSection>
      <MainBodySection
        id="classification_main_body_section"
        role="group"
        aria-label={troubleshootingLabel}
      >
        <Fields />
      </MainBodySection>
    </>
  );
};

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: { classificationPaneHeaderLabel, troubleshootingLabel },
        },
      },
    },
    context: { focus },
  } = workflowData;
  const id = 'classification_main_header_section';

  return {
    id,
    classificationPaneHeaderLabel,
    troubleshootingLabel,
    hasFocus: focus === id,
  };
};

export default connect(
  memo(TroubleShoot),
  selector
);
