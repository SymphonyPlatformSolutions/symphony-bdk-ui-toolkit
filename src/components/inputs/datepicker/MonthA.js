import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonContainer,
  MonthButtonText,
  MonthButton,
} from './theme';

function MonthA({
  label, value, onClick,
}) {
  const monthRef = useRef(null);

  if (!label) {
    return <div />;
  }

  return (
    <ButtonContainer>
      <MonthButton
        onClick={() => onClick(value)}
        type="button"
        ref={monthRef}
      >
        <MonthButtonText
          size="small"
        >
          {label}
        </MonthButtonText>
      </MonthButton>
    </ButtonContainer>
  );
}

MonthA.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  onClick: PropTypes.func,
};

MonthA.defaultProps = {
  label: null,
  value: null,
  onClick: () => {},
};

export default MonthA;