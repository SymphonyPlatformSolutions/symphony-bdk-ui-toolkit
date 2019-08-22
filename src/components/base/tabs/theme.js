export const getTabHeaderBorder = ({ theme }) => `1px ${theme.theme.grey} solid`;
export const getTabItemColor = ({ activeTab, label, theme }) => (
  activeTab === label
    ? theme.theme.primary
    : theme.theme.darkgrey
);
export const getTabItemWeight = ({ activeTab, label }) => (
  activeTab === label ? '800' : '100'
);

export const getTabItemAlign = ({ align }) => (align === 'right' ? 'right' : 'left');
export const getHeaderIndicatorBackground = ({ theme }) => theme.theme.primary;
export const getHeaderIndicatorWidth = ({ activeTabIndex, tabs }) => {
  // eslint-disable-next-line prefer-destructuring
  const clientWidth = tabs[activeTabIndex].clientWidth;
  return `${clientWidth}px`;
};
export const getTabHeaderIndicatorMarginLeft = ({ activeTabAlign, activeTabIndex, tabs }) => {
  let travelDistance = 0;
  // eslint-disable-next-line prefer-destructuring
  const clientWidth = tabs[activeTabIndex].clientWidth;
  for (let i = 0; i < activeTabIndex; i++) {
    travelDistance += tabs[i].clientWidth;
  }
  return (activeTabAlign === 'right' ? `calc(100% - ${clientWidth}px)` : `${travelDistance}px`);
};
