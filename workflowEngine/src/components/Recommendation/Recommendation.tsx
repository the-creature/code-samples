import React, { FC, useContext } from 'react';
import get from 'lodash.get';
import has from 'lodash.has';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import {
  RecommendationIssuesType,
  RecommendationSolutionsType,
  RecommendationNoneType,
  RecommendationLabels,
} from '../../redux/modules/workflow';
import { RecommendationPane, RecommendationPaneNone } from './Recommendation_Styled';
import Solutions from './Solutions/Solutions';
import Issues from './Issues/Issues';
interface RecommendationProps {
  accessibilityLabels: RecommendationLabels;
  issuesData: RecommendationIssuesType | null;
  solutionsData: RecommendationSolutionsType | null;
  noneData: RecommendationNoneType | null;
}

const Recommendation: FC<RecommendationProps> = ({
  accessibilityLabels,
  issuesData,
  solutionsData,
  noneData,
}) => (
  <RecommendationPane>
    {!solutionsData && !issuesData && (
      <RecommendationPaneNone>
        <p>{noneData}</p>
      </RecommendationPaneNone>
    )}
    {solutionsData && <Solutions data={solutionsData} accessibilityLabels={accessibilityLabels} />}
    {issuesData && <Issues data={issuesData} accessibilityLabels={accessibilityLabels} />}
  </RecommendationPane>
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);

  const {
    metadata: {
      recommendations: {
        setup: { accessibilityLabels },
        recommendation,
      },
    },
    context: { product },
  } = workflowData;

  const recommendationOfProduct = recommendation.find(
    item => item.$.displayId === get(product, '$.displayId')
  );

  const recommendationNone = recommendation.find(item => item.$.displayId === 'none');

  let issuesData = null;
  let solutionsData = null;
  let noneData = null;

  if (recommendationOfProduct) {
    if (has(recommendationOfProduct, 'issues')) {
      issuesData = get(recommendationOfProduct, 'issues');
    }
    if (has(recommendationOfProduct, 'solutions')) {
      solutionsData = get(recommendationOfProduct, 'solutions');
    }
  } else {
    noneData = get(recommendationNone, 'noRecommendations');
  }

  return {
    accessibilityLabels,
    issuesData,
    solutionsData,
    noneData,
  };
};

export default connect(
  React.memo(Recommendation),
  selector
);
