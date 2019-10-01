import styled from 'styled-components';

export const IssuesArticle = styled.div`
  display: block;
  position: relative;
  padding-top: 20px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgb(214, 214, 214);
  width: 335px;
  padding-bottom: 10px;

  :last-child {
    border: none;
  }

  :first-child {
    padding-top: 0px;
    top: -10px;
  }
`;

export const IssuesIcon = styled.div`
  float: left;
  width: auto;
  padding: 0px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const IssuesArticleTitle = styled.div`
  box-sizing: border-box;
  height: auto;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  width: 295px;
  padding-left: 40px;
`;

export const IssuesArticleContent = styled.div`
  box-sizing: border-box;
  display: block;
  color: rgb(103, 103, 103);
  padding-top: 0px;
  height: auto;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
  word-spacing: -1px;
  width: 295px;
`;

export const IssuesMoreLess = styled.div`
  display: block;
  color: rgb(55, 136, 230);
  font-size: 14px;
  font-weight: 500;
  top: -3px;
  padding-bottom: 10px;
  padding-left: 40px;
`;

export const ArticleLink = styled.div`
  display: float;
  box-sizing: border-box;
  float: right;
  position: relative;
  cursor: pointer;
  color: rgb(42, 100, 213);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -1.5px;
  height: 45px;
  top: -8px;
  right: 20px;
`;
