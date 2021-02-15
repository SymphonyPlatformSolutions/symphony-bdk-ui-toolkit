import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import Text from '../../misc/text';
import { CloseButton } from '../../misc/button/icon-buttons';
import {
  TabTitle, StyledTab, ExcessMenuContainer,
  ExcessIconContainer, ExcessEllipsis,
} from './themes';

export const TabTitleComponent = ({ title = null }) => {
  const titleRef = useRef();

  return <TabTitle ref={titleRef}>{title}</TabTitle>;
};

TabTitleComponent.propTypes = {
  title: PropTypes.string,
};

const LEFT_MOUSE_BUTTON = 0;
const MIDDLE_MOUSE_BUTTON = 1;

export const Tab = props => {
  const {
    clickHandler,
    widthHandler,
    title = null,
    hasClose = false,
    closeHandler = null,
    isActive = false,
    TabComponent = null,
    currWidth = null,
  } = props;

  const [currentWidth, setCurrentWidth] = useState(currWidth);

  const closeClickHandler = e => {
    if (e.button === LEFT_MOUSE_BUTTON) {
      e.stopPropagation();
      closeHandler();
    }
  };

  const tabClickHandler = e => {
    if (e.button === MIDDLE_MOUSE_BUTTON) {
      closeHandler();
    }
  };

  return (
    <div>
      <ReactResizeDetector handleWidth>
        {({ width }) => {
          if (width) {
            if (currentWidth !== width) {
              widthHandler(width);
              setCurrentWidth(width);
            }
          }

          return (
            <StyledTab
              onClick={isActive ? null : clickHandler}
              isActive={isActive}
              onMouseDown={tabClickHandler}
            >
              {TabComponent ? (
                <TabComponent {...props} />
              ) : (
                <TabTitleComponent title={title} />
              )}
              {hasClose && (
              <div style={{ marginLeft: '6px' }}>
                <CloseButton
                  size={10}
                  style={{ outline: 'none' }}
                  onMouseDown={closeClickHandler}
                />
              </div>
              )}
            </StyledTab>
          );
        }}
      </ReactResizeDetector>
    </div>
  );
};

Tab.propTypes = {
  title: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  hasClose: PropTypes.bool,
  closeHandler: PropTypes.func,
  isActive: PropTypes.bool,
  TabComponent: PropTypes.node,
  widthHandler: PropTypes.func.isRequired,
  currWidth: PropTypes.number,
};

export const ExcessMenu = props => {
  const {
    widthHandler,
    hiddenTabs = null,
    activeTab = null,
    onChange = null,
    onRemove = null,
    totalTabs = null,
  } = props;

  return (
    <ExcessMenuContainer>
      {hiddenTabs.map((el, index) => {
        const { hasClose = true } = el;
        const isActive = (totalTabs - hiddenTabs.length + index) === activeTab;
        return (
          <Tab
            {...el}
            widthHandler={thisTabWidth => widthHandler(thisTabWidth, el.id)}
            isActive={isActive}
            hasClose={hasClose}
            key={el.id}
            clickHandler={() => onChange(totalTabs - hiddenTabs.length + index)}
            closeHandler={() => (hasClose ? onRemove(totalTabs - hiddenTabs.length + index) : null)}
          />
        );
      })}
    </ExcessMenuContainer>
  );
};
ExcessMenu.propTypes = {
  hiddenTabs: PropTypes.array,
  activeTab: PropTypes.number,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  totalTabs: PropTypes.number,
  widthHandler: PropTypes.func.isRequired,
};

export const ExcessTabDropdown = props => {
  const { closeDebouncePeriod = 500 } = props;

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [triggerMenu, setTriggerMenu] = useState(false);
  const inputRef = useRef();

  // Debounce
  useEffect(() => {
    if (triggerMenu) {
      setMenuIsOpen(true);
      return undefined;
    }
    const handler = setTimeout(() => {
      setMenuIsOpen(triggerMenu);
    }, closeDebouncePeriod);
    return () => clearTimeout(handler);
  }, [triggerMenu]);
  return (
    <ExcessIconContainer
      onMouseEnter={() => setTriggerMenu(true)}
      onMouseLeave={() => setTriggerMenu(false)}
    >
      <ExcessEllipsis>
        <Text size="small">•••</Text>
      </ExcessEllipsis>
      <div style={{ position: 'relative' }}>
        {menuIsOpen ? <ExcessMenu {...props} inputRef={inputRef} /> : null}
      </div>
    </ExcessIconContainer>
  );
};

ExcessTabDropdown.propTypes = {
  closeDebouncePeriod: PropTypes.number,
};
