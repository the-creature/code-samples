import styled from 'styled-components';

export const SolutionsArticle = styled.div`
  display: block;
  position: relative;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(214, 214, 214);
  width: 335px;
  left: 5px;

  :last-child {
    border: none;
  }
`;

export const SolutionsArticleType = styled('div')<{ type: string }>`
  height: auto;
  padding-bottom: 10px;
  padding-top: 17px;
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${props => (props.type === 'procedure' ? '#C83866' : '#666666')};
`;

export const ArticleLink = styled.div`
  display: float;
  float: right;
  position: relative;
  cursor: pointer;
  color: rgb(42, 100, 213);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -1.5px;
  height: 15px;
  top: -11px;
  right: 20px;
`;

export const SolutionsArticleSolutions = styled.div`
  box-sizing: border-box;
  position: relative;
  color: rgb(103, 103, 103);
  height: auto;
  top: 5px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  word-spacing: -1px;
  width: 295px;
`;

export const SolutionsArticleTitle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  height: auto;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  width: 295px;
  margin-top: -4px;
`;

export const SolutionsMoreLess = styled.div`
  position: relative;
  color: rgb(55, 136, 230);
  font-size: 14px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 10px;

  > button {
    position: relative;
    padding: 0px;
  }
`;
