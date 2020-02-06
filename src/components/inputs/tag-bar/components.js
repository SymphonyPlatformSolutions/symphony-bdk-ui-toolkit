import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import styled from 'styled-components';
import {
  Wrapper,
  MenuContainer,
  SimpleItemContainer,
  LabelContainer,
  SimpleItemLabel,
} from './theme';

function filterData(data, query) {
  if (!query) {
    return data;
  }
  const lowerQuery = query.toLowerCase();
  return data.filter(el => el.value.toLowerCase().includes(lowerQuery));
}

const MenuItem = props => {
  const {
    lightFocusHandler,
    lightFocused,
    clickHandler,
    children,
    uid,
  } = props;
  return (
    <SimpleItemContainer
      onMouseEnter={() => lightFocusHandler(uid)}
      lightFocused={lightFocused}
      onMouseDown={e => {
        e.preventDefault();
        clickHandler();
      }}
    >
      <LabelContainer>
        {children && <SimpleItemLabel>{children}</SimpleItemLabel>}
      </LabelContainer>
    </SimpleItemContainer>
  );
};

const TagBarMenu = forwardRef((props, ref) => {
  const { data, currQuery, values } = props;
  const [lightFocus, setLightFocus] = useState(0);
  const [filteredData, setFilteredData] = useState(filterData(data, currQuery));

  const chooseOption = () => {};

  useEffect(() => {
    setFilteredData(filterData(data, currQuery));
  }, [currQuery]);

  useImperativeHandle(ref, () => ({
    increaseLightFocus() {
      setLightFocus((lightFocus + 1) % filteredData.length);
    },
    decreaseLightFocus() {
      setLightFocus(
        lightFocus - 1 < 0 ? filteredData.length - 1 : lightFocus - 1,
      );
    },
    enterOption() {
      // chooseOrNavigate(selectableArray[lightFocus]);
    },
  }));

  const lightFocusHandler = uid => {
    if (!uid) {
      return setLightFocus(-1);
    }
    return setLightFocus(filteredData.findIndex(el => el.uid === uid));
  };

  useEffect(() => {
    setLightFocus(0);
    // wipeQueryHandler();
  }, [data]);

  if (!filteredData || !filteredData.length) {
    return null;
  }

  function renderContent() {
    return filteredData.map((el, index) => (
      <MenuItem
        {...el}
        // CustomItem={el.CustomItem}
        lightFocusHandler={lightFocusHandler}
        lightFocused={lightFocus === index}
        key={el.uid}
        uid={el.uid}
        clickHandler={() => chooseOption(el)}
      >
        {el.value}
      </MenuItem>
    ));
  }

  return (
    <Wrapper ref={ref}>
      <MenuContainer>{renderContent()}</MenuContainer>
    </Wrapper>
  );
});

export default TagBarMenu;
