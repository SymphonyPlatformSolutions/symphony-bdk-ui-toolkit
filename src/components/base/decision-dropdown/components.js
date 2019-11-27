import React, {
  useState, forwardRef, useImperativeHandle, useRef, useEffect,
} from 'react';
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
  ControlInput,
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
import {
  CrossIcon, TickIcon, DownChevron, CloseIcon,
} from '../icons';

export const DefaultEmptyMessage = ({ children }) => (
  <EmptyMessageContainer>
    <EmptyMessageText>{children || 'No data'}</EmptyMessageText>
  </EmptyMessageContainer>
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
      onMouseDown={(e) => {
        e.preventDefault();
        clickHandler();
      }}
    >
      <LabelContainer>
        {label && <SimpleItemLabel>{label}</SimpleItemLabel>}
        {sublabel && <SimpleItemSublabel>{sublabel}</SimpleItemSublabel>}
      </LabelContainer>
      {multiChosen && (
        <MultiChosenCheck>
          <TickIcon />
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

const MultiSelectValue = ({ children, removeHandler }) => (
  <MultiSelectContainer onMouseDown={(e) => {
    e.preventDefault();
    removeHandler();
  }}
  >
    <MultiSelectText size="tiny">{children}</MultiSelectText>
    <CloseIcon size={8} />
  </MultiSelectContainer>
);

const MultiValueList = (props) => {
  const {
    value, chooseHandler, size,
  } = props;

  if (!value || !value.length) {
    return null;
  }

  return (
    <ValueContainer size={size}>
      <MultiValueContainer>
        {value.map(l => (
          <MultiSelectValue removeHandler={() => chooseHandler(l)} key={l.value}>
            {l.label}
          </MultiSelectValue>
        ))}
      </MultiValueContainer>
    </ValueContainer>
  );
};

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
    specialKeyHandler,
    focusBlurHandler,
    theme,
  } = props;

  const [typedValue, setTypedValue] = useState('');
  const inputRef = useRef();

  const toggleInputBlur = (isBlur) => {
    if (isBlur) {
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    toggleInputBlur(isBlur) {
      toggleInputBlur(isBlur);
    },
  }));

  useEffect(() => {
    if (!isMulti) {
      if (value) {
        setTypedValue(value.label);
      } else {
        setTypedValue('');
      }
    }
  }, [value]);

  const shouldRenderClear = isMulti ? !!(value && value.length) : value;

  return (
    <DropdownContainer
      ref={ref}
      menuIsOpen={menuIsOpen}
      disabled={disabled}
      error={error}
    >
      {isMulti
      && (
        <MultiValueList
          chooseHandler={chooseHandler}
          value={value}
          size={size}
        />
      )
    }
      <ControlInput
        onKeyDown={specialKeyHandler}
        ref={inputRef}
        placeholder={placeholder}
        value={typedValue}
        onChange={({ target }) => setTypedValue(target.value)}
        onFocus={() => focusBlurHandler(true)}
        onBlur={() => focusBlurHandler(false)}
        disabled={disabled}
        size={size}
      />
      <ChevronContainer>
        {shouldRenderClear && (
          <ClearIconContainer onClick={clearHandler}>
            <CrossIcon />
          </ClearIconContainer>
        )}
        <ChevronWrapper
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInputBlur(menuIsOpen);
          }}
          turn={menuIsOpen}
        >
          <DownChevron color={disabled ? theme.colors.grey_300 : theme.colors.grey_600} />
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
            <BackButton onMouseDown={(e) => {
              e.preventDefault();
              goBack();
            }}
            >Back
            </BackButton>
          </BackButtonContainer>
        )}
      </MenuContainer>
    </Wrapper>
  );
});
