import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
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

const MultiSelectValue = ({
  children, removeHandler, hasClose, ignorePadding,
}) => (
  <MultiSelectContainer
    ignorePadding={ignorePadding}
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
  const {
    value, removeHandler, CustomTag, ignorePadding,
  } = props;
  const hasValues = !!(value && value.length);

  return (
    <ValueListContainer hasValues={hasValues && !ignorePadding}>
      {hasValues
        && value.map((l, index) => {
          if (CustomTag) {
            return (
              <CustomTag
                key={uuid.v4()}
                element={l}
                index={index}
                hasClose={index === value.length - 1}
                removeHandler={removeHandler}
              />
            );
          }
          return (
            <MultiSelectValue
              ignorePadding={ignorePadding}
              key={l.value}
              hasClose={!Array.isArray(l) && index === value.length - 1}
              removeHandler={removeHandler}
              element={l}
            >
              {Array.isArray(l) ? (
                <MultiValueList
                  value={l}
                  ignorePadding
                  removeHandler={removeHandler}
                />
              )
                : l.label}
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

const ClearWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
  cursor: pointer;
`;
export const ClearButton = (props) => {
  const { onMouseDown } = props;
  return (
    <ClearWrapper onMouseDown={onMouseDown}>
      <CloseIcon />
    </ClearWrapper>
  );
};
