import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { transparentize, darken } from 'polished';
import { THEME_TYPES } from '../../../styles/colors';
import Text from '../text';
import Tooltip from '../tooltip';
import { DownChevron } from '../icons';

const getBorderColor = (theme, error = false) => {
  if (error) {
    return theme.colors.error_500;
  }

  return theme.colors.grey_300;
};

export const MenuItemContainer = styled.div`
  padding: 8px 0;
  border-top: ${({ hasTopBar, theme }) => (hasTopBar ? `1px solid ${theme.colors.grey_200}` : 'none')};
  border-bottom: ${({ hasBottomBar, theme }) => (hasBottomBar ? `1px solid ${theme.colors.grey_200}` : 'none')};
`;
export const MenuItemTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_900};
  font-weight: bold;
  font-size: 14px;
  padding: 4px 12px 6px 12px;
  line-height: 14px;
`;
export const MenuItemSubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_500};
  font-size: 11px;
  padding: 0 12px 6px 12px;
  line-height: 11px;
`;
export const SimpleItemContainer = styled.div`
  transition: all 0.2s linear;
  padding: 10px 12px;
  background-color: ${({ theme, lightFocused }) => (lightFocused
    ? theme.mode === THEME_TYPES.DARK
      ? theme.colors.grey_100
      : theme.colors.oldprimary_100
    : 'transparent')};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const ChevronWrapper = styled.div`
  transform: rotate(${({ turn }) => (turn ? -180 : 0)}deg) translateY(${({ turn }) => (turn ? -3 : -1)}px);
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
      {tooltip && <Tooltip size="1.5rem" style={{ marginRight: '5px' }}>{tooltip}</Tooltip>}
    </IconContainer>
  );
};

export const SimpleItemLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_900};
  line-height: 14px;
`;
export const SimpleItemSubLabel = styled(Text)`
  padding-left: 9px;
  color: ${({ theme }) => theme.colors.grey_600};
  font-style: italic;
  font-size: 11px;
  line-height: 14px;
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

export const PlaceholderText = styled(Text)`
  user-select: none;
  color: ${({ theme }) => theme.colors.grey_400};
  font-size: inherit;
`;
export const ValueText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_900};
  font-size: inherit;
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
