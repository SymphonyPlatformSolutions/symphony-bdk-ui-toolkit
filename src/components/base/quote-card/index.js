import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  BaseCard, QuoteIdArea, ContentArea, MenuArea,
  QuoteIdLabel, QuoteIdName,
} from './theme';
import Box from '../box';
import QuotePanel from '../quote-panel';
import QuoteBadge from '../quote-badge';

const QuoteCard = (props) => {
  const {
    quoteIdName, panelData, badges, onRemove,
    ...rest
  } = props;

  return (
    <BaseCard {...rest}>
      <QuoteIdArea id={quoteIdName}>
        <QuoteIdLabel>RFQ</QuoteIdLabel>
        <QuoteIdName>{quoteIdName}</QuoteIdName>
      </QuoteIdArea>
      <ContentArea>
        <Box vertical space={16}>
          {panelData && (
          <QuotePanel
            dealerName={panelData.dealerName}
            dealerPayedValue={panelData.dealerPayedValue}
            clientName={panelData.clientName}
            clientPayedValue={panelData.clientPayedValue}
          />
          )}
          {badges && (
          <Box horizontal space={4}>
            {badges.map(badge => (
              <QuoteBadge
                key={badge.productId}
                mainInfo={badge.mainInfo}
                sideInfo={badge.sideInfo}
                hasCloseButton
                onClose={() => onRemove(badge.productId)}
              />
            ))}
          </Box>
          )}
        </Box>
      </ContentArea>
      <MenuArea>...</MenuArea>
    </BaseCard>
  );
};

QuoteCard.propTypes = {
  quoteIdName: PropTypes.string.isRequired,
  panelData: PropTypes.object,
  badges: PropTypes.array,
  onRemove: PropTypes.func,
};

QuoteCard.defaultProps = {
  panelData: null,
  badges: null,
  onRemove: null,
};

export default withTheme(QuoteCard);
