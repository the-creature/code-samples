import { Dispatch } from 'redux';
import get from 'lodash.get';
import has from 'lodash.has';
import { loadXML, xmlToSteps } from '../../config/utils';

// Action Types
const LOAD_DATA = 'LOAD_DATA';
const NEXT = 'NEXT_STEP';
const NEXT_STATE = 'NEXT_STATE';
const PREV_STATE = 'PREV_STATE';
const RESET_STATE = 'RESET_STATE';
const UPDATE_FIELD = 'UPDATE_FIELD';
const UPDATE_FIELDS = 'UPDATE_FIELDS';
const UPDATE_VIEW = 'UPDATE_CASE_VIEW_CLASSIFICATION';
const UPDATE_TOPIC = 'UPDATE_TOPIC_CLASSIFICATION';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT_CLASSIFICATION';
const UPDATE_COMPONENT = 'UPDATE_COMPONENTS_CLASSIFICATION';
const UPDATE_ISSUE = 'UPDATE_ISSUES_CLASSIFICATION';
const RESET_ALL_ERRORS = 'RESET_ALL_ERRORS';
const RESET_ERROR = 'RESET_ERROR';
const SET_ERROR = 'SET_ERROR';
const TRIGGER_EVENT = 'TRIGGER_EVENT';
const SESSION_TIME = 'SESSION_TIME';
const START_HOLD = 'START_HOLD';
const STOP_HOLD = 'STOP_HOLD';
const START_MUTE = 'START_MUTE';
const STOP_MUTE = 'STOP_MUTE';
const SHOW_INFO = 'SHOW_INFO';
const HIDE_INFO = 'HIDE_INFO';

/*
 * TODO: Break into smaller files
 */
export interface CoreClassificationPane {
  $: {
    accessible: string;
  };
  setup: {
    $: {
      markComplete: string;
    };
    resetButton: string;
    completeMsg: string;
    correctFeedback: string;
    choiceMsg: string;
    incorrectFeedback: string;
    missingTitle: string;
    incompleteFeedback: string;
    disabledTitle: string;
    disabledMsg: string;
    feedbackCloseButton: string;
    restartInteractionButton: string;
    dropdownDefault: string;
    accessibilityLabels: CoreClassificationLabels;
  };
  data: {
    topic: {
      message: string;
      field: {
        name: string;
        placeholder: string;
        icon: string;
        errorMessage: string;
        defaultValue: string;
        requiredValue: string;
      };
    };
    caseContact: {
      expand: {
        label: string;
      };
      fields: {
        element: {
          $: {
            type: string;
          };
          label: string;
          field: CaseContactFieldType | CaseContactFieldType[];
        }[];
      };
    };
    linkSerial: {
      expand: {
        label: string;
      };
      label: string;
      labelHint: string;
      productResults: {
        addProduct: string;
        getSerial: string;
        results: string;
        placeholder: string;
      };
    };
    affectedProducts: {
      label: string;
      search: {
        placeholder: string;
        errorMessage: string;
      };
      product: {
        $: {
          img: string;
          displayId: string;
        };
        name: string;
        components?: {
          component: AffectedProductComponentType[];
        };
      }[];
    };
    componentsAndIssues: {
      defaultText: string;
      label: string;
      search: {
        placeholder: string;
        errorMessage: string;
      };
    };
    troubleShooting: {
      expand: {
        name: string;
        label: string;
      };
      set: TroubleShootSetItemType[];
    };
    additionalNotes: {
      $: {
        name: string;
      };
      labels: {
        dockBottom: string;
        dockRight: string;
        detach: string;
      };
      placeholder: string;
    };
    caseOptions: {
      button: {
        label: string;
      };
      element: {
        $: {
          type: string;
          name: string;
        };
        options: {
          option: {
            $?: {
              defaultValue: string;
            };
            value: string;
            label?: string;
            children?: {
              value: string | string[];
            };
          };
        };
      };
    };
  };
}

export interface CoreClassificationLabels {
  magnifiyingGlassIcon: string;
  closeButton: string;
  nextRequiredButton: string;
  prevRequiredButton: string;
  escapeText: string;
  enterSearchResults: string;
  classificationPaneHeaderLabel: string;
  supportTopicLabel: string;
  caseContactSectionLabel: string;
  firstNameInputLabel: string;
  lastNameInputLabel: string;
  phoneInputLabel: string;
  emailInputLabel: string;
  productServicesSectionLabel: string;
  showFilterProductGalleryButton: string;
  closeAddProduct: string;
  showFilterAffectedProductButton: string;
  hideFilterAffectedProductButton: string;
  affectedProductGallery: string;
  affectedProductLabel: string;
  showFilterComponentIssueButton: string;
  hideFilterComponentIssueButton: string;
  componentIssueSectionLabel: string;
  componentSectionLabel: string;
  issueSectionLabel: string;
  tooltipButton: string;
  tooltipInstructions: string;
  selectedLabel: string;
  requiredLabel: string;
  toolbarLabel: string;
  showDashboardButtonTitle: string;
  hideSidebarButtonTitle: string;
  researchButtonTitle: string;
  searchButtonTitle: string;
  myCasesButtonTitle: string;
  myWorkbinsButtonTitle: string;
  scheduledLearningButtonTitle: string;
  myLearningButtonTitle: string;
  knowledgeBaseButtonTitle: string;
  contentAreaLabel: string;
  caseViewLabel: string;
  caseLoggingLabel: string;
  mainLabel: string;
  notesLabel: string;
  recommendedSolutionsLabel: string;
  troubleshootingLabel: string;
  consultWithAnotherAdvisorLabel: string;
  resolutionLabel: string;
  caseActionsLabel: string;
  proctorWindowLabel: string;
  closeProctorWindowLabel: string;
  backLabel: string;
  restartSimulationLabel: string;
}

export interface TroubleShootSetItemType {
  $: {
    id: string;
  };
  element: TroubleShootSetElementType[];
}

export type TroubleShootSetElementType =
  | TroubleShootSetInputElementType
  | TroubleShootSetCalloutElementType
  | TroubleShootSetDropdownElementType
  | TroubleShootSetButtonsElementType;

export interface TroubleShootSetInputElementType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  field: {
    placeholder: string;
    defaultValue: string;
  };
  value?: string;
}

export interface TroubleShootSetCalloutElementType {
  $: {
    type: string;
  };
  content: string;
}

export interface TroubleShootSetDropdownElementType {
  $: {
    type: string;
    name: string;
    hasNested?: string;
  };
  label: string;
  options: {
    option: TroubleShootSetDropdownOptionElementType[];
  };
}

export interface TroubleShootSetDropdownOptionElementType {
  $?: {
    correct: string;
    troubleshootId?: string;
  };
  value: string;
}

export interface TroubleShootSetButtonsElementType {
  $: {
    type: string;
    name: string;
  };
  label: string;
  buttons: {
    button: {
      $?: {
        correct: string;
      };
      value: string;
    }[];
  };
}

export interface AffectedProductComponentType {
  name: string;
  issues: AffectedProductIssueType[];
}

export interface AffectedProductIssueType {
  $: {
    correct: string;
    troubleshootId: string;
  };
  name: string;
}

export interface CaseContactFieldType {
  placeholder: string;
  defaultValue: string;
}

export interface CaseViewType {
  header: {
    name: string;
  };
  setup: {
    accessibilityLabels: {
      actionsLabel: string;
      topPanelLabel: string;
      customerActionsLabel: string;
      customerDetailsLabel: string;
      detailsLabel: string;
      productsLabel: string;
      recentCasesLabel: string;
      showFilterLabel: string;
    };
  };
  customer: {
    labelTitle: string;
    labelName: string;
    labelAppleId: string;
    labelLanguage: string;
    labelPhone: string;
    labelEmail: string;
    labelAddress: string;
    title: string;
    name: string;
    appleId: string;
    language: string;
    phone: string;
    email: string;
    address: string;
  };
  products: {
    labelTitle: string;
    labelProductDetails: string;
    labelActions: string;
    product: CaseViewProduct[];
  };
  history: {
    labelTitle: string;
    labelActions: string;
    element: CaseViewHistoryElement[];
    historyItem: CaseViewHistoryItem[];
  };
}

export interface CaseViewProduct {
  $: {
    img: string;
  };
  name: string;
  serial: string;
}

export interface CaseViewHistoryElement {
  $: {
    type: string;
    name: string;
  };
  label: string;
  options: {
    option: CaseViewHistoryElementOption[];
  };
}

export interface CaseViewHistoryElementOption {
  $?: {
    correct: string;
  };
  value: string;
}

export interface CaseViewHistoryItem {
  $: {
    img: string;
  };
  title: string;
  details: string;
  dateinfo: string;
  createdDate: string;
  modifiedDate: string;
}

export interface CoreSoftphoneType {
  $: {
    accessible: string;
    version: string;
  };
  setup: {
    missingConsultGroup: string;
    incorrectFeedback: string;
    disabledTitle: string;
    disabledMsg: string;
    restartInteractionButton: string;
    accessibilityLabels: {
      callInfoButtonTitle: string;
      customerCallLabel: string;
      escapeText: string;
      holdButtonTitle: string;
      mergeButtonTitle: string;
      releaseButtonTitle: string;
      simulationEnded: string;
      softphoneUiLabel: string;
      toggleMuteButtonTitle: string;
      totalCallTimeLabel: string;
      totalTimeOnCallLabel: string;
      totalTimeOnHoldLabel: string;
      touchtoneKeypadButtonTitle: string;
    };
  };
  uiStrings: {
    developerSpecified: {
      callOverlaay: {
        $: {
          type: string;
        };
        title: string;
        origin: string;
        queue: string;
        thirdLine: string;
      };
      startingCallerName: string;
      startingCallerIcon: string;
      infoPopup: {
        sectionTitle: string;
        iconAlt: string;
        caller: string;
        callName: string;
        callTime: {
          minute: string;
          second: string;
        };
        lineTwoWaitTime: {
          minute: string;
          second: string;
        };
        transfersNumber: string;
        waitTime: {
          minute: string;
          second: string;
        };
        talkTime: {
          minute: string;
          second: string;
        };
      };
      consultGroups: {
        consultGroup: {
          $: {
            type: string;
          };
          name: string;
          waitTime: string;
          optionalVdn: string;
        }[];
      };
      classificationPane: {
        topic: string;
        caseId: string;
        affectedProduct: {
          _: string;
          $: {
            src: string;
          };
          component: string;
          issue: string;
          productSerialNumber: string;
        };
        component: string;
        issue: string;
        productSerialNumber: string;
      };
    };
    boilerplate: {
      totalAvailableTime: string;
      available: string;
      dockToBottomLabel: string;
      dockToRightLabel: string;
      detachLabel: string;
      additionalNotesPlaceholder: string;
      caseOptionsButton: string;
      continueButton: string;
      closeRowButton: string;
      caseOptions: {
        newCase: string;
        newEmailThread: string;
        escalation: string;
        transfer: string;
        misroute: string;
        forward: string;
        serviceOptions: string;
        locateService: string;
        sellAgreement: string;
        attachments: string;
        requestAttachment: string;
        attachFile: string;
        followUps: string;
        scheduleCallBack: string;
        trackCase: string;
        emailCase: string;
        caseOptionsItem: string;
      };
      emailCaseButton: string;
      trackCaseButton: string;
      nextStepsLabel: string;
      offerCaseId: string;
      caseSavedLabel: string;
      commentsLabel: string;
      commentsPlaceholder: string;
      mostCommonLabel: string;
      addressBookButton: string;
      callerInput: string;
      consultLabel: string;
      noConsultOption: string;
      consultOption: string;
      productLabel: string;
      productInfoButton: string;
      removeButton: string;
      editButton: string;
      seeMoreButton: string;
      closeButton: string;
      launchFullScreen: string;
      startButton: string;
      softphone: string;
      totalCallTime: string;
      minutes: string;
      seconds: string;
      callerOne: string;
      callerTwo: string;
      activeCallTime: string;
      pauseTime: string;
      onHold: string;
      onMute: string;
      connectingMsg: string;
      caller1AndCaller2NameConnectLabel: string;
      exitInstructions: string;
      originLabel: string;
      queueLabel: string;
      viewCaseButton: string;
      transfersLabel: string;
      waitLabel: string;
      talkLabel: string;
      consultPane: {
        consultInputPlaceholder: string;
        commentsLabel: string;
        commentsPlaceholder: string;
        availableStatus: string;
        offlineStatus: string;
        chatLabel: string;
        phoneLabel: string;
        emailLabel: string;
        otherLabel: string;
        mostCommonLabel: string;
        phoneIconLabel: string;
        chatIconLabel: string;
        emailIconLabel: string;
        waitTimeLabel: string;
        consultButton: string;
      };
    };
  };
}

export interface RecommendationNoneType {
  $: {
    displayId: string;
  };
  noRecommendations: string;
}

export interface RecommendationType {
  $: {
    displayId: string;
  };
  noRecommendations?: string;
  solutions?: RecommendationSolutionsType;
  issues?: RecommendationIssuesType;
}

export interface RecommendationSolutionsType {
  solutionsTitleImg: {
    $: {
      img: string;
    };
  };
  solutionsTitle: string;
  solutionsArticle: RecommendationContentArticleType[];
}

export interface RecommendationIssuesType {
  header: {
    issueTitleText: string;
    element: {
      $: {
        type: string;
        name: string;
      };
      options: {
        option: {
          value: string;
        }[];
      };
    };
    issueNew: {
      $: {
        img: string;
      };
    };
    issueRelated: {
      $: {
        img: string;
      };
    };
  };
  issuesArticle: RecommendationIssueArticleType[];
}

export interface RecommendationIssueArticleType {
  $: {
    img: string;
  };
  type: string;
  title: string;
  description: string;
  moreButton: string;
  lessButton: string;
}

export interface RecommendationContentArticleType {
  $: {
    type: string;
  };
  articleType: string;
  title: string;
  description: string;
  moreButton: string;
  lessButton: string;
}

export interface WorkflowDataType {
  name: string;
  rules?: {
    rule: Rule[];
  };
  steps: Step[];
  // @ts-ignore
  metadata: WorkflowMetaData;
  // @ts-ignore
  history: Record<number, object>;
  // @ts-ignore
  context: WorkflowContextData;
}

export interface WorkflowContextData {
  currentStepIndex: number;
  loaded: boolean;
  events: EventProps[];
  errors: { [index: string]: string }; // track precondition errors

  /* ------ focus element ----- */
  focus: string;

  /* ----- case view ----- */
  caseViewHistorySortBy: string;
  caseViewHistorySortDir: string;

  /* ----- classification ------ */
  /** Topic value at the top of the classification panel */
  topic: string;
  /** The active product data */
  product: ProductType;
  /** The active component data */
  component: ComponentType;
  /** The active issue data */
  issue: IssueType;
  /** Determines the view state for classification panel: case_log & troubleshoot */
  view: 'case_log' | 'troubleshoot' | 'combined';
  /** The select issue points to a specific troubleshootId */
  troubleshootId: string | null;
  components: ComponentType[];
  issues: IssueType[];
  activeProductIndex: number;
  activeComponentIndex: number;
  activeIssueIndex: number;

  /* ----- softphone ----- */
  timers: {
    startSession: Date;
    sessionTime: string;
    talkTime: string;
    holdTime: string;
    talkTimeMilliseconds: number;
    holdTimeMilliseconds: 0;
    sessionTimeMilliseconds: 0;
    hold: false;
    mute: false;
    showInfoPopup: false;
  };
}

export interface WorkflowMetaData {
  caseView: CaseViewType;
  coreClassificationPane: CoreClassificationPane;
  coreSoftphone: CoreSoftphoneType;
  recommendations: {
    setup: {
      accessibilityLabels: RecommendationLabels;
    };
    recommendation: RecommendationType[];
  };
}

export interface RecommendationLabels {
  actionsLabel: string;
  issuesLabel: string;
  solutionsLabel: string;
  viewAllLabel: string;
  createNewLabel: string;
}

// Type Checking State
export interface WorkflowState {
  [workflow: string]: WorkflowDataType;
}

export interface Rule {
  $: {
    name: string;
    field: string;
    type: string;
  };
  requiredIf?: {
    $: {
      field: string;
      operator: string;
      value: string;
    };
  };
  errorMessage: string;
}

export interface Step {
  $: {
    step?: string;
  };
  proctorWindow?: {
    $: {
      top: string;
      left?: string;
      right?: string;
      width: string;
    };
  };
  title: string;
  content: string;
  target?: StepTarget;
  buttonText: string;
  events?: TriggerEvent | TriggerEvent[];
  preconditions?: {
    $: {
      value: string;
    };
  };
  conditions?: {
    condition: Condition[];
  };
  consequences?: {
    consequence: Consequence[];
  };
  completed: boolean;
}

export interface StepTarget {
  $: {
    id: string;
    type: string;
    scrollElement?: string;
    scrollTo?: string;
  };
  tooltip?: StepTooltip;
}

export interface StepTooltip {
  $: {
    position: string;
    wrap?: string;
  };
  content: string;
}

export interface TriggerEvent {
  $: {
    type: string;
    name: string;
  };
}

export interface Condition {
  $: {
    field: string;
    operator: string;
    value: string | null;
    extra?: object;
    type?: string;
    name?: string;
  };
  value?: string;
}

export interface Consequence {
  $: {
    type: string;
    params: string;
  };
}

export interface EventProps {
  name: string;
  type: string;
  triggerTime?: string;
}

export interface WorkflowEvent {
  name: string;
  type: 'click' | 'change';
}

export interface WorkflowError {
  [field: string]: string;
}

export interface HoldMuteProps {
  hold: boolean;
  mute: boolean;
}

interface TimersProps {
  startSession: Date;
  sessionTime: string;
  talkTime: string;
  holdTime: string;
  talkTimeMilliseconds: number;
  holdTimeMilliseconds: number;
  sessionTimeMilliseconds: number;
  hold: boolean;
  mute: boolean;
  showInfoPopup: boolean;
}

export interface ProductType {
  $: {
    img: string;
  };
  name: string;
  components: {
    component: ComponentType[];
  };
}

export interface ComponentType {
  name: string;
  issues: {
    issue: IssueType[];
  };
}

export interface IssueType {
  $: {
    correct: string;
    troubleshootId: string;
  };
  name: string;
}

// Type Checking Actions
interface LoadDataAction {
  type: typeof LOAD_DATA;
  workflow: string;
  name: string;
  rules?: {
    rule: Rule[];
  };
  steps: Step[];
  // @ts-ignore
  metadata: WorkflowMetaData;
}

interface NextAction {
  type: typeof NEXT;
  workflow: string;
  currentStepIndex: number;
}

interface NextStateAction {
  type: typeof NEXT_STATE;
  workflow: string;
  currentStepIndex: number;
}

interface PrevStateAction {
  type: typeof PREV_STATE;
  workflow: string;
  currentStepIndex: number;
}

interface ResetStateAction {
  type: typeof RESET_STATE;
  workflow: string;
}

interface UpdateFieldAction {
  type: typeof UPDATE_FIELD;
  workflow: string;
  data: {
    name: string;
    value: string | number | object[];
  };
}

interface UpdateFieldsAction {
  type: typeof UPDATE_FIELDS;
  workflow: string;
  data: {
    [key: string]: string | number | object[];
  };
}

interface UpdateViewAction {
  type: typeof UPDATE_VIEW;
  workflow: string;
  data: string;
}

interface UpdateTopicAction {
  type: typeof UPDATE_TOPIC;
  workflow: string;
  value: string;
}

interface UpdateProductAction {
  type: typeof UPDATE_PRODUCT;
  workflow: string;
  data: ProductType;
}

interface UpdateComponentAction {
  type: typeof UPDATE_COMPONENT;
  workflow: string;
  data: ComponentType;
}

interface UpdateIssueAction {
  type: typeof UPDATE_ISSUE;
  workflow: string;
  data: IssueType;
}

interface ResetAllErrorsAction {
  type: typeof RESET_ALL_ERRORS;
  workflow: string;
}

interface ResetErrorAction {
  type: typeof RESET_ERROR;
  workflow: string;
  data: string;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  workflow: string;
  data: {
    field: string;
    errorMessage: string;
  };
}

interface TriggerEventAction {
  type: typeof TRIGGER_EVENT;
  workflow: string;
  data: WorkflowEvent;
}

interface SessionTimeAction {
  type: typeof SESSION_TIME;
  workflow: string;
}

interface StartHoldAction {
  type: typeof START_HOLD;
  workflow: string;
  data: HoldMuteProps;
}

interface StopHoldAction {
  type: typeof STOP_HOLD;
  workflow: string;
  data: HoldMuteProps;
}

interface StartMuteAction {
  type: typeof START_MUTE;
  workflow: string;
  data: HoldMuteProps;
}

interface StopMuteAction {
  type: typeof STOP_MUTE;
  workflow: string;
  data: HoldMuteProps;
}

interface ShowInfoAction {
  type: typeof SHOW_INFO;
  workflow: string;
}

interface HideInfoAction {
  type: typeof HIDE_INFO;
  workflow: string;
}

export type WorkflowActionTypes =
  | LoadDataAction
  | NextAction
  | NextStateAction
  | PrevStateAction
  | ResetStateAction
  | UpdateFieldAction
  | UpdateFieldsAction
  | UpdateViewAction
  | UpdateTopicAction
  | UpdateProductAction
  | UpdateComponentAction
  | UpdateIssueAction
  | ResetAllErrorsAction
  | ResetAllErrorsAction
  | ResetErrorAction
  | SetErrorAction
  | TriggerEventAction
  | SessionTimeAction
  | StartHoldAction
  | StopHoldAction
  | StartMuteAction
  | StopMuteAction
  | ShowInfoAction
  | HideInfoAction;

/* Action Creators */

/**
 * workflow: name of workflow,
 * name: workflow title,
 * rules: precondition rules
 * steps: workflow steps data
 * metadata: necessary data for workflow
 */
export const loadData = ({
  workflow,
  name,
  rules,
  steps,
  metadata,
}: {
  workflow: string;
  name: string;
  rules?: {
    rule: Rule[];
  };
  steps: Step[];
  // @ts-ignore
  metadata: WorkflowMetaData;
}): WorkflowActionTypes => ({
  type: LOAD_DATA,
  workflow,
  name,
  rules,
  steps,
  metadata,
});

/**
 * load workflow settings
 * @param workflow - name of workflow, reach from path, /#/:workflow
 * @param language - language
 */
export const loadSteps = (workflow: string, language: string) => {
  return (dispatch: Dispatch) => {
    // @ts-ignore
    import(`../../data/${language}/${workflow}`).then(
      (workflowData: {
        default: {
          [index: string]: string;
        };
      }) => {
        const config = workflowData.default;

        // @ts-ignore
        Promise.all([
          loadXML(config.workflow), // load workflow.xml
          ...Object.keys(config) // load other xml files as metadata
            .filter(key => key !== 'workflow')
            .map(key => loadXML(config[key])),
          // @ts-ignore
        ]).then(([workflowConfig, ...rest]) => {
          // @ts-ignore
          const metadata = rest.reduce((result: object, item: object) => {
            result = { ...result, ...item };
            return result;
          }, {});
          const settings = Object.assign({ ...workflowConfig.settings }, [metadata]);
          const stepsData = xmlToSteps(settings.workflow.steps);
          const { name } = settings.workflow;
          const { rules } = settings.workflow;

          dispatch(
            loadData({
              workflow,
              name,
              rules,
              steps: stepsData,
              metadata,
            })
          );
        });
      }
    );
  };
};

/**
 * Go to next step of workflow
 * @params workflow - name of workflow
 * @params currentStepIndex - current step index
 */
export function nextStep(workflow: string, currentStepIndex: number): WorkflowActionTypes {
  return {
    type: NEXT,
    workflow,
    currentStepIndex: currentStepIndex + 1,
  };
}

/**
 * Navigate to next history state
 * @params workflow - name of workflow
 * @params currentStepIndex - current step index
 */
export function nextState(workflow: string, currentStepIndex: number): WorkflowActionTypes {
  return {
    type: NEXT_STATE,
    workflow,
    currentStepIndex: currentStepIndex + 1,
  };
}

/**
 * Navigate to previous history state
 * @params workflow - name of workflow
 * @params currentStepIndex - current step index
 */
export function prevState(workflow: string, currentStepIndex: number): WorkflowActionTypes {
  return {
    type: PREV_STATE,
    workflow,
    currentStepIndex: currentStepIndex - 1,
  };
}

/**
 * Reset state of workflow to inital state
 * @params workflow - name of workflow
 */
export function resetState(workflow: string): WorkflowActionTypes {
  return {
    type: RESET_STATE,
    workflow,
  };
}

/**
 * Update a field in context
 * @params workflow - name of workflow
 * @params data - An object with two properties:
 *  - name: name of field
 *  - value: value of field
 */
export const updateField = (
  workflow: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  data: { name: string; value: any }
): WorkflowActionTypes => ({
  type: UPDATE_FIELD,
  workflow,
  data,
});

/**
 * Update many fields in context
 * @params workflow - name of workflow
 * @params data - An object with [field name]: [field value] pairs
 */
export const updateFields = (
  workflow: string,
  data: { [key: string]: string }
): WorkflowActionTypes => ({
  type: UPDATE_FIELDS,
  workflow,
  data,
});

/**
 * Update topic
 * @params workflow - name of workflow
 * @params value - topic
 */
export const updateTopic = (workflow: string, value: string): WorkflowActionTypes => ({
  type: UPDATE_TOPIC,
  workflow,
  value,
});

/**
 * Update product
 * @params workflow - name of workflow
 * @params data - selected product object
 */
export const updateProduct = (workflow: string, data: ProductType): WorkflowActionTypes => ({
  type: UPDATE_PRODUCT,
  workflow,
  data,
});

/**
 * Update component
 * @params workflow - name of workflow
 * @params data - selected component object
 */
export const updateComponent = (workflow: string, data: ComponentType): WorkflowActionTypes => ({
  type: UPDATE_COMPONENT,
  workflow,
  data,
});

/**
 * Update issue
 * @params workflow - name of workflow
 * @params data - selected issue object
 */
export const updateIssue = (workflow: string, data: IssueType): WorkflowActionTypes => ({
  type: UPDATE_ISSUE,
  workflow,
  data,
});

/**
 * Update view
 * @params workflow - name of workflow
 * @params data - enum values: 'case_log' | 'troubleshoot' | 'combined'
 */
export const updateView = (workflow: string, data = 'case_log'): WorkflowActionTypes => ({
  type: UPDATE_VIEW,
  workflow,
  data,
});

/**
 * Reset all precondition errors
 * @params workflow - name of workflow
 */
export const resetAllErrors = (workflow: string): WorkflowActionTypes => ({
  type: RESET_ALL_ERRORS,
  workflow,
});

/**
 * Reset single precondition errors
 * @params workflow - name of workflow
 */
export const resetError = (workflow: string, field: string): WorkflowActionTypes => ({
  type: RESET_ERROR,
  workflow,
  data: field,
});

/**
 * Set error of field failed preCondition check
 * @params workflow - name of workflow
 * @params data - object with two properties:
 *  - field: name of field,
 *  - errorMessage: error message to show
 */
export const setError = (
  workflow: string,
  data: { field: string; errorMessage: string }
): WorkflowActionTypes => ({
  type: SET_ERROR,
  workflow,
  data,
});

/**
 * Used to send event
 * @params workflow - name of workflow
 * @params data - an object with two properties:
 *  - name: name of the element or field,
 *  - type: the event type, enum values, 'click' | 'change'
 */
export const trigger = (workflow: string, data: WorkflowEvent): WorkflowActionTypes => ({
  type: TRIGGER_EVENT,
  workflow,
  data,
});

/**
 * Timer for softphone, increase per second.
 * @params workflow - name of workflow
 */
export const incrementTime = (workflow: string): WorkflowActionTypes => ({
  type: SESSION_TIME,
  workflow,
});

/**
 * Show info (softphone)
 * @params workflow - name of workflow
 */
export const showInfo = (workflow: string): WorkflowActionTypes => ({
  type: SHOW_INFO,
  workflow,
});

/**
 * Hide info (softphone)
 * @params workflow - name of workflow
 */
export const hideInfo = (workflow: string): WorkflowActionTypes => ({
  type: HIDE_INFO,
  workflow,
});

/**
 * TODO: remove data?
 * Mute (softphone)
 * @params workflow - name of workflow
 * @params data - object with two properties:
 *  - mute: boolean, mute status
 *  - hold: boolean, hold status
 */
export const startMute = (workflow: string, data: HoldMuteProps): WorkflowActionTypes => ({
  type: START_MUTE,
  workflow,
  data,
});

/**
 * Stop mute (softphone)
 * @params workflow - name of workflow
 * @params data - object with two properties:
 *  - mute: boolean, mute status
 *  - hold: boolean, hold status
 */
export const stopMute = (workflow: string, data: HoldMuteProps): WorkflowActionTypes => ({
  type: STOP_MUTE,
  workflow,
  data,
});

/**
 * Hold (softphone)
 * @params workflow - name of workflow
 * @params data - object with two properties:
 *  - mute: boolean, mute status
 *  - hold: boolean, hold status
 */
export const startHold = (workflow: string, data: HoldMuteProps): WorkflowActionTypes => ({
  type: START_HOLD,
  workflow,
  data,
});

/**
 * Stop hold (softphone)
 * @params workflow - name of workflow
 * @params data - object with two properties:
 *  - mute: boolean, mute status
 *  - hold: boolean, hold status
 */
export const stopHold = (workflow: string, data: HoldMuteProps): WorkflowActionTypes => ({
  type: STOP_HOLD,
  workflow,
  data,
});

// Helper functions, create time for softphone session
const startTimer = () => {
  const time = Date.now();
  return time;
};

// Reducers
const initialState: WorkflowState = {};

// default context value
const initialContext = {
  // workflow process data
  /* ----- workflow ----- */
  currentStepIndex: 0,
  loaded: true,
  events: [], // track events, which element clicked
  errors: {}, // track precondition errors

  /* ----- classification ------ */
  /** Topic value at the top of the classification panel */
  topic: '',
  /** The active product data */
  product: undefined,
  /** The active component data */
  component: undefined,
  /** The active issue data */
  issue: undefined,
  /** Determines the view state for classification panel: case_log & troubleshoot */
  view: 'case_log',
  /** The select issue points to a specific troubleshootId */
  troubleshootId: null,

  /* ----- softphone ----- */
  timers: {
    startSession: startTimer(),
    sessionTime: '00:00',
    talkTime: '00:00',
    holdTime: '00:00',
    talkTimeMilliseconds: 0,
    holdTimeMilliseconds: 0,
    sessionTimeMilliseconds: 0,
    hold: false,
    mute: false,
    showInfoPopup: false,
  },
};

export default function reducer(state = initialState, action: WorkflowActionTypes): WorkflowState {
  switch (action.type) {
    case LOAD_DATA: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          name: action.name,
          rules: action.rules, // list of rules for precondition validation
          steps: action.steps, // workflow steps settings, including events, preconditions, conditions, consequences
          metadata: action.metadata, // necessary data for workflow forms
          history: {}, // track history state of all steps, key: step index, value: context
          context: {
            ...initialContext,
          },
        },
      };
    }
    case NEXT: {
      if (
        (state[action.workflow].context.currentStepIndex as number) + 1 ===
        action.currentStepIndex
      ) {
        return {
          ...state,
          [action.workflow]: {
            ...state[action.workflow],
            steps: state[action.workflow].steps.map((step: Step, i: number) => {
              if (action.currentStepIndex - 1 > i) {
                return {
                  // @ts-ignore
                  ...step,
                  completed: true,
                };
              }
              return step;
            }),
            context: {
              ...state[action.workflow].context,
              currentStepIndex: action.currentStepIndex,
            },
            history: {
              ...state[action.workflow].history,
              [state[action.workflow].context.currentStepIndex as number]: state[action.workflow]
                .context,
            },
          },
        };
      }
      return state;
    }
    case PREV_STATE: {
      if (
        (state[action.workflow].context.currentStepIndex as number) - 1 ===
          action.currentStepIndex &&
        action.currentStepIndex >= 0
      ) {
        // @ts-ignore
        return {
          ...state,
          [action.workflow]: {
            ...state[action.workflow],
            context: {
              ...get(state[action.workflow].history, action.currentStepIndex, {}),
              events: [], // should not trigger workflow
            },
            history: {
              ...state[action.workflow].history,
              [state[action.workflow].context.currentStepIndex as number]: state[action.workflow]
                .context,
            },
          },
        };
      }
      return state;
    }
    case NEXT_STATE: {
      if (
        (state[action.workflow].context.currentStepIndex as number) + 1 ===
          action.currentStepIndex &&
        has(state.history, action.currentStepIndex)
      ) {
        return {
          ...state,
          [action.workflow]: {
            ...state[action.workflow],
            context: {
              ...state[action.workflow].context, // keep original state to prevent state from missing changes
              ...get(state[action.workflow].history, action.currentStepIndex, {}),
              events: [], // should not trigger workflow
            },
            history: {
              ...state[action.workflow].history,
              [state[action.workflow].context.currentStepIndex as number]: state[action.workflow]
                .context,
            },
          },
        };
      }
      return state;
    }
    case RESET_STATE: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          history: {},
          context: {
            ...initialContext,
            loaded: true,
          },
        },
      };
    }
    case UPDATE_FIELD: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            [action.data.name]: action.data.value,
          },
        },
      };
    }
    case UPDATE_FIELDS: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            ...action.data,
          },
        },
      };
    }
    case UPDATE_TOPIC: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            topic: action.value,
          },
        },
      };
    }
    case UPDATE_PRODUCT: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            product: action.data,
          },
        },
      };
    }
    case UPDATE_COMPONENT: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            component: action.data,
          },
        },
      };
    }
    case UPDATE_ISSUE: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            issue: action.data,
          },
        },
      };
    }
    case UPDATE_VIEW: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            view: action.data,
          },
        },
      };
    }
    case RESET_ALL_ERRORS: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            errors: {},
          },
        },
      };
    }
    case RESET_ERROR: {
      const errors = get(state[action.workflow], 'context.errors', {});
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { [action.data]: restErrors } = errors;
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            errors: restErrors,
          },
        },
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            errors: {
              ...(state[action.workflow].context.errors as WorkflowError),
              [action.data.field]: action.data.errorMessage,
            },
          },
        },
      };
    }
    case TRIGGER_EVENT: {
      const events: EventProps[] =
        (state[action.workflow].context.events as EventProps[]) || ([] as EventProps[]);
      // @ts-ignore
      const index = events.findIndex(item => item.name === action.data.name);
      if (index !== -1) {
        const event: EventProps = events[index];
        // @ts-ignore
        return {
          ...state,
          [action.workflow]: {
            ...state[action.workflow],
            context: {
              ...state[action.workflow].context,
              events: [
                ...events.slice(0, index),
                {
                  ...event,
                  triggerTime: new Date(),
                },
                ...events.slice(index + 1),
              ],
            },
          },
        };
      }
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            events: [
              ...(state[action.workflow].context.events as EventProps[]),
              {
                ...action.data,
                triggerTime: new Date(),
              },
            ],
          },
        },
      };
    }
    case SESSION_TIME: {
      const currentTimers: TimersProps = state[action.workflow].context.timers as TimersProps;
      let { sessionTimeMilliseconds } = currentTimers;
      let { holdTimeMilliseconds } = currentTimers;
      let { talkTimeMilliseconds } = currentTimers;

      const formatTime = (timeInMilliseconds: number) => {
        const timeTemp = new Date(timeInMilliseconds);
        const secs = timeTemp.getSeconds();
        const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
        const mins = timeTemp.getMinutes();
        const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
        return `${formattedMins}:${formattedSecs}`;
      };

      if (currentTimers.hold === true) holdTimeMilliseconds += 1000;

      const holdTimeOutput = formatTime(holdTimeMilliseconds);

      if (currentTimers.hold === false) talkTimeMilliseconds += 1000;

      const talkTimeOutput = formatTime(talkTimeMilliseconds);

      sessionTimeMilliseconds += 1000;
      const sessionTime = formatTime(sessionTimeMilliseconds);
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              sessionTime,
              talkTime: talkTimeOutput,
              holdTime: holdTimeOutput,
              sessionTimeMilliseconds,
              talkTimeMilliseconds,
              holdTimeMilliseconds,
            },
          },
        },
      };
    }
    case START_HOLD: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              ...action.data,
            },
          },
        },
      };
    }
    case STOP_HOLD: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              ...action.data,
            },
          },
        },
      };
    }
    case START_MUTE: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              hold: action.data.hold,
              mute: action.data.mute,
            },
          },
        },
      };
    }
    case STOP_MUTE: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              hold: action.data.hold,
              mute: action.data.mute,
            },
          },
        },
      };
    }
    case HIDE_INFO: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              showInfoPopup: false,
            },
          },
        },
      };
    }
    case SHOW_INFO: {
      // @ts-ignore
      return {
        ...state,
        [action.workflow]: {
          ...state[action.workflow],
          context: {
            ...state[action.workflow].context,
            timers: {
              ...(state[action.workflow].context.timers as TimersProps),
              showInfoPopup: true,
            },
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}
