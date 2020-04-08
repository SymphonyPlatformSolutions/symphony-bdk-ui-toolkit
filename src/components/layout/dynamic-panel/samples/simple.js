import React, { useState } from 'react';
import uuid from 'uuid';
import DynamicTabs from '../index';
import Text from '../../../misc/text';

const TabContent = (props) => {
  const { number } = props;

  return (
    <div style={{ width: '80%' }}>
      <Text>Content for {number}</Text>
    </div>
  );
};

const TABS = [
  {
    title: 'Tab 1', id: uuid.v4(), getContent: () => (<TabContent number={1} />), hasClose: false,
  },
  { title: 'Tab 2', id: uuid.v4(), getContent: () => (<TabContent number={2} />) },
  { title: 'Tab 3', id: uuid.v4(), getContent: () => (<TabContent number={3} />) },
];

const TabWrapper = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs, setTabs] = useState(TABS);

  const removeTab = (removeIndex) => {
    if (currentTab >= removeIndex) {
      setCurrentTab(currentTab - 1);
    }
    setTabs(tabs.filter((el, index) => index !== removeIndex));
  };
  const onCreate = () => {
    setTabs([...tabs, { title: 'New tab', id: uuid.v4(), getContent: () => (<TabContent number={tabs.length + 1} />) }]);
  };

  return (
    <DynamicTabs
      onChange={(newTab) => setCurrentTab(newTab)}
      tabs={tabs}
      activeTab={currentTab}
      onRemove={removeTab}
      renderMethod="single"
      onCreate={onCreate}
      hasAddButton
    />
  );
};

export default TabWrapper;
