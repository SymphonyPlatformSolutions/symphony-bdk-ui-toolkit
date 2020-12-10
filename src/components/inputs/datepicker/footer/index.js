import React from 'react';
import PropTypes from 'prop-types';

import { FooterWrapper, Button } from './theme';

const Footer = (props) => {
  const { onFooterNavigationClick, footerNavigationButtons } = props;

  const handleOnClick = ({ daysToSubstract }) => {
    return () => {
      const now = new Date();
      const startDate = new Date();

      if (daysToSubstract > 0) {
        // +1 to handle current day.
        startDate.setDate(startDate.getDate() - daysToSubstract + 1);
      }

      onFooterNavigationClick({
        startDate,
        endDate: now,
        focusedInput: null,
      });
    };
  };

  return (
    <FooterWrapper>
      {footerNavigationButtons.map((button) => (
        <Button key={button.label} onClick={handleOnClick(button)}>
          {button.label}
        </Button>
      ))}
    </FooterWrapper>
  );
};

Footer.propTypes = {
  onFooterNavigationClick: PropTypes.func.isRequired,
  footerNavigationButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      daysToSubstract: PropTypes.number.isRequired,
    })
  ),
};

Footer.defaultProps = { footerNavigationButtons: [] };

export default Footer;
