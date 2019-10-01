import React, { FC } from 'react';
import Topic from './Topic/Topic';
import CaseContact from './CaseContactExpand/CaseContactExpand';
import LinkSerial from './LinkSerialExpand/LinkSerialExpand';
import ProductComponentIssue from './ProductComponentIssue/ProductComponentIssue';
import TroubleShoot from './TroubleShootExpand/TroubleShootExpand';
import { MainBodySection, Row } from '../../Classification_Styled';

// Renders the Case Log view state for Classification
const CaseLogComponent: FC = () => (
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
      <Row id="classification_trouble_shoot_section">
        <TroubleShoot />
      </Row>
    </MainBodySection>
  </>
);

export default CaseLogComponent;
