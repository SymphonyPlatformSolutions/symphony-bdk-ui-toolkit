import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';

export const getColor = theme => (theme.mode === THEME_TYPES.DARK
  ? theme.colors.basegrey
  : theme.colors.darkaccent);

const getLabelColor = ({
  theme, isFocused, disabled, error,
}) => {
  if (disabled) {
    return theme.colors.darkgrey;
  }

  return isFocused
    ? error
      ? theme.colors.danger
      : theme.colors.primary
    : theme.colors.darkgrey;
};
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
    borderBottomLeftRadius: state.menuIsOpen ? 0 : '0px',
    borderBottomRightRadius: state.menuIsOpen ? 0 : '0px',
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
    borderRadius: '0px',
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
    border-bottom: 1px ${({ disabled }) => (disabled ? 'dotted' : 'solid')}
      ${({ theme, disabled }) => getLineColor({ theme, disabled })};
  }

  div:hover:not(:disabled) ~ &:before {
    ${({ disabled, theme }) => (disabled ? '' : `border-bottom: 2px solid ${getLineColor({ theme, disabled })}`)}
  }

  &:after {
    content: "";
    height: 2px;
    width: ${({ error }) => (error ? '100%' : 0)};
    bottom: 0;
    position: absolute;
    background: ${({ error, theme }) => (error ? theme.colors.danger : theme.colors.primary)};
    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
    width: ${({ isFocused }) => (isFocused ? '100%' : '0')};
  }
`;

const Label = styled.label`
  position: absolute;
  top: ${({ isFocused }) => (isFocused ? '-14px' : '10px')};
  font-size: ${({ isFocused }) => (isFocused ? '12px' : '1em')};
  transition: all 0.2s;
  left: 7px;
  color: ${props => getLabelColor(props)};
  font-style: ${({ disabled }) => (disabled ? 'italic' : 'normal')};
  z-index: 1;
`;

export const Control = (props) => {
  const {
    children,
    label,
    isFocused,
    innerTheme,
    hasValue,
    isDisabled,
    error,
  } = props;
  return (
    <components.Control {...props}>
      {children}
      <Label
        isFocused={isFocused || hasValue}
        error={error}
        disabled={isDisabled}
      >
        {label}
      </Label>
      <InputLine
        isFocused={isFocused}
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
