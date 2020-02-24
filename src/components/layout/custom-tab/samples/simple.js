import React, { useState, useEffect } from 'react';
import CustomTabs from '../index';
import Text from '../../../misc/text';

const TabContent = (props) => {
  const { number } = props;

  useEffect(() => {
    console.log('Remaking', number);
  }, []);

  console.log('Rendering page');

  return (
    <div style={{ width: '80%' }}>
      <Text>Content for {number}</Text>
    </div>
  );
};

const TABS = [
  { title: 'Tab 1', content: () => (<TabContent number={1} />), hasClose: false },
  { title: 'Tab 2', content: () => (<TabContent number={2} />) },
  { title: 'Tab 3', content: () => (<TabContent number={3} />) },
];

const TabWrapper = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabs, setTabs] = useState(TABS);

  const removeTab = (removeIndex) => {
    if (currentTab >= removeIndex) {
      setCurrentTab(currentTab - 1);
    }
    setTabs(tabs.filter((el, index) => index !== removeIndex));
  };
  const onAdd = () => {
    setTabs([...tabs, { title: 'New tab', content: () => (<TabContent number={tabs.length + 1} />) }]);
  };

  return (
    <CustomTabs
      onChange={(newTab) => setCurrentTab(newTab)}
      tabs={tabs}
      activeTab={currentTab}
      onClose={removeTab}
      renderMethod="single"
      onAdd={onAdd}
      hasAddButton
    />
  );
};

export default TabWrapper;
