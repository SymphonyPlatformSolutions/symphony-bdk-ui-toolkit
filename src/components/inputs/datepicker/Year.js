import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonContainer,
  YearButtonText,
  YearButton,
} from './theme';

function Year({ year, onClick }) {
  const yearRef = useRef(null);

  if (!year) {
    return <div />;
  }

  return (
    <ButtonContainer>
      <YearButton
        onClick={() => onClick(year)}
        type="button"
        ref={yearRef}
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
};

Year.defaultProps = {
  year: null,
  onClick: () => {}
};

export default Year;
