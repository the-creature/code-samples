import { parseString } from 'xml2js';
import camelCase from 'lodash.camelcase';
import { Condition, Consequence, TriggerEvent } from '../redux/modules/workflow';

interface XmlSteps {
  step: XmlStep[];
}

interface XmlStep {
  $: {
    step?: string;
  };
  title: string;
  content: string;
  target?: {
    $: {
      id: string;
      type: string;
    };
  };
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
}

// Load xml file
export const loadXML = (url?: string) => {
  if (url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = async () => {
        // replaced status == 200 because issues on localhost
        if (req.readyState === 4 || req.status === 200) {
          const options = {
            explicitArray: false,
            tagNameProcessors: [camelCase],
            attrNameProcessors: [camelCase],
          };
          parseString(req.responseText, options, (_err, res) => {
            resolve(res);
          });
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = () => {
        reject(Error('Error'));
      };
      req.send();
    });
  }
};

// Convert xml to step format
export const xmlToSteps = ({ step }: XmlSteps) =>
  // @ts-ignore
  step.map(item => {
    return {
      ...item,
      completed: false,
    };
  });

// Convert step string number to a Number
export const stepNumber = (str?: string) => {
  if (str === '' || !str) return false;
  return parseInt(str);
};
