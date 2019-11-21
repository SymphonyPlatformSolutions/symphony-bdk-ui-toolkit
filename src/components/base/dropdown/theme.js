import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';
import Tooltip from '../tooltip';

export const getColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.basegrey
  : theme.colors.darkaccent);

function getLabelColor({
  theme, error, disabled, menuIsOpen, hasValue,
}) {
  if (disabled) {
    return theme.colors.darkgrey;
  }
  if (error && (menuIsOpen || hasValue)) {
    return theme.colors.danger;
  }

  if (menuIsOpen) {
    return theme.colors.primary;
  }

  return theme.colors.textcolor;
}

const getLineColor = ({ theme, disabled }) => (disabled ? theme.colors.darkgrey : theme.colors.textcolor);

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
    marginTop: '16px',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    boxShadow: 'none',
    border: 'none',
    borderRadius: 0,
    borderColor: state.menuIsOpen
      ? theme.colors.primary
      : getBorderColor(theme, error),
    color: getColor(theme),
    minHeight: '0',
    backgroundColor:
      theme.mode === THEME_TYPES.DARK
        ? (state.isDisabled ? transparentize(0.86, darken(0.7, theme.colors.white)) : transparentize(0.86, darken(0.4, theme.colors.white)))
        : 'transparent',
    margin: '0',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor:
        theme.mode === THEME_TYPES.DARK
          ? (state.isDisabled ? undefined : transparentize(0.82, darken(0.15, theme.colors.white)))
          : undefined,
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
      ? theme.colors.lightgrey
      : theme.mode === THEME_TYPES.DARK
        ? theme.colors.inputgrey
        : theme.colors.white,
    border: `1px solid ${getBorderColor(theme)}`,
    borderTop: 'none',
    zIndex: 3,
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
  singleValue: (provided, state) => ({
    ...provided,
    transition: 'all 0.3s',
    backgroundColor: 'rgba(0,0,0,0)',
    color: state.isDisabled
      ? `${theme.colors.darkgrey} !important`
      : 'undefined',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '9px 5px 7px 7px',
  }),
  input: provided => ({
    ...provided,
    padding: 0,
    color: theme.colors.textcolor,
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

export const SingleValue = (props) => {
  const { children, isDisabled } = props;
  return (
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
};

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

const PlaceholderContainer = styled.div`
  opacity: ${({ isFocused }) => (isFocused ? '1' : '0')};
  transition: all 0.2s;
`;

export const Placeholder = (props) => {
  const { children, isDisabled, isFocused } = props;
  return (
    <components.Placeholder {...props}>
      <PlaceholderContainer isFocused={isFocused}>
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
      </PlaceholderContainer>
    </components.Placeholder>
  );
};

export const InputLine = styled.span`
  width: 100%;
  display: block;
  position: absolute;
  bottom: 0;

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    bottom: 0;
    position: absolute;
    border-bottom: 1px solid ${({ theme, disabled }) => getLineColor({ theme, disabled })};
  }

  &:after {
    content: "";
    height: 1px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all 0.4s;
    width: ${({ menuIsOpen, error }) => (menuIsOpen || error ? '100%' : '0')};
  }
`;

const Label = styled.label`
  position: absolute;
  top: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '-14px' : '10px')};
  font-size: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '12px' : '1em')};
  transition: all 0.2s;
  left: ${({ menuIsOpen, hasValue }) => (menuIsOpen || hasValue ? '2px' : '7px')};
  color: ${props => getLabelColor(props)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  z-index: 1;
`;

export const Control = (props) => {
  const {
    children,
    label,
    menuIsOpen,
    innerTheme,
    hasValue,
    isDisabled,
    error,
  } = props;

  return (
    <components.Control {...props}>
      {children}
      <Label
        menuIsOpen={menuIsOpen}
        hasValue={hasValue}
        error={error}
        disabled={isDisabled}
      >
        {label}
      </Label>
      <InputLine
        menuIsOpen={menuIsOpen}
        theme={innerTheme}
        disabled={isDisabled}
        error={error}
      />
    </components.Control>
  );
};

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
