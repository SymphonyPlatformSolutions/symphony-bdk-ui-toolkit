import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import {
  TabLineup,
  TabTileContainer,
  AddIcon,
  TabContentContainer,
  InvisibleTabBuffer,
} from './themes';
import { Tab, ExcessTabDropdown } from './components';

const renderTabs = ({
  tabs,
  onChange,
  onRemove,
  activeTab,
  widthHandler,
  hiddenTabs,
  tabSizes,
}) => {
  const renderableTabs = tabs.filter(el => !!tabSizes[el.id]);
  const noWidthTabs = tabs.filter(el => !tabSizes[el.id]);

  return (
    <TabLineup>
      <InvisibleTabBuffer>
        {noWidthTabs.map((el, index) => {
          const { hasClose = true } = el;
          if (hiddenTabs.find(shouldNotRender => shouldNotRender.id === el.id)) {
            return null;
          }
          return (
            <Tab
              {...el}
              widthHandler={thisTabWidth => widthHandler(thisTabWidth, el.id)}
              hasClose={hasClose}
              key={`${el.id}__widthTry`}
              clickHandler={() => {}}
              closeHandler={() => {}}
            />
          );
        })}
      </InvisibleTabBuffer>
      {renderableTabs.map((el, index) => {
        const { hasClose = true } = el;
        if (hiddenTabs.find(shouldNotRender => shouldNotRender.id === el.id)) {
          return null;
        }
        return (
          <Tab
            {...el}
            widthHandler={thisTabWidth => widthHandler(thisTabWidth, el.id)}
            isActive={index === activeTab}
            hasClose={hasClose}
            key={el.id}
            clickHandler={() => onChange(index)}
            closeHandler={() => (hasClose ? onRemove(index) : null)}
          />
        );
      })}
    </TabLineup>
  );
};

const singleRender = (tabs, activeTab) => tabs[activeTab].getContent();
const allRender = (tabs, activeTab) => (
  <div>
    {tabs.map((el, index) => {
      if (index !== activeTab) {
        return undefined;
      }
      return el.getContent();
    })}
  </div>
);

const ADDITIONAL_ICON_WIDTH = 60;

const DynamicPanel = props => {
  const {
    tabs = null,
    onChange = null,
    activeTab = null,
    onRemove = null,
    renderMethod = 'single',
    hasAddButton = true,
    onCreate = null,
    closeDebouncePeriod = 500,
  } = props;
  const [tabSizes, setTabSizes] = useState({});
  const [currFullWidth, setFullWidth] = useState(null);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  const applyHide = () => {
    if (!currFullWidth) {
      return;
    }

    let widthCutoff;
    let widthAcc = 0;
    const toHide = [];
    for (widthCutoff = 0; widthCutoff < tabs.length; widthCutoff += 1) {
      widthAcc += tabSizes[tabs[widthCutoff].id];
      if (currFullWidth - ADDITIONAL_ICON_WIDTH < widthAcc) {
        toHide.push(tabs[widthCutoff]);
      }
    }
    if (toHide.length !== hiddenTabs.length) {
      setHiddenTabs(toHide);
    } else {
      for (let i = 0; i < toHide.length; i++) {
        if (toHide[i].id !== hiddenTabs[i].id) {
          setHiddenTabs(toHide);
          break;
        }
      }
    }
  };

  useLayoutEffect(() => {
    const tabSizeKeys = Object.keys(tabSizes);
    const newTabSizes = { ...tabSizes };
    if (tabSizeKeys.length > tabs.length) {
      // Remove the tab size from the array
      for (let i = 0; i < tabSizeKeys.length; i += 1) {
        if (!tabs.find(el => el.id === tabSizeKeys[i])) {
          delete newTabSizes[tabSizeKeys[i]];
        }
      }
      setTabSizes(newTabSizes);
    }
  }, [tabs]);

  const widthHandler = (width, id) => {
    if (tabSizes[id] !== width) {
      const newTabSizes = { ...tabSizes };
      newTabSizes[id] = width;
      setTabSizes(newTabSizes);
    }
  };

  applyHide();

  return (
    <div>
      <TabTileContainer>
        <ReactResizeDetector handleWidth>
          {({ width }) => {
            if (width) {
              if (width !== currFullWidth) {
                setFullWidth(width);
                applyHide();
              }
            }
            return (
              <React.Fragment>
                {renderTabs({
                  tabs,
                  onChange,
                  onRemove,
                  activeTab,
                  widthHandler,
                  hiddenTabs,
                  tabSizes,
                })}
              </React.Fragment>
            );
          }}
        </ReactResizeDetector>
        {hasAddButton && <AddIcon size={12} alt="Add Tab" onClick={onCreate} />}
        {hiddenTabs.length ? (
          <ExcessTabDropdown
            hiddenTabs={hiddenTabs}
            activeTab={activeTab}
            widthHandler={widthHandler}
            closeDebouncePeriod={closeDebouncePeriod}
            onChange={onChange}
            totalTabs={tabs.length}
            onRemove={onRemove}
          />
        ) : null}
      </TabTileContainer>
      <TabContentContainer>
        {renderMethod === 'single'
          ? singleRender(tabs, activeTab)
          : allRender(tabs, activeTab)}
      </TabContentContainer>
    </div>
  );
};

DynamicPanel.propTypes = {
  tabs: PropTypes.array,
  onChange: PropTypes.func,
  activeTab: PropTypes.number,
  onRemove: PropTypes.func,
  renderMethod: PropTypes.string,
  hasAddButton: PropTypes.bool,
  onCreate: PropTypes.func,
  closeDebouncePeriod: PropTypes.number,
};

export default DynamicPanel;
