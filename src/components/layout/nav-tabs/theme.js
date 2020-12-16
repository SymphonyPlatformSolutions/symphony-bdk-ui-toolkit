export const getTabHeaderBorder = ({ theme }) => `1px ${theme.colors.grey_600} solid`;
export const getTabItemAlign = ({ align }) => (align === 'right' ? 'right' : 'left');
export const getHeaderIndicatorBackground = ({ theme }) => theme.colors.primary_500;
export const getHeaderIndicatorWidth = ({ activeTabIndex, tabs }) => {
  // eslint-disable-next-line prefer-destructuring
  const clientWidth = tabs[activeTabIndex].clientWidth;
  return `${clientWidth}px`;
};
export const getTabHeaderIndicatorMarginLeft = ({ activeTabAlign, activeTabIndex, tabs, seperatorWidthInPx }) => {
  let travelDistance = 0;
  // eslint-disable-next-line prefer-destructuring
  const clientWidth = tabs[activeTabIndex].clientWidth;
  for (let i = 0; i < activeTabIndex; i++) {
    travelDistance += tabs[i].clientWidth + seperatorWidthInPx;
  }
  return (activeTabAlign === 'right' ? `calc(100% - ${clientWidth + seperatorWidthInPx}px)` : `${travelDistance}px`);
};
