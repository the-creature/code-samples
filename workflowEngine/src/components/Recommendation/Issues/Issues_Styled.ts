import styled from 'styled-components';

export const Issues = styled.div`
  background-color: rgb(248, 248, 245);
  width: 390px;
  border-radius: 5px;
  padding: 13px;
  padding-bottom: 0px;
  margin-top: 12px;
`;

export const IssuesHeader = styled.div`
  margin-right: 20px;

  :after {
    content: '';
    clear: both;
    display: table;
  }
`;

export const IssueTitleText = styled.div`
  float: left;
  width: auto;
  font-size: 15px;
  font-weight: 400;
`;

export const IssueNew = styled.div`
  float: right;
  padding: 5px;

  img {
    width: 15px;
    height: 15px;
  }
`;

export const IssueRelated = styled.div`
  float: right;
  padding: 5px;

  img {
    width: 15px;
    height: 15px;
  }
`;
