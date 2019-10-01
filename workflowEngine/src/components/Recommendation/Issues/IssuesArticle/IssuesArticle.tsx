import React, { FC } from 'react';
import ExpandSimpleLink from '../../../../shared-components/ExpandSimpleLink/ExpandSimpleLink';
import { RecommendationLabels } from '../../../../redux/modules/workflow';
import {
  IssuesArticle,
  IssuesIcon,
  IssuesArticleTitle,
  IssuesArticleContent,
  ArticleLink,
  IssuesMoreLess,
} from '../IssuesArticle/IssuesArticle_Styled';

export interface IssuesArticleProps {
  accessibilityLabels: RecommendationLabels;
  articles: IssueArticleType[];
}

export interface IssueArticleType {
  $: { img: string };
  type: string;
  title: string;
  description: string;
  moreButton: string;
  lessButton: string;
}

const IssuesArticleComponent: FC<IssuesArticleProps> = React.memo(
  ({ accessibilityLabels, articles }) => {
    const { actionsLabel, issuesLabel } = accessibilityLabels;

    return (
      <IssuesArticle id="RecommendationIssuesArticle">
        <div aria-label={issuesLabel} role="list">
          {articles.map((item, i: number) => (
            <IssuesArticle key={i}>
              <IssuesIcon>
                <img
                  src={require(`../../../../static/images/${item.$.img}`)}
                  aria-label={item.type}
                  tabIndex={0}
                />
              </IssuesIcon>
              <ArticleLink aria-label={`${actionsLabel} (${item.title})`}>...</ArticleLink>
              <IssuesArticleTitle>{item.title}</IssuesArticleTitle>
              <IssuesMoreLess>
                <ExpandSimpleLink openText={item.moreButton} closeText={item.lessButton}>
                  <IssuesArticleContent>{item.description}</IssuesArticleContent>
                </ExpandSimpleLink>
              </IssuesMoreLess>
            </IssuesArticle>
          ))}
        </div>
      </IssuesArticle>
    );
  }
);

export default IssuesArticleComponent;
