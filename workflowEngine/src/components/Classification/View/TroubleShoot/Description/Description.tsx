import React, { FC, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import ExpandSimpleLink from '../../../../../shared-components/ExpandSimpleLink/ExpandSimpleLink';
import {
  DescriptionContent,
  DescriptionEdit,
  DescriptionContainer,
  DescriptionIcon,
  DescriptionTitle,
} from './Description_Styled';

interface DescriptionProps {
  labelTopic: string;
  imagePath: string;
  productName: string;
  componentName: string;
  issueName: string;
  updateView: (view: string) => void;
}

// Renders the header section of the troubleshoot view state for Classification
const DescriptionComponent: FC<DescriptionProps> = React.memo(
  ({ labelTopic, imagePath, productName, componentName, issueName, updateView }) => (
    <DescriptionContainer>
      <DescriptionIcon src={imagePath} />
      <DescriptionTitle>{labelTopic}</DescriptionTitle>
      <DescriptionContent>
        {productName}, {componentName}, {issueName}
        <ExpandSimpleLink openText="More" closeText="Less">
          Some information
        </ExpandSimpleLink>
      </DescriptionContent>
      <DescriptionEdit onClick={() => updateView('combined')}>Edit</DescriptionEdit>
    </DescriptionContainer>
  )
);

const selector = () => {
  const { actions, workflowData } = useContext(WorkflowContext);
  const {
    context: { component, issue, product, topic },
  } = workflowData;
  const { updateView } = actions;
  const imagePath =
    (product && product.$ && require(`../../../../../static/${product.$.img}`)) || '';

  return {
    imagePath,
    labelTopic: topic,
    productName: product && product.name,
    componentName: component && component.name,
    issueName: issue && issue.name,
    updateView,
  };
};

export default connect(
  DescriptionComponent,
  selector
);
