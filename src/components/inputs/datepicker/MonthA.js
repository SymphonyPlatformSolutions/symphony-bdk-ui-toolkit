import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useMonth } from '@datepicker-react/hooks';
import DatepickerContext from './datepickerContext';
import {
  ButtonContainer,
  ButtonText,
  MonthButton,
} from './theme';

function MonthA({ label, value, year, onClick }) {
  const monthRef = useRef(null);

  if (!label) {
    return <div />;
  }

  return (
    <ButtonContainer>
      <MonthButton
        onClick={() => onClick(value)}
        // tabIndex={tabIndex}
        type="button"
        ref={monthRef}
        // isSelectedStartOrEnd={isSelectedStartOrEnd}
        // isSelected={isSelected}
      >
        <ButtonText
          // isSelected={isSelectedStartOrEnd || isSelected}
          size="small"
        >
          {label}
        </ButtonText>
      </MonthButton>
    </ButtonContainer>
  );
}

MonthA.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  year: PropTypes.number,
  onClick: PropTypes.func,
};

MonthA.defaultProps = {
  label: null,
  value: null,
  year: null,
  onClick: () => {}
};

export default MonthA;
