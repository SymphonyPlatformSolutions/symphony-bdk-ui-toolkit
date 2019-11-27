import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { withTheme } from 'styled-components';
import Loader from '../loader';
import { buildSelectableArray } from './helpers';
import {
  MenuItemContainer,
  MenuItemTitle,
  MenuItemSubtitle,
  SimpleItemContainer,
  SimpleItemLabel,
  SimpleItemSublabel,
  EmptyMessageContainer,
  EmptyMessageText,
  ChevronWrapper,
  PlaceholderText,
  ValueText,
  DropdownContainer,
  ValueContainer,
  ChevronContainer,
  MenuContainer,
  BackButtonContainer,
  BackButton,
  LoaderWrapper,
  Wrapper,
  MultiChosenCheck,
  LabelContainer,
  MultiSelectContainer,
  MultiSelectText,
  MultiValueContainer,
  ClearIconContainer,
} from './theme';

export const DefaultEmptyMessage = ({ children }) => (
  <EmptyMessageContainer>
    <EmptyMessageText>{children || 'No data'}</EmptyMessageText>
  </EmptyMessageContainer>
);

const MultiChosenCheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8125 6C11.8125 9.21016 9.21016 11.8125 6 11.8125C2.78984 11.8125 0.1875 9.21016 0.1875 6C0.1875 2.78984 2.78984 0.1875 6 0.1875C9.21016 0.1875 11.8125 2.78984 11.8125 6ZM5.32767 9.07767L9.64017 4.76517C9.78661 4.61873 9.78661 4.38129 9.64017 4.23485L9.10985 3.70453C8.96341 3.55807 8.72597 3.55807 8.57951 3.70453L5.0625 7.22152L3.42049 5.57951C3.27405 5.43307 3.03661 5.43307 2.89015 5.57951L2.35983 6.10983C2.21339 6.25627 2.21339 6.49371 2.35983 6.64015L4.79733 9.07765C4.94379 9.22411 5.18121 9.22411 5.32767 9.07767Z"
      fill="#00BFA5"
    />
  </svg>
);

const SimpleItem = (props) => {
  const {
    label,
    sublabel,
    clickHandler,
    lightFocused,
    lightFocusHandler,
    uid,
    multiChosen,
  } = props;
  return (
    <SimpleItemContainer
      onMouseEnter={() => lightFocusHandler(uid)}
      lightFocused={lightFocused}
      onClick={clickHandler}
    >
      <LabelContainer>
        {label && <SimpleItemLabel>{label}</SimpleItemLabel>}
        {sublabel && <SimpleItemSublabel>{sublabel}</SimpleItemSublabel>}
      </LabelContainer>
      {multiChosen && (
        <MultiChosenCheck>
          <MultiChosenCheckIcon />
        </MultiChosenCheck>
      )}
    </SimpleItemContainer>
  );
};

export const MenuItem = (props) => {
  const {
    title,
    subtitle,
    suboptions,
    emptyMessage,
    chooseHandler,
    hasTopBar,
    hasBottomBar,
    lightFocusedUid,
    uid,
    lightFocusHandler,
    valueList,
  } = props;

  if (suboptions) {
    return (
      <MenuItemContainer hasTopBar={hasTopBar} hasBottomBar={hasBottomBar}>
        {title && <MenuItemTitle>{title}</MenuItemTitle>}
        {subtitle && <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>}
        {suboptions.length ? (
          suboptions.map(el => (
            <SimpleItem
              {...el}
              lightFocused={lightFocusedUid === el.uid}
              lightFocusHandler={lightFocusHandler}
              uid={el.uid}
              key={el.uid}
              clickHandler={() => chooseHandler(el)}
              multiChosen={
                valueList && !!valueList.find(x => x.value === el.value)
              }
            />
          ))
        ) : (
          <DefaultEmptyMessage>{emptyMessage}</DefaultEmptyMessage>
        )}
      </MenuItemContainer>
    );
  }
  return (
    <SimpleItem
      {...props}
      lightFocused={lightFocusedUid === uid}
      lightFocusHandler={lightFocusHandler}
      clickHandler={() => chooseHandler(props)}
      multiChosen={valueList && !!valueList.find(x => x.value === props.value)}
    />
  );
};

const ThemelessDownChevron = ({ theme, disabled }) => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke={disabled ? theme.colors.grey_300 : theme.colors.grey_600}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const DownChevron = withTheme(ThemelessDownChevron);

const MultiSelectValue = ({ children, removeHandler }) => (
  <MultiSelectContainer
    onClick={() => {
      // removeHandler();
    }}
  >
    <MultiSelectText size="tiny">{children}</MultiSelectText>
  </MultiSelectContainer>
);

const DropdownControlValue = (props) => {
  const {
    value, isMulti, placeholder, chooseHandler,
  } = props;

  if (!value || (isMulti && !value.length)) {
    return <PlaceholderText>{placeholder}</PlaceholderText>;
  }

  if (!isMulti) {
    return <ValueText>{value.label}</ValueText>;
  }

  return (
    <MultiValueContainer>
      {value.map(l => (
        <MultiSelectValue removeHandler={() => chooseHandler(l)} key={l.value}>
          {l.label}
        </MultiSelectValue>
      ))}
    </MultiValueContainer>
  );
};

const ClearIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0.1875C2.78906 0.1875 0.1875 2.78906 0.1875 6C0.1875 9.21094 2.78906 11.8125 6 11.8125C9.21094 11.8125 11.8125 9.21094 11.8125 6C11.8125 2.78906 9.21094 0.1875 6 0.1875ZM8.85 7.52578C8.96016 7.63594 8.96016 7.81406 8.85 7.92422L7.92188 8.85C7.81172 8.96016 7.63359 8.96016 7.52344 8.85L6 7.3125L4.47422 8.85C4.36406 8.96016 4.18594 8.96016 4.07578 8.85L3.15 7.92188C3.03984 7.81172 3.03984 7.63359 3.15 7.52344L4.6875 6L3.15 4.47422C3.03984 4.36406 3.03984 4.18594 3.15 4.07578L4.07812 3.14766C4.18828 3.0375 4.36641 3.0375 4.47656 3.14766L6 4.6875L7.52578 3.15C7.63594 3.03984 7.81406 3.03984 7.92422 3.15L8.85234 4.07812C8.9625 4.18828 8.9625 4.36641 8.85234 4.47656L7.3125 6L8.85 7.52578Z"
      fill="#A9ADB6"
    />
  </svg>
);
export const DropdownControl = forwardRef((props, ref) => {
  const {
    placeholder,
    value,
    menuIsOpen,
    disabled,
    error,
    size,
    isMulti,
    chooseHandler,
    clearHandler,
  } = props;
  return (
    <DropdownContainer
      ref={ref}
      menuIsOpen={menuIsOpen}
      disabled={disabled}
      error={error}
    >
      <ValueContainer size={size}>
        <DropdownControlValue
          chooseHandler={chooseHandler}
          value={value}
          placeholder={placeholder}
          isMulti={isMulti}
        />
      </ValueContainer>
      <ChevronContainer>
        {value && (
          <ClearIconContainer onClick={clearHandler}>
            <ClearIcon />
          </ClearIconContainer>
        )}
        <ChevronWrapper turn={menuIsOpen}>
          <DownChevron disabled={disabled} />
        </ChevronWrapper>
      </ChevronContainer>
    </DropdownContainer>
  );
});

export const DropdownMenu = forwardRef((props, ref) => {
  const {
    data,
    chooseHandler,
    loading,
    hasBackButton,
    isMulti,
    value,
    error,
  } = props;

  const [lightFocus, setLightFocus] = useState(-1);
  const [navTree, setNavTree] = useState([]);
  const [selectableArray, setSelectableArray] = useState(
    buildSelectableArray(data),
  );
  const [currentData, setCurrentData] = useState(data);

  const chooseOrNavigate = (item) => {
    if (item.options) {
      setNavTree([...navTree, item.value]);
      setSelectableArray(buildSelectableArray(item.options));
      setLightFocus(-1);
      setCurrentData(item.options);
    } else {
      chooseHandler(item);
    }
  };

  useImperativeHandle(ref, () => ({
    increaseLightFocus() {
      setLightFocus((lightFocus + 1) % selectableArray.length);
    },
    decreaseLightFocus() {
      setLightFocus(
        lightFocus - 1 < 0 ? selectableArray.length - 1 : lightFocus - 1,
      );
    },
    enterOption() {
      chooseOrNavigate(selectableArray[lightFocus]);
    },
  }));

  const lightFocusHandler = (uid) => {
    if (!uid) {
      return setLightFocus(-1);
    }
    return setLightFocus(selectableArray.findIndex(el => el.uid === uid));
  };

  const goBack = () => {
    const prunedNavTree = navTree.splice(0, navTree.length - 1);
    const prevdata = prunedNavTree.reduce((acc, el) => {
      let nextBranch;
      for (let i = 0; i < acc.length; i += 1) {
        const subTree = acc[i].suboptions ? acc[i].suboptions : acc[i];
        nextBranch = subTree.find(branch => branch.value === el);
        if (nextBranch) {
          break;
        }
      }
      return nextBranch.options;
    }, data);

    setNavTree(prunedNavTree);
    setCurrentData(prevdata);
  };

  return (
    <Wrapper ref={ref}>
      <MenuContainer
        error={error}
        hasTopPadding={currentData && !currentData[0].suboptions}
        hasBottomPadding={
          !currentData[currentData.length - 1].suboptions
          && navTree.length === 0
        }
      >
        {loading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : currentData && currentData.length ? (
          currentData.map((el, index) => (
            <MenuItem
              {...el}
              lightFocusHandler={lightFocusHandler}
              lightFocusedUid={
                lightFocus >= 0 && selectableArray.length
                  ? selectableArray[lightFocus].uid
                  : null
              }
              key={el.uid}
              chooseHandler={chooseOrNavigate}
              hasTopBar={index !== 0 && !currentData[index - 1].suboptions}
              hasBottomBar={index !== currentData.length - 1 && !!el.suboptions}
              valueList={isMulti && value}
            />
          ))
        ) : (
          <DefaultEmptyMessage>{el.emptyMessage}</DefaultEmptyMessage>
        )}
        {hasBackButton && navTree.length > 0 && (
          <BackButtonContainer>
            <BackButton onClick={goBack}>Back</BackButton>
          </BackButtonContainer>
        )}
      </MenuContainer>
    </Wrapper>
  );
});
