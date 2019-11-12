import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  BaseCard, QuoteShortCodeArea, ContentArea, MenuArea,
  QuoteShortCodeLabel, QuoteShortCodeName, TagList,
} from './theme';
import Box from '../box';
import QuotePanel from '../quote-panel';
import QuoteProductTag from '../quote-product-tag';

const QuoteCard = (props) => {
  const {
    quoteShortCode, colorIndex, panelData, productData, onEdit, onCancel,
    ...rest
  } = props;

  const getProductTags = () => {
    const tags = [];

    if (productData) {
      // add the first tag (product name) that will always exist
      tags.push({
        mainInfo: productData.name,
        sideInfo: null,
      });

      if (productData.currency) {
        tags.push({
          mainInfo: productData.currency,
          sideInfo: productData.rateIndex,
        });
      }

      if (productData.clearingHouse) {
        tags.push({
          mainInfo: productData.clearingHouse,
        });
      }

      if (productData.startDate) {
        tags.push({
          mainInfo: productData.startDate,
          sideInfo: 'start',
        });
      }

      if (productData.tenorDate) {
        tags.push({
          mainInfo: productData.tenorDate,
          sideInfo: 'tenor',
        });
      }

      if (productData.roll) {
        tags.push({
          mainInfo: productData.roll,
          sideInfo: 'roll',
        });
      }

      if (productData.size) {
        tags.push({
          mainInfo: `${productData.size.currency} ${productData.size.value}${productData.size.multiplier}`,
          sideInfo: productData.size.type,
        });
      }

      if (productData.payDirection) {
        tags.push({
          mainInfo: productData.payDirection,
          sideInfo: null,
        });
      }
    }

    return tags;
  };

  return (
    <BaseCard {...rest}>
      <QuoteShortCodeArea colorIndex={colorIndex}>
        <QuoteShortCodeLabel>RFQ</QuoteShortCodeLabel>
        <QuoteShortCodeName>{quoteShortCode}</QuoteShortCodeName>
      </QuoteShortCodeArea>
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
          {productData && (
          <TagList>
            {getProductTags().map(tag => (
              <QuoteProductTag
                key={tag.mainInfo}
                mainInfo={tag.mainInfo}
                sideInfo={tag.sideInfo}
              />
            ))}
          </TagList>
          )}
        </Box>
      </ContentArea>
      <MenuArea>...</MenuArea>
    </BaseCard>
  );
};

QuoteCard.propTypes = {
  quoteShortCode: PropTypes.string.isRequired,
  colorIndex: PropTypes.number.isRequired,
  panelData: PropTypes.object,
  productData: PropTypes.object,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
};

QuoteCard.defaultProps = {
  panelData: null,
  productData: null,
  onEdit: null,
  onCancel: null,
};

export default withTheme(QuoteCard);
