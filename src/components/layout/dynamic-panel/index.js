import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import {
  TabLineup,
  TabTileContainer,
  AddIcon,
  TabContentContainer,
} from './themes';
import {
  Tab,
  ExcessTabDropdown,
} from './components';

const renderTabs = (
  tabs,
  onChange,
  onRemove,
  activeTab,
  widthHandler,
  tabSizes,
  hiddenTabs,
) => (
  <TabLineup>
    {tabs.map((el, index) => {
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
          currWidth={tabSizes[el.id]}
          clickHandler={() => onChange(index)}
          closeHandler={() => (hasClose ? onRemove(index) : null)}
        />
      );
    })}
  </TabLineup>
);

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

const sumTabWidths = tabSizes => Object.keys(tabSizes).reduce((acc, el) => {
  if (tabSizes[el]) {
    return acc + tabSizes[el];
  }
  return acc;
}, 0);

const DynamicPanel = props => {
  const {
    tabs,
    onChange,
    activeTab,
    renderMethod,
    hasAddButton,
    onRemove,
    onCreate,
    closeDebouncePerdiod,
  } = props;
  const [tabSizes, setTabSizes] = useState({});
  const [sumOfWidths, setSumOfWidths] = useState(null);
  const [currFullWidth, setFullWidth] = useState(null);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  useEffect(() => {
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
    setSumOfWidths(sumTabWidths(newTabSizes));
  }, [tabs]);

  useLayoutEffect(() => {
    if (!currFullWidth) {
      return;
    }

    let widthCutoff;
    let widthAcc = 0;
    const toHide = [];
    for (widthCutoff = 0; widthCutoff < tabs.length; widthCutoff += 1) {
      widthAcc += tabSizes[tabs[widthCutoff].id];
      if ((currFullWidth - 30) < widthAcc) {
        toHide.push(tabs[widthCutoff]);
      }
    }

    setHiddenTabs(toHide);
  }, [currFullWidth, sumOfWidths]);

  const widthHandler = (width, id) => {
    if (tabSizes[id] !== width) {
      const newTabSizes = tabSizes;
      newTabSizes[id] = width;
      setSumOfWidths(sumTabWidths(newTabSizes));
      setTabSizes(newTabSizes);
    }
  };

  return (
    <div>
      <TabTileContainer>
        <ReactResizeDetector handleWidth>
          {({ width }) => {
            if (width) {
              if (width !== currFullWidth) {
                setFullWidth(width);
              }
            }
            return (
              <React.Fragment>
                {renderTabs(
                  tabs,
                  onChange,
                  onRemove,
                  activeTab,
                  widthHandler,
                  tabSizes,
                  hiddenTabs,
                )}
              </React.Fragment>
            );
          }}
        </ReactResizeDetector>
        {hasAddButton && <AddIcon size={12} alt="Add Tab" onClick={onCreate} />}
        {hiddenTabs.length ? (
          <ExcessTabDropdown
            hiddenTabs={hiddenTabs}
            activeTab={activeTab}
            closeDebouncePerdiod={closeDebouncePerdiod}
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
  closeDebouncePerdiod: PropTypes.number,
};
DynamicPanel.defaultProps = {
  tabs: null,
  onChange: null,
  activeTab: null,
  onRemove: null,
  renderMethod: 'single',
  hasAddButton: true,
  onCreate: null,
  closeDebouncePerdiod: 500,
};

export default DynamicPanel;
