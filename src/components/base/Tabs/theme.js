export const getTabHeaderBorder = ({ theme }) => `1px ${theme.theme.grey} solid`;
export const getTabItemFontWeight = ({ activeTab, label }) => (activeTab === label ? 'bold' : '100');
export const getTabItemColor = ({ activeTab, label, theme }) => (activeTab === label ? theme.theme.primary : theme.theme.colors.darkgrey);
export const getTabItemAlign = ({ align }) => (align === 'right' ? 'right' : 'left');
export const getTabHeaderIndicatorMarginLeft = ({ activeTabAlign, activeTabIndex }) => (activeTabAlign === 'right' ? 'calc(100% - 150px)' : `${activeTabIndex * 150}px`);
export const getHeaderIndicatorBackground = ({ theme }) => theme.theme.primary;
