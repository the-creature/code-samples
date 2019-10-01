import React, { FC } from 'react';
import { RecommendationIssuesType, RecommendationLabels } from '../../../redux/modules/workflow';
import { Issues, IssuesHeader, IssueTitleText, IssueNew, IssueRelated } from './Issues_Styled';
import IssuesArticle from './IssuesArticle/IssuesArticle';
import IssuesTitleSelect from './IssuesSelect/IssuesSelect';

interface RecommendationIssuesProps {
  accessibilityLabels: RecommendationLabels;
  data: RecommendationIssuesType;
}

const RecommendationIssuesComponent: FC<RecommendationIssuesProps> = React.memo(
  ({ accessibilityLabels, data }) => {
    const {
      header: {
        issueTitleText: issuesTitle,
        element: {
          options: { option: issuesSelectOptions },
        },
        issueNew: {
          $: { img: newIssueImgSrc },
        },
        issueRelated: {
          $: { img: relatedIssueImgSrc },
        },
      },
      issuesArticle: articles,
    } = data;
    const { viewAllLabel, createNewLabel, issuesLabel } = accessibilityLabels;

    const relatedIssueImg = require(`../../../static/images/${relatedIssueImgSrc}`);
    const newIssueImg = require(`../../../static/images/${newIssueImgSrc}`);

    return (
      <Issues aria-label={issuesLabel} role="group">
        <IssuesHeader>
          <IssueTitleText>{issuesTitle}</IssueTitleText>
          <IssuesTitleSelect
            options={issuesSelectOptions}
            accessibilityLabels={accessibilityLabels}
          />
          <IssueRelated aria-label={viewAllLabel}>
            <img src={relatedIssueImg} aria-hidden="true" />
          </IssueRelated>
          <IssueNew aria-label={createNewLabel}>
            <img src={newIssueImg} aria-hidden="true" />
          </IssueNew>
        </IssuesHeader>
        <IssuesArticle articles={articles} accessibilityLabels={accessibilityLabels} />
      </Issues>
    );
  }
);

export default RecommendationIssuesComponent;
