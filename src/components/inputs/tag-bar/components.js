import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Wrapper,
  MenuContainer,
  SimpleItemContainer,
  LabelContainer,
  SimpleItemLabel,
} from './theme';

function filterData(data, query, value) {
  if (!query) {
    return data;
  }
  const lowerQuery = query.toLowerCase();

  return data.filter((el) => {
    if (value) {
      const isChosen = value.find(v => v.value.toLowerCase() === el.value.toLowerCase());
      if (isChosen) return false;
    }
    return el.value.toLowerCase().includes(lowerQuery);
  });
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
        if (e.button === 0) {
          e.preventDefault();
          clickHandler();
        }
      }}
    >
      <LabelContainer>
        {children && <SimpleItemLabel>{children}</SimpleItemLabel>}
      </LabelContainer>
    </SimpleItemContainer>
  );
};

const TagBarMenu = forwardRef((props, ref) => {
  const {
    data, currQuery, value, chooseHandler,
  } = props;
  const [lightFocus, setLightFocus] = useState(0);
  const [filteredData, setFilteredData] = useState(filterData(data, currQuery, value));

  useEffect(() => {
    setFilteredData(filterData(data, currQuery, value));
  }, [currQuery, value]);

  useImperativeHandle(ref, () => ({
    increaseLightFocus() {
      setLightFocus((lightFocus + 1) % filteredData.length);
    },
    decreaseLightFocus() {
      setLightFocus(
        lightFocus - 1 < 0 ? filteredData.length - 1 : lightFocus - 1,
      );
    },
    getCurrentOption() {
      if (filteredData[lightFocus]) {
        return filteredData[lightFocus].value;
      }
      return null;
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
        lightFocusHandler={lightFocusHandler}
        lightFocused={lightFocus === index}
        key={el.uid}
        uid={el.uid}
        clickHandler={() => chooseHandler(el.value)}
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
