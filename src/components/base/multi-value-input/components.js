import React from 'react';
import styled from 'styled-components';
import {
  MultiSelectText,
  MultiSelectContainer,
  MultiChosenCheck,
} from '../decision-dropdown/theme';
import { CloseIcon, TickIcon } from '../icons';

const ValueListContainer = styled.div`
  display: flex;
  padding: ${({ hasValues }) => (hasValues ? '2px 6px 7px 6px' : undefined)};
`;

const MultiSelectValue = ({ children, removeHandler, hasClose }) => (
  <MultiSelectContainer
    onMouseDown={e => {
      if (hasClose) {
        e.preventDefault();
        removeHandler();
      }
    }}
  >
    <MultiSelectText size="tiny">{children}</MultiSelectText>
    {hasClose && <CloseIcon size={8} />}
  </MultiSelectContainer>
);

export const MultiValueList = props => {
  const { value, removeHandler, CustomTag } = props;
  const hasValues = !!(value && value.length);

  return (
    <ValueListContainer hasValues={hasValues}>
      {hasValues
        && value.map((l, index) => {
          if (CustomTag) {
            return (
              <CustomTag
                key={l.value}
                element={l}
                index={index}
                hasClose={index === value.length - 1}
                removeHandler={removeHandler}
              />
            );
          }
          return (
            <MultiSelectValue
              key={l.value}
              hasClose={index === value.length - 1}
              removeHandler={() => removeHandler(l.value)}
            >
              {l.label}
            </MultiSelectValue>
          );
        })}
    </ValueListContainer>
  );
};
export const MultiSelectTick = () => (
  <MultiChosenCheck>
    <TickIcon />
  </MultiChosenCheck>
);
