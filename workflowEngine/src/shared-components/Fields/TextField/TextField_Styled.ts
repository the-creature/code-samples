import styled from 'styled-components';
import { lightGray } from '../../../static/styles/colors';

export const InputField = styled('input')<{ inputSize: string | undefined }>`
  display: inline-block;
  vertical-align: center;
  font-size: ${({ inputSize }) => {
    if (inputSize === 'large') return '21px';
    return '14px';
  }};
  font-weight: ${({ inputSize }) => {
    if (inputSize === 'large') return '500';
    return 'normal';
  }};
  height: 30px;
  width: 100%;
  padding: ${({ inputSize }) => {
    if (inputSize === 'large') return '19px 13px';
    return '6px 15px';
  }};
  border-radius: 5px;
  border: 1px solid ${lightGray};

  :focus {
    outline: auto !important;
  }
`;

export const TextAreaField = styled.textarea`
  display: inline-block;
  vertical-align: center;
  font-size: 14px;
  font-weight: normal;
  height: 115px;
  width: 100%;
  overflow: auto;
  padding: 15px;
  border: none;
  resize: none;

  :focus {
    outline: auto !important;
  }
`;
