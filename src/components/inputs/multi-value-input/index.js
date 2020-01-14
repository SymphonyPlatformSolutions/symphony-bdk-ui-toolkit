import React, {
  useEffect, useState, useRef,
} from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Loader from '../../misc/loader';
import Text from '../../misc/text';
import Box from '../../layout/box';
import {
  StyledSearch,
  SearchWrapper,
  MenuContainer,
  MenuItem,
  SearchContainer,
  ShrinkingBorder,
  BorderContainer,
  FloatWrapper,
  SearchInputWrapper,
  LoaderWrapper,
} from './theme';
import { MultiValueList, MultiSelectTick } from './components';

const INIT_DEBOUNCE = 500;
const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;
const BACKSPACE_KEY = 8;

const chooseItem = (item, value, isLastLayer = false) => {
  if (!value) {
    return [item];
  }
  const chosenIndex = value.findIndex(l => l.value === item.value);

  if (chosenIndex >= 0) {
    if (chosenIndex !== value.length - 1) {
      return value;
    }
    return value.filter(l => l.value !== item.value);
  }
  if (isLastLayer) {
    const withoutLast = value.slice(0, value.length - 1);
    return [...withoutLast, item];
  }
  return [...value, item];
};

const Menu = (props) => {
  const {
    data,
    clickHandler,
    theme,
    noResultsMessage,
    lightFocus,
    setLightFocus,
    CustomMenuItem,
    typedTerm,
    isLarge,
    value,
    loading,
  } = props;

  const hasValues = !!(value && value.length);

  if (loading) {
    return (
      <MenuContainer theme={theme}>
        <Box align="center" justify="center" horizontal>
          <Text style={{ fontStyle: 'italic', paddingTop: '5px' }}>
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          </Text>
        </Box>
      </MenuContainer>
    );
  }

  if (!data.length) {
    return (
      <MenuContainer theme={theme}>
        <Box align="center" justify="center" horizontal>
          <Text style={{ fontStyle: 'italic', paddingTop: '5px' }}>
            {noResultsMessage}
          </Text>
        </Box>
      </MenuContainer>
    );
  }

  return (
    <MenuContainer theme={theme} isLarge={isLarge}>
      <FloatWrapper>
        {data.map((el, index) => (
          <MenuItem
            theme={theme}
            key={el.label}
            onMouseDown={(e) => {
              e.preventDefault();
              clickHandler(el);
            }}
            onMouseEnter={() => setLightFocus(index)}
            lightFocused={index === lightFocus}
          >
            {CustomMenuItem ? (
              <CustomMenuItem element={el} typedTerm={typedTerm} />
            ) : (
              <Text>{el.label}</Text>
            )}
            {hasValues && !!value.find(vEl => vEl.value === el.value)
            && (<MultiSelectTick />)}
          </MenuItem>
        ))}
      </FloatWrapper>
    </MenuContainer>
  );
};

const makeRequestCreator = () => {
  let call;
  return (url, params) => {
    if (call) {
      call.cancel();
    }
    call = Axios.CancelToken.source();
    return Axios.get(url, {
      ...params,
      cancelToken: call.token,
    });
  };
};

const MultiValueInput = (props) => {
  const {
    theme,
    data,
    endpoints,
    debouncePeriod,
    size,
    placeholder,
    noResultsMessage,
    itemChooseHandler,
    CustomMenuItem,
    CustomTag,
    disabled,
    value,
    ...rest
  } = props;

  const [typedTerm, setTypedTerm] = useState('');
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [lightFocus, setLightFocus] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [innerData, setInnerData] = useState(data);
  const [singleGet] = useState(() => makeRequestCreator());

  const inputRef = useRef(null);

  const executeSearch = async () => {
    const currSearchIndex = value ? value.length : 0;

    let currSearchEndpoint;
    if (endpoints[currSearchIndex]) {
      if (typeof endpoints[currSearchIndex] === 'string') {
        currSearchEndpoint = endpoints[currSearchIndex];
      } else {
        currSearchEndpoint = endpoints[currSearchIndex](value, typedTerm);
      }

      setLoading(true);
      try {
        const newData = await singleGet(currSearchEndpoint);
        setInnerData(newData.data);
        setLoading(false);
      } catch (err) {
        if (!Axios.isCancel(err)) {
          console.error(err.message);
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!value || value.length < endpoints.length) {
      executeSearch();
    }
  }, [value]);

  // Debounce
  useEffect(() => {
    if (value || typedTerm) {
      const handler = setTimeout(() => {
        executeSearch();
      }, debouncePeriod);
      return () => clearTimeout(handler);
    }
    return undefined;
  }, [typedTerm]);

  const choseItem = (item) => {
    setTypedTerm('');
    itemChooseHandler(chooseItem(item, value, value && (value.length === endpoints.length)));
  };

  const removeHandler = (removeValue) => {
    itemChooseHandler(value.filter(l => l.value !== removeValue));
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case DOWN_KEY:
        return setLightFocus((lightFocus + 1) % innerData.length);
      case UP_KEY:
        return setLightFocus(
          lightFocus - 1 < 0 ? innerData.length - 1 : lightFocus - 1,
        );
      case ESC_KEY:
        return inputRef.current.blur();
      case BACKSPACE_KEY:
        if (!typedTerm && value && value.length) {
          return choseItem(value[value.length - 1]);
        }
        return null;
      case ENTER_KEY:
        return choseItem(innerData[lightFocus]);
      default:
        return null;
    }
  };

  const hideInput = value && value.length && !isMenuOpen;

  return (
    <SearchWrapper>
      <BorderContainer>
        <SearchContainer
          disabled={disabled}
          onClick={() => hideInput && inputRef.current.focus()}
        >
          <MultiValueList
            CustomTag={CustomTag}
            value={value}
            removeHandler={removeHandler}
          />
          <SearchInputWrapper
            hide={hideInput}
          >
            <StyledSearch
              {...rest}
              disabled={disabled}
              ref={inputRef}
              onKeyDown={specialKeyHandler}
              size={size}
              value={typedTerm}
              onChange={({ target }) => setTypedTerm(target.value)}
              onFocus={() => {
                setLightFocus(-1);
                setisMenuOpen(true);
              }}
              onBlur={() => {
                setLightFocus(-1);
                setisMenuOpen(false);
              }}
              placeholder={placeholder}
            />
          </SearchInputWrapper>
        </SearchContainer>
        <ShrinkingBorder theme={theme} show={isMenuOpen} />
      </BorderContainer>
      {isMenuOpen && (
        <Menu
          loading={loading}
          isLarge={size === 'large'}
          typedTerm={typedTerm}
          CustomMenuItem={CustomMenuItem}
          lightFocus={lightFocus}
          setLightFocus={setLightFocus}
          theme={theme}
          data={innerData}
          clickHandler={choseItem}
          noResultsMessage={noResultsMessage}
          value={value}
          CustomTag={CustomTag}
        />
      )}
    </SearchWrapper>
  );
};

MultiValueInput.propTypes = {
  theme: PropTypes.object.isRequired,
  endpoints: PropTypes.array.isRequired,
  itemChooseHandler: PropTypes.object.isRequired,
  debouncePeriod: PropTypes.number,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  size: PropTypes.oneOf(['regular', 'large']),
  noResultsMessage: PropTypes.string,
  CustomMenuItem: PropTypes.node,
  CustomTag: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.array,
};

MultiValueInput.defaultProps = {
  debouncePeriod: INIT_DEBOUNCE,
  placeholder: 'Select values...',
  size: 'regular',
  data: null,
  noResultsMessage: 'No results found',
  CustomMenuItem: null,
  CustomTag: null,
  disabled: false,
  value: null,
};

export default withTheme(MultiValueInput);
