import React, {
  FC,
  CSSProperties,
  MouseEvent,
  RefObject,
  createRef,
  memo,
  useContext,
  useState,
  useEffect,
} from 'react';
import Draggable from 'react-draggable';
import compact from 'lodash.compact';
import get from 'lodash.get';
import has from 'lodash.has';
import WorkflowContext, { connect } from '../../shared-components/WorkflowContext/WorkflowContext';
import { Step } from '../../redux/modules/workflow';
import {
  Layover,
  Popper,
  Proctor,
  ProctorButton,
  ProctorTitle,
  ProctorContent,
  ProctorHintButton,
  ProctorCloseButton,
  ProctorPrevButton,
  ProctorRefreshButton,
  ProctorFooter,
  DragHeader,
} from './ProctorWindow_Styled';

interface ProctorWindowProps {
  proctorWindowLabel: string;
  closeProctorWindowLabel: string;
  backLabel: string;
  restartSimulationLabel: string;
  history: Record<number, object>;
  steps: Step[];
  currentStepIndex: number;
  totalSteps: number;
  onPrevState: (index: number) => void;
  onNextState: (index: number, history?: Record<number, object>) => void;
  onReset: () => void;
}

interface ProctorWindowState {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  myRef: RefObject<HTMLButtonElement>;
  active: boolean;
}

/**
 * The ProctorWindow accepts the step data and displays the current
 * step of the workflow. It is currently only responsible for
 * displaying the the data. It also works along side the StepWrapper
 * component to ensure that the steps are being updated.
 */
const ProctorWindowComponent: FC<ProctorWindowProps> = ({
  proctorWindowLabel,
  closeProctorWindowLabel,
  backLabel,
  restartSimulationLabel,
  currentStepIndex,
  steps,
  totalSteps,
  onPrevState,
  onNextState,
  onReset,
}) => {
  const { proctorWindow, title, content, target, buttonText } = steps[currentStepIndex];
  const targets = Array.isArray(target) ? target : [target];
  const buttonRef = createRef<HTMLButtonElement>();
  const backwardDisabled = currentStepIndex === 0;
  const tooltipText = compact(
    compact(targets).reduce((result: string[], target) => {
      result.push(get(target, 'tooltip.content', ''));
      return result;
    }, [])
  ).join(' ');

  // state
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [myRef, setMyRef] = useState<RefObject<HTMLButtonElement> | null>(
    createRef<HTMLButtonElement>()
  );

  /**
   * Attempt to hide the proctor window rather than closing to
   * allow the role="status" updates during voice over on hide.
   * @type {{zIndex: string, opacity: string, width: string}}
   */
  const style: CSSProperties = {
    zIndex: open ? 1001 : -1,
    opacity: open ? 1 : 0,
    width: open ? 0 : 0,
  };
  const defaultPosition: CSSProperties = proctorWindow ? proctorWindow.$ : {};

  useEffect(() => {
    if (myRef && myRef.current) {
      setAnchorEl(myRef.current);
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (totalSteps === currentStepIndex) {
      setOpen(true);
    }

    if (compact(targets).length > 0) {
      targets.forEach(item => {
        const targetEl = document.querySelector(`#${get(item, '$.id')}`);
        const { tooltip } = item;
        if (targetEl) {
          (targetEl as HTMLElement).style.zIndex = active ? '20000' : 'auto';
          if (tooltip) {
            if (!active) {
              (targetEl as HTMLElement).removeAttribute('data-error');
              (targetEl as HTMLElement).removeAttribute('data-error-position');
              if (has(tooltip, '$.wrap')) {
                (targetEl as HTMLElement).removeAttribute('data-error-wrap');
              }
            } else {
              (targetEl as HTMLElement).setAttribute('data-error', get(tooltip, 'content'));
              (targetEl as HTMLElement).setAttribute(
                'data-error-position',
                get(tooltip, '$.position', 'bottom')
              );
              if (has(tooltip, '$.wrap')) {
                (targetEl as HTMLElement).setAttribute('data-error-wrap', get(tooltip, '$.wrap'));
              }
            }
          }
        }
      });
    }
  }, [active, currentStepIndex, totalSteps]);

  /**
   * Handles the open state of the proctor window
   * @param event - default object argument from event handling methods
   */
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setOpen(!open);
  };

  /**
   * Handles the hint modal effect by updating the zIndex of the target id element
   * @param target - id of the target element
   */
  const handleHintModal = (event: MouseEvent) => {
    event.preventDefault();
    if (buttonRef !== null && buttonRef.current !== null) {
      buttonRef.current.focus();
    }
    targets.forEach(item => {
      const targetEl = document.querySelector(`#${get(item, '$.id')}`);
      const { tooltip } = item;
      if (targetEl) {
        const scrollElementId = get(item, '$.scrollElement', null);
        const scrollTo = get(item, '$.scrollTo', null);
        if (scrollElementId) {
          const scrollEl = document.querySelector(`#${scrollElementId}`);
          if (scrollEl && scrollTo) {
            switch (scrollTo) {
              case 'top':
                scrollEl.scrollTop = 0;
                break;
              case 'bottom':
                scrollEl.scrollTop = scrollEl.scrollHeight;
                break;
            }
          }
        }

        (targetEl as HTMLElement).style.zIndex = active ? 'auto' : '20000';
        if (tooltip) {
          if (active) {
            (targetEl as HTMLElement).removeAttribute('data-error');
            (targetEl as HTMLElement).removeAttribute('data-error-position');
            if (has(tooltip, '$.wrap')) {
              (targetEl as HTMLElement).removeAttribute('data-error-wrap');
            }
          } else {
            (targetEl as HTMLElement).setAttribute('data-error', get(tooltip, 'content'));
            (targetEl as HTMLElement).setAttribute(
              'data-error-position',
              get(tooltip, '$.position', 'bottom')
            );
            if (has(tooltip, '$.wrap')) {
              (targetEl as HTMLElement).setAttribute('data-error-wrap', get(tooltip, '$.wrap'));
            }
          }
        }
      }
    });

    setActive(!active);
  };

  // Ensures that the hint state deactivates whenever the user clicks elsewhere
  const handleButtonBlur = () => {
    if (active) {
      setActive(false);
    }
  };

  const handleNextClick = () => {
    onNextState(currentStepIndex);
  };

  const handlePrevClick = () => {
    onPrevState(currentStepIndex);
  };

  if (!target) {
    return (
      <React.Fragment>
        <Layover active={active} />
        <ProctorButton onClick={handleClick} ref={myRef}>
          {open ? 'Hide' : 'Hint'}
        </ProctorButton>
        {open && (
          <Draggable handle="#drag-me">
            <Popper style={style}>
              <Proctor
                tabIndex={0}
                role="group"
                aria-label={proctorWindowLabel}
                style={defaultPosition}
              >
                <DragHeader id="drag-me" />
                <ProctorTitle>{title}</ProctorTitle>
                <ProctorContent dangerouslySetInnerHTML={{ __html: content }} />
              </Proctor>
            </Popper>
          </Draggable>
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Layover active={active} />
      <ProctorButton onClick={handleClick} ref={myRef}>
        {open ? 'Hide' : 'Hint'}
      </ProctorButton>
      {open && (
        <Draggable handle="#drag-me">
          <Popper style={style}>
            <Proctor
              tabIndex={0}
              role="group"
              aria-label={proctorWindowLabel}
              style={defaultPosition}
            >
              <DragHeader id="drag-me" />
              <ProctorCloseButton
                onClick={handleClick}
                ref={myRef}
                title={closeProctorWindowLabel}
                role="group"
              />
              <ProctorTitle>{title}</ProctorTitle>
              <ProctorContent dangerouslySetInnerHTML={{ __html: content }} />

              <ProctorFooter>
                <ProctorHintButton
                  onBlur={handleButtonBlur}
                  onMouseDown={handleHintModal}
                  ref={buttonRef}
                  title={tooltipText}
                >
                  <span aria-hidden="true">{buttonText}</span>
                </ProctorHintButton>

                {!backwardDisabled && (
                  <ProctorPrevButton onClick={handlePrevClick} title={backLabel}>
                    <span aria-hidden="true">&lt;</span>
                  </ProctorPrevButton>
                )}

                <ProctorRefreshButton onClick={onReset} title={restartSimulationLabel}>
                  <span aria-hidden="true">&#8635;</span>
                </ProctorRefreshButton>
              </ProctorFooter>
            </Proctor>
          </Popper>
        </Draggable>
      )}
    </React.Fragment>
  );
};

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: {
            proctorWindowLabel,
            closeProctorWindowLabel,
            backLabel,
            restartSimulationLabel,
          },
        },
      },
    },
  } = workflowData;

  return {
    proctorWindowLabel,
    closeProctorWindowLabel,
    backLabel,
    restartSimulationLabel,
  };
};

export default connect(
  memo(ProctorWindowComponent),
  selector
);
