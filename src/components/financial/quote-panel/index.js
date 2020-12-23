import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  BasePanel, LeftSideHeader, RightSideHeader,
  LeftSideValue, RightSideValue,
} from './theme';

const QuotePanel = (props) => {
  const {
    dealerName, dealerPayedValue,
    clientName, clientPayedValue,
    ...rest
  } = props;

  return (
    <BasePanel {...rest}>
      <LeftSideHeader>{`${dealerName} pay / ${clientName} rec`}</LeftSideHeader>
      <RightSideHeader>{`${dealerName} rec / ${clientName} pay`}</RightSideHeader>
      <LeftSideValue type="flat" align="center" justify="center">{dealerPayedValue}</LeftSideValue>
      <RightSideValue type="flat" align="center" justify="center">{clientPayedValue}</RightSideValue>
    </BasePanel>
  );
};

QuotePanel.propTypes = {
  dealerName: PropTypes.string.isRequired,
  dealerPayedValue: PropTypes.number.isRequired,
  clientName: PropTypes.string.isRequired,
  clientPayedValue: PropTypes.number.isRequired,
};

export default withTheme(QuotePanel);
