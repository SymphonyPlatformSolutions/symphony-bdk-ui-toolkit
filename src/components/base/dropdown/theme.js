import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';

export const getColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.basegrey
  : theme.colors.darkaccent);

const getBorderColor = (theme, error = false) => {
  if (error) {
    return theme.colors.danger;
  }

  return theme.colors.bordergrey;
};

export const customStyles = ({ theme, error }) => ({
  container: provided => ({
    ...provided,
    pointerEvents: 'auto',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    boxShadow: 'none',
    border:
      state.menuIsOpen
        ? `1px solid ${theme.colors.primary}`
        : `1px solid ${getBorderColor(theme, error)}`,
    borderBottomLeftRadius: state.menuIsOpen ? 0 : '0px',
    borderBottomRightRadius: state.menuIsOpen ? 0 : '0px',
    borderColor: state.menuIsOpen
      ? theme.colors.primary
      : getBorderColor(theme, error),
    color: getColor(theme),
    minHeight: '35px',
    backgroundColor:
    theme.mode === THEME_TYPES.DARK
      ? theme.colors.inputgrey
      : (state.isDisabled
        ? theme.colors.grey
        : theme.colors.white),
    margin: '0',
    borderRadius: '0px',
    transition: 'all 0.3s',
    '&:hover': {
      border: `1px solid ${
        state.menuIsOpen
          ? theme.colors.primary
          : getBorderColor(theme, error)
      }`,
    },
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  }),
  indicatorSeparator: provided => ({ ...provided, display: 'none' }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    color: state.isDisabled
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.white
        : theme.colors.black,
    backgroundColor: state.isDisabled
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.inputgrey
        : theme.colors.white,
    border: `1px solid ${getBorderColor(theme)}`,
    borderTop: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'inherit',
    backgroundColor: state.selectProps.isDisabled
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.inputgrey
        : theme.colors.white,
    ':active': {
      ...state[':active'],
      backgroundColor: theme.colors.primary,
    },
    '&:focus': {
      background: 'none',
    },
    '&:hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
    },
  }),
  singleValue: provided => ({
    ...provided,
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
    color: error ? `${theme.colors.danger} !important` : undefined,
  }),
  placeholder: provided => ({
    ...provided,
    transition: 'all 0.3s',
    color: theme.colors.darkgrey,
  }),
});

const ArrowContainer = styled.div`
  margin-right: 15px;
`;

const SmallArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid ${({ theme }) => getBorderColor(theme)};
  transform: ${({ turn }) => (turn ? 'rotate(180deg)' : null)};
  transition: all 0.4s;
`;

export const DropdownIndicator = (props) => {
  const {
    selectProps: { menuIsOpen, isDisabled },
    theme,
  } = props;

  return (
    <ArrowContainer>
      <SmallArrow turn={menuIsOpen} theme={theme} isDisabled={isDisabled} />
    </ArrowContainer>
  );
};

export const SingleValue = ({ children, isDisabled, ...props }) => (
  <components.SingleValue {...props}>
    <Text
      type="primary"
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
      size="small"
      style={{ color: 'inherit', fontStyle: isDisabled ? 'italic' : 'normal', lineHeight: 'inherit' }}
    >
      {children}
    </Text>
  </components.Placeholder>
);

export const NoOptionsMessage = ({ children, ...props }) => (
  <components.NoOptionsMessage {...props}>
    <Text
      type="primary"
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
