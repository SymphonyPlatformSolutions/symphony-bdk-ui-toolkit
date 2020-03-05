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
  hiddenTabs,
  tabSizes,
) => {
  console.log('Rendering tabs');
  return (
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
            currSize={tabSizes[el.id]}
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
  const [currFullWidth, setFullWidth] = useState(null);
  const [hiddenTabs, setHiddenTabs] = useState([]);

  const applyHide = (from) => {
    if (!currFullWidth) {
      return;
    }

    console.log('In APPLY HIDE', tabSizes);

    let widthCutoff;
    let widthAcc = 0;
    const toHide = [];
    for (widthCutoff = 0; widthCutoff < tabs.length; widthCutoff += 1) {
      widthAcc += tabSizes[tabs[widthCutoff].id];
      if ((currFullWidth - 30) < widthAcc) {
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
    console.log('Tabs changed!');
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
    } else if (tabSizeKeys.length < tabs.length) {
      for (let i = 0; i < tabs.length; i++) {
        if (!newTabSizes[tabs[i].id]) {
          newTabSizes[tabs[i].id] = 180;
        }
      }
      setTabSizes(newTabSizes);
    }
  }, [tabs]);

  const widthHandler = (width, id) => {
    console.log('Want to say width', width, 'for', id);
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
                {renderTabs(
                  tabs,
                  onChange,
                  onRemove,
                  activeTab,
                  widthHandler,
                  hiddenTabs,
                  tabSizes,
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
            widthHandler={widthHandler}
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
