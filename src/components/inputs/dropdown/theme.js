import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../../misc/text';
import Tooltip from '../../misc/tooltip';
import { DownChevron } from '../../misc/icons';

const getBorderColor = (theme, error = false) => {
  if (error) {
    return theme.colors.error_500;
  }

  return theme.colors.grey_300;
};

export const customStyles = ({ theme, error }) => ({
  container: provided => ({
    ...provided,
    pointerEvents: 'auto',
    marginTop: '4px',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    boxShadow: 'none',
    border:
      state.menuIsOpen || state.isFocused
        ? `1px solid ${theme.colors.oldprimary_400}`
        : `1px solid ${getBorderColor(theme, error)}`,
    borderBottomLeftRadius: state.menuIsOpen ? 0 : '3px',
    borderBottomRightRadius: state.menuIsOpen ? 0 : '3px',
    borderColor: state.menuIsOpen
      ? theme.colors.oldprimary_400
      : getBorderColor(theme, error),
    color: theme.colors.grey_800,
    minHeight: '35px',
    backgroundColor:
      theme.mode === THEME_TYPES.DARK
        ? (state.isDisabled ? transparentize(0.86, darken(0.7, theme.colors.white)) : transparentize(0.86, darken(0.4, theme.colors.white)))
        : 'transparent',
    margin: '0',
    transition: 'all 0.3s',
    '&:hover': {
      border: `1px solid ${
        state.menuIsOpen
          ? theme.colors.oldprimary_400
          : getBorderColor(theme, error)
      }`,
    },
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    padding: 0,
  }),
  indicatorSeparator: provided => ({ ...provided, display: 'none' }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderRadius: 0,
    color: state.isDisabled
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.white
        : theme.colors.black,
    backgroundColor: state.isDisabled
      ? theme.colors.grey_050
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.grey_200
        : theme.colors.grey_200,
    border: `1px solid ${getBorderColor(theme)}`,
    borderTop: 'none',
    zIndex: 10,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? theme.colors.white
      : state.isDisabled
        ? theme.colors.grey_400
        : theme.colors.grey_900,
    backgroundColor: state.isFocused
      ? theme.colors.oldprimary_400
      : theme.mode === THEME_TYPES.DARK
        ? undefined
        : theme.colors.white,
  }),
  placeholder: (provided) => ({ ...provided, color: theme.colors.grey_400 }),
  singleValue: (provided, state) => ({
    ...provided,
    overflow: 'unset !important',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
    color: error ? `${theme.colors.error_500} !important` : theme.colors.grey_900,
  }),
  valueContainer: provided => ({
    ...provided,
    transition: 'all 0.3s',
    color: theme.colors.grey_300,
  }),
});

const ArrowContainer = styled.div`
  margin-right: 8px;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
`;

const ChevronWrapper = styled.div`
  transform: rotate(${({ turn }) => (turn ? -180 : 0)}deg);
  transition: all 0.4s;
`;

export const DropdownIndicator = (props) => {
  const {
    selectProps: { menuIsOpen, isDisabled },
    tooltip, theme,
  } = props;

  return (
    <IconContainer>
      <ArrowContainer>
        <ChevronWrapper turn={menuIsOpen}>
          <DownChevron color={isDisabled ? theme.colors.grey_300 : theme.colors.grey_600} />
        </ChevronWrapper>
      </ArrowContainer>
      {tooltip && <Tooltip size={14} color={theme.colors.grey_600} style={{ marginRight: '8px' }}>{tooltip}</Tooltip>}
    </IconContainer>
  );
};

export const SingleValue = ({ children, isDisabled, ...props }) => (
  <components.SingleValue {...props}>
    <Text
      type="primary"
      py="0"
      px="0"
      size="small"
      style={{
        color: 'inherit',
        fontStyle: isDisabled ? 'italic' : 'normal',
        lineHeight: 'inherit',
      }}
    >
      {children}
    </Text>
  </components.SingleValue>
);

export const Option = ({ children, ...props }) => (
  <components.Option {...props}>
    <Text
      type="primary"
      py="0"
      px="0"
      mx="0"
      my="0"
      size="small"
      style={{ color: 'inherit', lineHeight: 'inherit' }}
    >
      {children}
    </Text>
  </components.Option>
);

export const Placeholder = ({ children, isDisabled, ...props }) => (
  <components.Placeholder {...props}>
    <Text
      type="primary"
      py="0"
      px="0"
      size="small"
      style={{ color: 'inherit', lineHeight: 'inherit' }}
    >{children}
    </Text>
  </components.Placeholder>
);

export const NoOptionsMessage = ({ children, ...props }) => (
  <components.NoOptionsMessage {...props}>
    <Text
      type="primary"
      py="0"
      px="0"
      mx="0"
      my="0"
      size="small"
      style={{ color: 'inherit', lineHeight: 'inherit' }}
    >
      {children}
    </Text>
  </components.NoOptionsMessage>
);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool.isRequired,
  }).isRequired,
};

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool.isRequired,
  }).isRequired,
};
