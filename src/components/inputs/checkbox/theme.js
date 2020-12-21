export const getBackgroundColor = ({ theme, isChecked, disabled }, isHover) => {
  if (isHover && disabled) { return undefined; }
  if (disabled) {
    return (
      isChecked
        ? theme.colors.grey_100
        : 'transparent'
    );
  }
  return (
    isChecked
      ? (isHover ? theme.colors.primary_700 : theme.colors.primary_500)
      : 'transparent'
  );
};

export const getBorderColor = ({ theme, isChecked, disabled }, isHover) => {
  if (isHover && disabled) { return undefined; }
  if (disabled) {
    return `1px solid ${theme.colors.grey_200}`;
  }
  return `2px solid ${(
    isChecked
      ? (isHover ? theme.colors.primary_700 : theme.colors.primary_500)
      : (isHover ? theme.colors.primary_700 : theme.colors.grey_400)
  )}`;
};
