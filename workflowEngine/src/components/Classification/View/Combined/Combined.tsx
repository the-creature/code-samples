import React, { FC } from 'react';
import Topic from '../CaseLog/Topic/Topic';
import CaseContact from '../CaseLog/CaseContactExpand/CaseContactExpand';
import LinkSerial from '../CaseLog/LinkSerialExpand/LinkSerialExpand';
import ProductComponentIssue from '../CaseLog/ProductComponentIssue/ProductComponentIssue';
import TroubleShoot from '../CaseLog/TroubleShootExpand/TroubleShootExpand';
import { MainBodySection, Row } from '../../Classification_Styled';
import Fields from '../TroubleShoot/Fields/Fields';

const Combined: FC = () => (
  <>
    <Topic />
    <MainBodySection id="classification_main_body_section">
      <Row>
        <CaseContact />
      </Row>
      <Row>
        <LinkSerial />
      </Row>
      <Row>
        <ProductComponentIssue />
      </Row>
      <Row>
        <TroubleShoot />
      </Row>
      <Row>
        <Fields />
      </Row>
    </MainBodySection>
  </>
);

export default Combined;
