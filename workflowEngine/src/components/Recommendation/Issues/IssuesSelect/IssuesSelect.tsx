import React, { FC } from 'react';
import { RecommendationLabels } from '../../../../redux/modules/workflow';
import { IssuesSelect } from './IssuesSelect_Styled';

export interface IssuesTitleSelectProps {
  accessibilityLabels: RecommendationLabels;
  options: IssuesTitleSelectOptionType[];
}

export interface IssuesTitleSelectOptionType {
  value: string;
}

const IssuesTitleSelectComponent: FC<IssuesTitleSelectProps> = React.memo(
  ({ accessibilityLabels, options }) => {
    const { issuesLabel } = accessibilityLabels;

    return (
      <IssuesSelect id="RecommendationIssuesArticle">
        <div aria-label={issuesLabel} role="list">
          <IssuesSelect>
            <select>
              {options.map((item, i: number) => (
                <option key={i}>{item.value}</option>
              ))}
            </select>
          </IssuesSelect>
        </div>
      </IssuesSelect>
    );
  }
);

export default IssuesTitleSelectComponent;
