import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import has from 'lodash.has';
import {
  loadSteps,
  nextStep,
  nextState,
  prevState,
  resetState,
  trigger,
  updateField,
  updateFields,
  updateTopic,
  updateProduct,
  updateComponent,
  updateIssue,
  updateView,
  resetAllErrors,
  resetError,
  setError,
  incrementTime,
  showInfo,
  hideInfo,
  startMute,
  stopMute,
  startHold,
  stopHold,
} from '../redux/modules/workflow';
import { AppState } from '../redux/modules/reducers';
import Dashboard, {
  Header,
  Main,
  LeftPanel,
  MiddlePanel,
  RightPanel,
} from '../shared-components/Dashboard/Dashboard';
import ProctorWindow from '../shared-components/ProctorWindow/ProctorWindow';
import Loading from '../shared-components/Loading/Loading';
import Classification from '../components/Classification/Classification';
import Card from '../shared-components/Card/Card';
import Recommendation from '../components/Recommendation/Recommendation';
import WorkflowEngine from '../components/WorkflowEngine/WorkflowEngine';
import {
  WorkflowContextProps,
  WorkflowContextProvider,
} from '../shared-components/WorkflowContext/WorkflowContext';
import CaseView from '../components/CaseView/CaseView';
import TopPanel from '../components/TopPanel/TopPanel';
import {
  ComponentType,
  IssueType,
  HoldMuteProps,
  ProductType,
  WorkflowEvent,
  WorkflowDataType,
} from '../redux/modules/workflow';

interface MatchParams {
  workflow: string;
  language: string;
}

interface WorkflowProps extends RouteComponentProps<MatchParams> {
  incrementTime: () => void;
  showInfo: () => void;
  hideInfo: () => void;
  startMute: (data: HoldMuteProps) => void;
  stopMute: (data: HoldMuteProps) => void;
  startHold: (data: HoldMuteProps) => void;
  stopHold: (data: HoldMuteProps) => void;
  loadSteps: () => void;
  nextStep: (step: number) => void;
  nextState: (step: number) => void;
  prevState: (step: number) => void;
  resetState: () => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
  updateFields: (data: { [key: string]: string | number | object[] }) => void;
  updateTopic: (topic: string) => void;
  updateProduct: (data: ProductType | undefined) => void;
  updateComponent: (data: ComponentType | undefined) => void;
  updateIssue: (data: IssueType | undefined) => void;
  updateView: (view: string) => void;
  setError: (data: { field: string; errorMessage: string }) => void;
  resetAllErrors: () => void;
  resetError: (field: string) => void;
  trigger: (data: WorkflowEvent) => void;
  workflowData: WorkflowDataType;
  loaded: boolean;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface WorkflowActions {
  incrementTime: () => void;
  showInfo: () => void;
  hideInfo: () => void;
  startMute: (data: HoldMuteProps) => void;
  stopMute: (data: HoldMuteProps) => void;
  startHold: (data: HoldMuteProps) => void;
  stopHold: (data: HoldMuteProps) => void;
  nextStep: (step: number) => void;
  nextState: (step: number) => void;
  prevState: (step: number) => void;
  resetState: () => void;
  updateField: (data: { name: string; value: string | number | object[] }) => void;
  updateFields: (data: { [key: string]: string | number | object[] }) => void;
  updateTopic: (topic: string) => void;
  updateProduct: (data: ProductType | undefined) => void;
  updateComponent: (data: ComponentType | undefined) => void;
  updateIssue: (data: IssueType | undefined) => void;
  updateView: (view: string) => void;
  setError: (data: { field: string; errorMessage: string }) => void;
  resetAllErrors: () => void;
  resetError: (field: string) => void;
  trigger: (data: WorkflowEvent) => void;
}

/**
 * Shared workflow page component, all workflows use this component to render the page content.
 * The route path will have workflow name, like /#/testA, /#/workflow_1, testA and workflow_1 are workflow names.
 * The workflow name in route path must match the folder name in /data/en folder. For example:
 * - workflow "testA":
 *   path: /#/testA
 *   data: /data/en/testA
 *
 * - workflow "workflow_1":
 *   path: /#/workflow_1
 *   data: /data/en/workflow_1
 *
 * if the workflow has different components or layout, create new page component.
 */
class Workflow extends React.Component<WorkflowProps> {
  componentDidMount() {
    this.props.loadSteps();
  }

  // load necessary workflow configuration data here
  componentDidUpdate(prevProps: WorkflowProps) {
    if (this.props.match.params.workflow !== prevProps.match.params.workflow) {
      this.props.loadSteps();
    }
  }

  nextStep = (index: number) => {
    // Ensures that the step action only triggers when it's on the current step
    const {
      workflowData: {
        context: { currentStepIndex },
      },
      nextStep,
    } = this.props;
    if (currentStepIndex === index) {
      nextStep(index);
    }
  };

  render() {
    const { loaded } = this.props;

    if (!loaded) {
      return <Loading />;
    }

    const {
      workflowData,
      workflowData: {
        name,
        steps,
        context: { currentStepIndex },
        history,
      },
    } = this.props;

    // Putting workflowData and actions into react context, which will be used in different components
    // workflowData contains workflow config data, and dynamic process data of workflow in "context" in redux store.
    // actions has all necessary methods to change "context" in redux store, or trigger events.
    const workflowContext: WorkflowContextProps = {
      workflowData, // all workflow related data
      actions: {
        // all actions used by children components to change workflow state
        incrementTime: this.props.incrementTime,
        showInfo: this.props.showInfo,
        hideInfo: this.props.hideInfo,
        startMute: this.props.startMute,
        stopMute: this.props.stopMute,
        startHold: this.props.startHold,
        stopHold: this.props.stopHold,
        nextStep: this.nextStep,
        nextState: this.props.nextState,
        prevState: this.props.prevState,
        resetState: this.props.resetState,
        trigger: this.props.trigger,
        updateField: this.props.updateField,
        updateFields: this.props.updateFields,
        updateTopic: this.props.updateTopic,
        updateProduct: this.props.updateProduct,
        updateComponent: this.props.updateComponent,
        updateIssue: this.props.updateIssue,
        updateView: this.props.updateView,
        setError: this.props.setError,
        resetAllErrors: this.props.resetAllErrors,
        resetError: this.props.resetError,
      },
    };

    const {
      metadata: {
        coreClassificationPane: {
          setup: {
            accessibilityLabels: {
              toolbarLabel,
              contentAreaLabel,
              caseViewLabel,
              caseLoggingLabel,
              recommendedSolutionsLabel,
              showDashboardButtonTitle,
              hideSidebarButtonTitle,
              researchButtonTitle,
              searchButtonTitle,
              myCasesButtonTitle,
              myWorkbinsButtonTitle,
              scheduledLearningButtonTitle,
              myLearningButtonTitle,
              knowledgeBaseButtonTitle,
            },
          },
        },
        coreSoftphone: {
          setup: {
            accessibilityLabels: { softphoneUiLabel },
          },
        },
      },
    } = workflowData;

    const headerAccessibilityLabels = {
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
    };

    return (
      <WorkflowContextProvider value={workflowContext}>
        <Dashboard>
          <WorkflowEngine />
          <ProctorWindow
            history={history}
            steps={steps}
            currentStepIndex={currentStepIndex as number}
            onPrevState={this.props.prevState}
            onNextState={this.props.nextState}
            onReset={this.props.resetState}
            totalSteps={steps.length}
            {...workflowData}
          />
          <Header accessibilityLabels={headerAccessibilityLabels} title={name} />
          <TopPanel />
          <Main aria-label={contentAreaLabel} role="group">
            <LeftPanel aria-label={caseViewLabel} role="group">
              <CaseView />
            </LeftPanel>
            <MiddlePanel aria-label={caseLoggingLabel} role="group">
              <Card height="100%">
                <Classification />
              </Card>
            </MiddlePanel>
            <RightPanel aria-label={recommendedSolutionsLabel} role="group">
              <Recommendation />
            </RightPanel>
          </Main>
        </Dashboard>
      </WorkflowContextProvider>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: WorkflowProps) => {
  return {
    workflowData: { ...state.workflows[ownProps.match.params.workflow] },
    loaded: has(state.workflows, ownProps.match.params.workflow),
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: WorkflowProps) => {
  const { workflow, language } = ownProps.match.params;
  return {
    loadSteps: () => {
      // @ts-ignore
      dispatch(loadSteps(workflow, language));
    },
    incrementTime: () => {
      // @ts-ignore
      dispatch(incrementTime(workflow));
    },
    showInfo: () => {
      // @ts-ignore
      dispatch(showInfo(workflow));
    },
    hideInfo: () => {
      // @ts-ignore
      dispatch(hideInfo(workflow));
    },
    startMute: (data: HoldMuteProps) => {
      // @ts-ignore
      dispatch(startMute(workflow, data));
    },
    stopMute: (data: HoldMuteProps) => {
      // @ts-ignore
      dispatch(stopMute(workflow, data));
    },
    startHold: (data: HoldMuteProps) => {
      // @ts-ignore
      dispatch(startHold(workflow, data));
    },
    stopHold: (data: HoldMuteProps) => {
      // @ts-ignore
      dispatch(stopHold(workflow, data));
    },
    nextStep: (index: number) => {
      // @ts-ignore
      dispatch(nextStep(workflow, index));
    },
    nextState: (index: number) => {
      // @ts-ignore
      dispatch(nextState(workflow, index));
    },
    prevState: (index: number) => {
      // @ts-ignore
      dispatch(prevState(workflow, index));
    },
    resetState: () => {
      // @ts-ignore
      dispatch(resetState(workflow));
    },
    trigger: (data: WorkflowEvent) => {
      // @ts-ignore
      dispatch(trigger(workflow, data));
    },
    updateField: (data: { name: string; value: string | number | object[] }) => {
      // @ts-ignore
      dispatch(updateField(workflow, data));
    },
    updateFields: (data: { [key: string]: string | number | object[] }) => {
      // @ts-ignore
      dispatch(updateFields(workflow, data));
    },
    updateTopic: (data: string) => {
      // @ts-ignore
      dispatch(updateTopic(workflow, data));
    },
    updateProduct: (data: ProductType | undefined) => {
      // @ts-ignore
      dispatch(updateProduct(workflow, data));
    },
    updateComponent: (data: ComponentType | undefined) => {
      // @ts-ignore
      dispatch(updateComponent(workflow, data));
    },
    updateIssue: (data: IssueType | undefined) => {
      // @ts-ignore
      dispatch(updateIssue(workflow, data));
    },
    updateView: (view: string) => {
      // @ts-ignore
      dispatch(updateView(workflow, view));
    },
    setError: (data: { field: string; errorMessage: string }) => {
      // @ts-ignore
      dispatch(setError(workflow, data));
    },
    resetAllErrors: () => {
      // @ts-ignore
      dispatch(resetAllErrors(workflow));
    },
    resetError: (field: string) => {
      // @ts-ignore
      dispatch(resetError(workflow, field));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workflow);
