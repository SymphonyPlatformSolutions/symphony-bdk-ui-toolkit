import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';

export const getColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.theme.basegrey
  : theme.theme.darkaccent);

const getBorderColor = (theme, error = false) => {
  if (error) {
    return theme.theme.danger;
  }

  if (theme.mode === THEME_TYPES.DARK) {
    return '#6f747c';
  }

  return theme.theme.darkgrey;
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
        ? `1px solid ${theme.theme.primary}`
        : `1px solid ${getBorderColor(theme, error)}`,
    borderBottomLeftRadius: state.menuIsOpen ? 0 : '3px',
    borderBottomRightRadius: state.menuIsOpen ? 0 : '3px',
    borderColor: state.menuIsOpen
      ? theme.theme.primary
      : getBorderColor(theme, error),
    color: getColor(theme),
    minHeight: '35px',
    backgroundColor:
    theme.mode === THEME_TYPES.DARK
      ? '#2F3237'
      : (state.isDisabled
        ? theme.theme.grey
        : '#fff'),
    margin: '0',
    borderRadius: '3px',
    transition: 'all 0.3s',
    '&:hover': {
      border: `1px solid ${
        state.menuIsOpen
          ? theme.theme.primary
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
      ? theme.theme.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? '#fff'
        : '#000',
    backgroundColor: state.isDisabled
      ? theme.theme.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? '#2F3237'
        : '#fff',
    border: `1px solid ${getBorderColor(theme)}`,
    borderTop: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'inherit',
    backgroundColor: state.selectProps.isDisabled
      ? theme.theme.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? '#2F3237'
        : '#fff',
    ':active': {
      ...state[':active'],
      backgroundColor: theme.theme.primary,
    },
    '&:focus': {
      background: 'none',
    },
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.theme.secondary,
    },
  }),
  singleValue: provided => ({
    ...provided,
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
    color: error ? `${theme.theme.danger} !important` : undefined,
  }),
  placeholder: provided => ({
    ...provided,
    transition: 'all 0.3s',
    color: theme.theme.darkgrey,
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
