import React, { FC, useContext } from 'react';
import WorkflowContext, {
  connect,
} from '../../../../../shared-components/WorkflowContext/WorkflowContext';
import TextField from '../../../../../shared-components/Fields/TextField/TextField';
import ExpandLink from '../../../../../shared-components/ExpandLink/ExpandLink';
import Line from '../../../../../shared-components/Line/Line';
import {
  CaseContactExpandInputHolder,
  CaseContactExpandLabel,
  CaseContactContainer,
  CaseContactField,
} from './CaseContactExpand_Styled';
import { Row } from '../../../Classification_Styled';

interface CaseContactProps {
  caseContactSectionLabel: string;
  firstNameInputLabel: string;
  lastNameInputLabel: string;
  phoneInputLabel: string;
  emailInputLabel: string;
  fields: CaseContactFieldsType;
  label: string;
}

interface CaseContactFieldsType {
  element: CaseContactElementType[];
}

interface CaseContactElementType {
  $: {
    type: string;
  };
  label: string;
  field: CaseContactFieldType | CaseContactFieldType[];
}

interface CaseContactFieldType {
  placeholder: string;
  defaultValue: string;
}

interface CaseContactAriaLabels {
  firstNameInputLabel: string;
  lastNameInputLabel: string;
  phoneInputLabel: string;
  emailInputLabel: string;
}

/**
 * Render the input field for Case Contacts
 * @param field - data for input fields
 * @returns {*}
 */
const renderField = (
  field: CaseContactFieldType | CaseContactFieldType[],
  ariaLabels: CaseContactAriaLabels
) => {
  const { firstNameInputLabel, lastNameInputLabel, phoneInputLabel, emailInputLabel } = ariaLabels;
  if (Array.isArray(field)) {
    return field.map(({ defaultValue = undefined, placeholder }, i) => {
      let ariaLabel = '';
      if (/first name/gi.test(placeholder)) {
        ariaLabel = firstNameInputLabel;
      } else if (/last name/gi.test(placeholder)) {
        ariaLabel = lastNameInputLabel;
      } else if (/phone/gi.test(placeholder)) {
        ariaLabel = phoneInputLabel;
      } else if (/email/gi.test(placeholder)) {
        ariaLabel = emailInputLabel;
      }
      return (
        <TextField
          aria-label={ariaLabel}
          value={defaultValue}
          placeholder={placeholder}
          key={`case_contact_field_${i + 1}`}
        />
      );
    });
  }
  const { defaultValue = undefined, placeholder } = field;
  let ariaLabel = '';
  if (/first name/gi.test(placeholder)) {
    ariaLabel = firstNameInputLabel;
  } else if (/last name/gi.test(placeholder)) {
    ariaLabel = lastNameInputLabel;
  } else if (/phone/gi.test(placeholder)) {
    ariaLabel = phoneInputLabel;
  } else if (/email/gi.test(placeholder)) {
    ariaLabel = emailInputLabel;
  }
  return <TextField aria-label={ariaLabel} value={defaultValue} placeholder={placeholder} />;
};

/**
 * Render the field rows with labels. Each row can contain multiple
 * input fields, but only one label.
 * @param element - data for each row
 * @returns {*[]}
 */
const renderFields = ({ element }: CaseContactFieldsType, ariaLabels: CaseContactAriaLabels) => {
  return element.map((item: CaseContactElementType, i: number) => {
    return (
      <CaseContactContainer key={`case_contact_fields_${i + 1}`}>
        <CaseContactField>
          <CaseContactExpandLabel>{item.label}</CaseContactExpandLabel>
          <CaseContactExpandInputHolder>
            <div>{renderField(item.field, ariaLabels)}</div>
          </CaseContactExpandInputHolder>
        </CaseContactField>
        <Line aria-hidden="true" />
      </CaseContactContainer>
    );
  });
};

/**
 * Case Contact component in charge of rendering the expand link
 * along with the hidden contents.
 * @param caseContact - case contact information
 * @param nextStep - the step action used to trigger the next step
 */
const CaseContactComponent: FC<CaseContactProps> = React.memo(
  ({
    caseContactSectionLabel,
    firstNameInputLabel,
    lastNameInputLabel,
    phoneInputLabel,
    emailInputLabel,
    fields,
    label,
  }) => (
    <ExpandLink text={label}>
      <Row aria-label={caseContactSectionLabel}>
        {renderFields(fields, {
          firstNameInputLabel,
          lastNameInputLabel,
          phoneInputLabel,
          emailInputLabel,
        })}
      </Row>
    </ExpandLink>
  )
);

const selector = () => {
  const { workflowData } = useContext(WorkflowContext);
  const {
    metadata: {
      coreClassificationPane: {
        setup: {
          accessibilityLabels: {
            caseContactSectionLabel,
            firstNameInputLabel,
            lastNameInputLabel,
            phoneInputLabel,
            emailInputLabel,
          },
        },
        data: {
          caseContact: { fields, expand },
        },
      },
    },
  } = workflowData;

  return {
    caseContactSectionLabel,
    firstNameInputLabel,
    lastNameInputLabel,
    phoneInputLabel,
    emailInputLabel,
    fields,
    label: expand.label,
  };
};

export default connect(
  CaseContactComponent,
  selector
);
