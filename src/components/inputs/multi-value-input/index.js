import React, { useEffect, useState, useRef } from 'react';
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
  ClearText,
} from './theme';
import { MultiValueList } from './components';
import { buildBackReference, deepInsert, deepReplaceLast } from './helpers';
import { KEYCODES } from '../../utils/index';

const INIT_DEBOUNCE = 500;

const removeLast = (values) => {
  if (!values || !values.length) {
    return null;
  }
  const withoutLast = values.filter((el, index) => index !== values.length - 1);

  return withoutLast;
};

const chooseItem = (item, value, endpoints) => {
  const [newSet, included] = deepInsert(item, value, endpoints);
  if (!included) {
    return deepReplaceLast(item, newSet);
  }
  return newSet;
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
    loading,
  } = props;

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
    endpoints,
    itemChooseHandler,
    debouncePeriod = INIT_DEBOUNCE,
    placeholder = 'Select values...',
    size = 'regular',
    data = null,
    clearMessage = 'reset',
    noResultsMessage = 'No results found',
    CustomMenuItem = null,
    CustomTag = null,
    disabled = false,
    value = [],
    ...rest
  } = props;

  const [typedTerm, setTypedTerm] = useState('');
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [lightFocus, setLightFocus] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [innerData, setInnerData] = useState(data);
  const [nextEndpointIndex, setNextEndpointIndex] = useState(0);
  const [backReference] = useState(buildBackReference(endpoints, 0));
  const [flatEndpoints] = useState(endpoints.flat(Infinity));
  const [singleGet] = useState(() => makeRequestCreator());

  const inputRef = useRef(null);

  const executeSearch = async () => {
    let currSearchEndpoint;
    const currIndex =
      nextEndpointIndex >= flatEndpoints.length
        ? nextEndpointIndex - 1
        : nextEndpointIndex;

    if (typeof flatEndpoints[currIndex] === 'string') {
      currSearchEndpoint = flatEndpoints[currIndex];
    } else {
      currSearchEndpoint = flatEndpoints[currIndex](value, typedTerm);
    }

    if (currSearchEndpoint) {
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
    executeSearch();
  }, [value]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      executeSearch();
    }, debouncePeriod);
    return () => clearTimeout(handler);

    // return undefined;
  }, [typedTerm]);

  const choseItem = (item) => {
    setTypedTerm('');
    setLightFocus(-1);
    if (nextEndpointIndex < flatEndpoints.length) {
      setNextEndpointIndex(nextEndpointIndex + 1);
    }
    itemChooseHandler(chooseItem(item, value, endpoints));
  };

  const removeHandler = () => {
    setNextEndpointIndex(backReference[nextEndpointIndex]);
    itemChooseHandler(removeLast(value));
  };

  const wipeHandler = () => {
    setNextEndpointIndex(0);
    itemChooseHandler(null);
    setTypedTerm('');
  };

  const specialKeyHandler = ({ keyCode }) => {
    switch (keyCode) {
      case KEYCODES.DOWN:
        return setLightFocus((lightFocus + 1) % innerData.length);
      case KEYCODES.UP:
        return setLightFocus(
          lightFocus - 1 < 0 ? innerData.length - 1 : lightFocus - 1
        );
      case KEYCODES.ESC:
        return inputRef.current.blur();
      case KEYCODES.BACKSPACE:
        if (!typedTerm && value && value.length) {
          return removeHandler();
        }
        return null;
      case KEYCODES.ENTER:
        if (lightFocus < 0) {
          return null;
        }
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
          <Box type="flat" style={{ width: '100%' }} horizontal>
            <MultiValueList
              CustomTag={CustomTag}
              value={value}
              removeHandler={removeHandler}
            />
            <SearchInputWrapper hide={hideInput}>
              <StyledSearch
                {...rest}
                theme={theme}
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
          </Box>
          {!!value && value.length > 0 && (
            <ClearText onMouseDown={wipeHandler}>{clearMessage}</ClearText>
          )}
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
  itemChooseHandler: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  debouncePeriod: PropTypes.number,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  size: PropTypes.oneOf(['regular', 'large']),
  noResultsMessage: PropTypes.string,
  CustomMenuItem: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  CustomTag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  disabled: PropTypes.bool,
  value: PropTypes.array,
  clearMessage: PropTypes.string,
};

export default withTheme(MultiValueInput);
