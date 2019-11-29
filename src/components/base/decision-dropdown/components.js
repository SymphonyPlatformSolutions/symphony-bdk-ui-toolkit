import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
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
  IconMarginContainer,
  TooltipMargin,
  ValueAndControl,
} from './theme';
import {
  CrossIcon, TickIcon, DownChevron, CloseIcon,
} from '../icons';
import Tooltip from '../tooltip';

const BS_KEY = 8;

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
    selectableArray,
    CustomEmptyComponent,
  } = props;

  function renderEmptyContent() {
    if (!CustomEmptyComponent) {
      return (<DefaultEmptyMessage>{emptyMessage}</DefaultEmptyMessage>);
    }
    return (CustomEmptyComponent);
  }
  if (suboptions) {
    const filteredOptions = suboptions.filter(
      x => !!selectableArray.find(y => y.value === x.value),
    );
    if (!filteredOptions.length && suboptions.length) {
      return null;
    }
    return (
      <MenuItemContainer hasTopBar={hasTopBar} hasBottomBar={hasBottomBar}>
        {title && <MenuItemTitle>{title}</MenuItemTitle>}
        {subtitle && <MenuItemSubtitle>{subtitle}</MenuItemSubtitle>}
        {suboptions.length ? (
          filteredOptions.map(el => (
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
        ) : (renderEmptyContent())}
      </MenuItemContainer>
    );
  }

  if (selectableArray.find(y => y.value === props.value)) {
    return (
      <SimpleItem
        {...props}
        lightFocused={lightFocusedUid === uid}
        lightFocusHandler={lightFocusHandler}
        clickHandler={() => chooseHandler(props)}
        multiChosen={
          valueList && !!valueList.find(x => x.value === props.value)
        }
      />
    );
  }
  return null;
};

MenuItem.propTypes = {
  CustomEmptyComponent: PropTypes.node,
};
MenuItem.defaultProps = {
  CustomEmptyComponent: null,
};

const MultiSelectValue = ({ children, removeHandler }) => (
  <MultiSelectContainer
    onMouseDown={(e) => {
      e.preventDefault();
      removeHandler();
    }}
  >
    <MultiSelectText size="tiny">{children}</MultiSelectText>
    <CloseIcon size={8} />
  </MultiSelectContainer>
);

const MultiValueList = (props) => {
  const { value, chooseHandler, size } = props;

  if (!value || !value.length) {
    return null;
  }

  return (
    <ValueContainer size={size}>
      <MultiValueContainer>
        {value.map(l => (
          <MultiSelectValue
            removeHandler={() => chooseHandler(l)}
            key={l.value}
          >
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
    specialKeyController,
    focusBlurHandler,
    theme,
    tooltip,
    filterQueryHandler,
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
    wipeQuery() {
      setTypedValue('');
      filterQueryHandler('');
    },
  }));

  useEffect(() => {
    if (!isMulti) {
      if (value) {
        setTypedValue(value.label);
      } else {
        setTypedValue('');
        filterQueryHandler('');
      }
    }
  }, [value]);

  const backSpaceHandler = () => {
    if (!typedValue && isMulti && value && value.length) {
      chooseHandler(value[value.length - 1]);
    }
  };

  const shouldRenderClear = isMulti ? !!(value && value.length) : value;
  const hideInput = value && value.length && isMulti && !menuIsOpen;

  return (
    <DropdownContainer
      ref={ref}
      menuIsOpen={menuIsOpen}
      disabled={disabled}
      error={error}
    >
      <ValueAndControl onClick={() => { hideInput && inputRef.current.focus(); }}>
        {isMulti && (
        <MultiValueList
          chooseHandler={chooseHandler}
          value={value}
          size={size}
        />
        )}
        <ControlInput
          hide={hideInput}
          onKeyDown={(e) => {
            specialKeyController(e);
            if (e.keyCode === BS_KEY) {
              backSpaceHandler();
            }
          }}
          ref={inputRef}
          placeholder={placeholder}
          value={typedValue}
          onChange={({ target }) => {
            setTypedValue(target.value);
            filterQueryHandler(target.value);
          }}
          onFocus={() => focusBlurHandler(true)}
          onBlur={() => focusBlurHandler(false)}
          disabled={disabled}
          size={size}
        />
      </ValueAndControl>
      <ChevronContainer>
        {shouldRenderClear && (
          <IconMarginContainer onClick={clearHandler}>
            <CrossIcon />
          </IconMarginContainer>
        )}
        <ChevronWrapper
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInputBlur(menuIsOpen);
          }}
          turn={menuIsOpen}
        >
          <DownChevron
            color={disabled ? theme.colors.grey_300 : theme.colors.grey_600}
          />
        </ChevronWrapper>
        {tooltip && (
          <TooltipMargin>
            <Tooltip>{tooltip}</Tooltip>
          </TooltipMargin>
        )}
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
    filterQuery,
    wipeQueryHandler,
  } = props;

  const [lightFocus, setLightFocus] = useState(-1);
  const [navTree, setNavTree] = useState([]);
  const [selectableArray, setSelectableArray] = useState(
    buildSelectableArray(data, filterQuery),
  );
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    setSelectableArray(buildSelectableArray(data, ''));
    setCurrentData(data);
    setLightFocus(-1);
    wipeQueryHandler();
  }, [data]);

  useEffect(() => {
    setSelectableArray(buildSelectableArray(currentData, filterQuery));
    setLightFocus(-1);
  }, [filterQuery]);

  const chooseOrNavigate = (item) => {
    if (item.options) {
      setNavTree([...navTree, item.value]);
      setSelectableArray(buildSelectableArray(item.options, filterQuery));
      setLightFocus(-1);
      setCurrentData(item.options);
      wipeQueryHandler();
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
    setSelectableArray(buildSelectableArray(prevdata, filterQuery));
    setCurrentData(prevdata);
    setLightFocus(-1);
  };

  const hasOptions = currentData && currentData.length;

  function renderContent() {
    if (loading) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }
    if (hasOptions) {
      return currentData.map((el, index) => (
        <MenuItem
          {...el}
          selectableArray={selectableArray}
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
      ));
    }
    return <DefaultEmptyMessage>{currentData.emptyMessage}</DefaultEmptyMessage>;
  }

  return (
    <Wrapper ref={ref}>
      <MenuContainer
        error={error}
        hasTopPadding={hasOptions && !currentData[0].suboptions}
        hasBottomPadding={
          hasOptions
          && !currentData[currentData.length - 1].suboptions
          && navTree.length === 0
        }
      >
        {renderContent()}
        {hasBackButton && navTree.length > 0 && (
          <BackButtonContainer>
            <BackButton
              onMouseDown={(e) => {
                e.preventDefault();
                goBack();
              }}
            >
              Back
            </BackButton>
          </BackButtonContainer>
        )}
      </MenuContainer>
    </Wrapper>
  );
});
