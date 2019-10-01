import React, { FC } from 'react';
import SoftPhone from '../../components/SoftPhone/SoftPhone';
import {
  Dashboard,
  Header,
  Title,
  LeftHeaderPanel,
  MiddleHeaderPanel,
  RightHeaderPanel,
  TopPanel,
  Main,
  LeftPanel,
  MiddlePanel,
  RightPanel,
  WindowButtons,
  WindowButtonsRed,
  WindowButtonsYellow,
  WindowButtonsGreen,
  HeaderButtonHome,
  HeaderButtonLayout,
  HeaderButtonPlus,
  HeaderButtonSearch,
  HeaderButtonCases,
  HeaderButtonWorkbins,
  HeaderButtonScheduledLearning,
  HeaderButtonMyLearning,
  HeaderButtonKnowledgeBase,
} from './Dashboard_Styled';

interface HeaderProps {
  title: string;
  accessibilityLabels: {
    toolbarLabel: string;
    showDashboardButtonTitle: string;
    hideSidebarButtonTitle: string;
    researchButtonTitle: string;
    searchButtonTitle: string;
    softphoneUiLabel: string;
    myCasesButtonTitle: string;
    myWorkbinsButtonTitle: string;
    scheduledLearningButtonTitle: string;
    myLearningButtonTitle: string;
    knowledgeBaseButtonTitle: string;
  };
}

/**
 * The header component contains the title, side buttons, and softphone
 * component. It has been separated from the other Dashboard components due
 * to the Softphone component requirements. The softphone component has been
 * place here because it will always exist at the top regardless off
 * workflow variations.
 *
 * @param title - The title placed above the softphone component
 */
const HeaderComponent: FC<HeaderProps> = ({
  title,
  accessibilityLabels: {
    toolbarLabel,
    showDashboardButtonTitle,
    hideSidebarButtonTitle,
    researchButtonTitle,
    searchButtonTitle,
    softphoneUiLabel,
    myCasesButtonTitle,
    myWorkbinsButtonTitle,
    scheduledLearningButtonTitle,
    myLearningButtonTitle,
    knowledgeBaseButtonTitle,
  },
}) => (
  <Header aria-label={toolbarLabel} role="group">
    <WindowButtons>
      <WindowButtonsRed />
      <WindowButtonsYellow />
      <WindowButtonsGreen />
    </WindowButtons>
    <Title>{title}</Title>
    <LeftHeaderPanel>
      <HeaderButtonHome title={showDashboardButtonTitle} />
      <HeaderButtonLayout title={hideSidebarButtonTitle} />
      <HeaderButtonPlus title={researchButtonTitle} />
      <HeaderButtonSearch title={searchButtonTitle} />
    </LeftHeaderPanel>
    <MiddleHeaderPanel arial-label={softphoneUiLabel} role="group">
      <SoftPhone />
    </MiddleHeaderPanel>
    <RightHeaderPanel>
      <HeaderButtonCases title={myCasesButtonTitle} />
      <HeaderButtonWorkbins title={myWorkbinsButtonTitle} />
      <HeaderButtonScheduledLearning title={scheduledLearningButtonTitle} />
      <HeaderButtonMyLearning title={myLearningButtonTitle} />
      <HeaderButtonKnowledgeBase title={knowledgeBaseButtonTitle} />
    </RightHeaderPanel>
  </Header>
);

export default Dashboard;
export {
  HeaderComponent as Header,
  TopPanel,
  Main,
  LeftPanel,
  MiddlePanel,
  RightPanel,
  WindowButtons,
};
