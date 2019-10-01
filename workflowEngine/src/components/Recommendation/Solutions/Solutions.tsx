import React, { FC } from 'react';
import { RecommendationSolutionsType, RecommendationLabels } from '../../../redux/modules/workflow';
import {
  SolutionsItem,
  SolutionsTitle,
  SolutionsTitleIcon,
  SolutionsTitleTitle,
} from './Solutions_Styled';
import SolutionsArticle from './SolutionsArticle/SolutionsArticle';

interface RecommendationSolutionsProps {
  accessibilityLabels: RecommendationLabels;
  data: RecommendationSolutionsType;
}

const RecommendationSolutionsComponent: FC<RecommendationSolutionsProps> = React.memo(
  ({ accessibilityLabels, data }) => {
    const {
      solutionsTitle: title,
      solutionsTitleImg: {
        $: { img: lightBulb },
      },
      solutionsArticle: articles,
    } = data;
    const { solutionsLabel } = accessibilityLabels;

    const lightBulbImg = require(`../../../static/images/${lightBulb}`);

    return (
      <SolutionsItem aria-label={solutionsLabel} role="group">
        <SolutionsTitle>
          <SolutionsTitleIcon>
            <img src={lightBulbImg} aria-hidden="true" />
          </SolutionsTitleIcon>
          <SolutionsTitleTitle>{title}</SolutionsTitleTitle>
        </SolutionsTitle>
        <SolutionsArticle articles={articles} accessibilityLabels={accessibilityLabels} />
      </SolutionsItem>
    );
  }
);

export default RecommendationSolutionsComponent;
