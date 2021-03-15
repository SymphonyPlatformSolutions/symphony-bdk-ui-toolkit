import React from 'react';
import PropTypes from 'prop-types';

import { ChevronButton } from './theme';
import { DownChevron, DoubleChevron } from '../../../misc/icons';

const CHEVRON_COLOR = '#008EFF';

const Header = (props) => {
  const {
    goToPreviousMonth = () => {},
    goToNextMonth = () => {},
    goToPreviousYear = () => {},
    goToNextYear = () => {},
  } = props;

  return (
    <div>
      <ChevronButton
        type="button"
        onClick={goToPreviousYear}
        turnHalf
        spacing={20}
      >
        <DoubleChevron width={12.5} height={10} color={CHEVRON_COLOR} />
      </ChevronButton>

      <ChevronButton
        type="button"
        onClick={goToPreviousMonth}
        turnLeft
        spacing={40}
      >
        <DownChevron size={10} color={CHEVRON_COLOR} />
      </ChevronButton>

      <ChevronButton type="button" onClick={goToNextMonth} isRight spacing={40}>
        <DownChevron size={10} color={CHEVRON_COLOR} />
      </ChevronButton>

      <ChevronButton
        type="button"
        onClick={goToNextYear}
        isRight
        noRotation
        spacing={20}
      >
        <DoubleChevron width={12.5} height={10} color={CHEVRON_COLOR} />
      </ChevronButton>
    </div>
  );
};

Header.propTypes = {
  goToPreviousMonth: PropTypes.func,
  goToNextMonth: PropTypes.func,
  goToPreviousYear: PropTypes.func,
  goToNextYear: PropTypes.func,
};

export default Header;
