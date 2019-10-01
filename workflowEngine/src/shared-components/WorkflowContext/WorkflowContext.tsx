import React from 'react';
import { WorkflowDataType } from '../../redux/modules/workflow';
import { WorkflowActions } from '../../pages/Workflow';

export interface WorkflowContextProps {
  workflowData: WorkflowDataType;
  actions: WorkflowActions;
}

// eslint-disable-next-line
const WorkflowContext = React.createContext<WorkflowContextProps>({} as WorkflowContextProps);

// eslint-disable-next-line
export const connect = (WrappedComponent: any, selector: Function) => (props: any) => {
  const selectors = selector(props);
  return <WrappedComponent {...selectors} {...props} />;
};

export default WorkflowContext;

export const WorkflowContextProvider = WorkflowContext.Provider;
export const WorkflowContextConsumer = WorkflowContext.Consumer;
