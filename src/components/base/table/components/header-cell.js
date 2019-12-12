import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { transparentize } from 'polished';
import Box from '../../box';
import Tooltip from '../../tooltip';
import { DownChevron } from '../../icons';
import {
  IconWrapper,
  IconSpinner,
  ToolTipContainer,
  CellWrapper,
  HeaderText,
} from '../theme';

const SortingIcon = withTheme(({ sorting, isSortedDesc, theme }) => {
  if (!sorting) {
    return (
      <IconWrapper>
        <IconSpinner>
          <DownChevron color={transparentize(0.6, theme.colors.grey_700)} />
        </IconSpinner>
      </IconWrapper>
    );
  }

  return (
    <IconWrapper>
      <IconSpinner desc={isSortedDesc}>
        <DownChevron color={theme.colors.primary_500} />
      </IconSpinner>
    </IconWrapper>
  );
});

const TableHeaderCell = (props) => {
  const {
    column: {
      header, tooltip, sortable, isSorted, isSortedDesc,
    },
  } = props;

  return (
    <CellWrapper type="flat" align="center">
      <Box horizontal space={5} align="center" justify="center">
        <HeaderText
          type="primary"
          isTitle
          size="tiny"
        >
          {header}
        </HeaderText>
        {tooltip && (
          <ToolTipContainer>
            <Tooltip size={12}>
              {tooltip}
            </Tooltip>
          </ToolTipContainer>
        )}
        {sortable !== false && (
          <SortingIcon
            sorting={isSorted}
            isSortedDesc={isSortedDesc}
          />
        )}
      </Box>
    </CellWrapper>
  );
};

TableHeaderCell.propTypes = {
  column: PropTypes.object.isRequired,
};

export default TableHeaderCell;
