import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonContainer,
  YearButtonText,
  YearButton,
} from './theme';

function Year({
  year = null,
  onClick = () => {},
  disabled = false,
  isSelected = false,
}) {
  const yearRef = useRef(null);

  if (!year) {
    return <div />;
  }

  return (
    <ButtonContainer disabled={disabled}>
      <YearButton
        onClick={() => onClick(year)}
        type="button"
        ref={yearRef}
        isSelected={isSelected}
      >
        <YearButtonText
          size="small"
        >
          {year}
        </YearButtonText>
      </YearButton>
    </ButtonContainer>
  );
}

Year.propTypes = {
  year: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
};

export default Year;
