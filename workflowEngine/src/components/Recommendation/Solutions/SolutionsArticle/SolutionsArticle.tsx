import React, { FC } from 'react';
import ExpandSimpleLink from '../../../../shared-components/ExpandSimpleLink/ExpandSimpleLink';
import { RecommendationLabels } from '../../../../redux/modules/workflow';
import {
  SolutionsArticle,
  SolutionsArticleType,
  SolutionsArticleTitle,
  SolutionsArticleSolutions,
  ArticleLink,
  SolutionsMoreLess,
} from './SolutionsArticle_Styled';

interface SolutionsArticleProps {
  accessibilityLabels: RecommendationLabels;
  articles: SolutionArticleType[];
}

interface SolutionArticleType {
  $: { type: string };
  articleType: string;
  title: string;
  description: string;
  moreButton: string;
  lessButton: string;
}

const SolutionsArticleComponent: FC<SolutionsArticleProps> = React.memo(
  ({ accessibilityLabels, articles }) => {
    const { actionsLabel, solutionsLabel } = accessibilityLabels;
    return (
      <SolutionsArticle id="RecommendationSolutionsArticle">
        <div aria-label={solutionsLabel} role="list">
          {articles.map((item, i: number) => (
            <SolutionsArticle key={i}>
              <SolutionsArticleType type={item.$.type}>{item.articleType}</SolutionsArticleType>
              <ArticleLink aria-label={`${actionsLabel} (${item.title})`}>...</ArticleLink>
              <SolutionsArticleTitle>{item.title}</SolutionsArticleTitle>
              <SolutionsMoreLess>
                <ExpandSimpleLink openText={item.moreButton} closeText={item.lessButton}>
                  <SolutionsArticleSolutions>{item.description}</SolutionsArticleSolutions>
                </ExpandSimpleLink>
              </SolutionsMoreLess>
            </SolutionsArticle>
          ))}
        </div>
      </SolutionsArticle>
    );
  }
);

export default SolutionsArticleComponent;
