import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';
import Tooltip from '../tooltip';

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
      state.menuIsOpen
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
    color: 'inherit',
    backgroundColor: state.selectProps.isDisabled
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.inputgrey
        : theme.colors.white,
    ':active': {
      ...state[':active'],
      backgroundColor: theme.colors.oldprimary_400,
    },
    '&:focus': {
      background: 'none',
    },
    '&:hover': {
      color: theme.colors.white,
      backgroundColor: theme.colors.primary_400,
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    overflow: 'unset !important',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
    color: error ? `${theme.colors.error_500} !important` : undefined,
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
    tooltip,
    theme,
  } = props;

  return (
    <IconContainer>
      <ArrowContainer>
        <SmallArrow turn={menuIsOpen} theme={theme} isDisabled={isDisabled} />
      </ArrowContainer>
      {tooltip && <Tooltip size="1.5rem" style={{ marginRight: '5px' }}>{tooltip}</Tooltip>}
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
