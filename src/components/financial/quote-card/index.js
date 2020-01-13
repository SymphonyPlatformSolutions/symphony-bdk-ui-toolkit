import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import 'react-contexify/dist/ReactContexify.min.css';
import { contextMenu, Menu } from 'react-contexify';
import uuid from 'uuid';
import {
  BaseCard, QuoteShortCodeArea, ContentArea, MenuArea,
  QuoteShortCodeLabel, QuoteShortCodeName, TagList,
  IconButton, getMenuIcon, getMenuStyle, ContextMenuItem,
} from './theme';
import Box from '../../base/box';
import QuotePanel from '../quote-panel';
import QuoteProductTag from '../quote-product-tag';

const QuoteCard = (props) => {
  const {
    theme, quoteShortCode, colorIndex, panelData, productData,
    onEdit, onCancel, ...rest
  } = props;

  const [menuId, setMenuId] = useState(uuid.v1());

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

  const renderContextMenu = () => (
    <Menu animation="fade" id={menuId} {...getMenuStyle(theme)}>
      <ContextMenuItem
        type="primary"
        onClick={onEdit}
      >
        Edit
      </ContextMenuItem>
      <ContextMenuItem
        type="warn"
        onClick={onCancel}
      >
        Cancel RFQ
      </ContextMenuItem>
    </Menu>
  );

  const openContextMenu = (e) => {
    const rtlEvent = {

      x: e.x - 180,
      y: e.y,
      clientX: e.clientX - 180,
      clientY: e.clientY,
      stopPropagation: () => {
        e.stopPropagation();
      },
    };
    contextMenu.show({ id: menuId, event: rtlEvent });
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
      <MenuArea>
        <IconButton
          onClick={openContextMenu}
        >
          <img src={getMenuIcon(props)} alt="menu-icon" />
        </IconButton>
        {renderContextMenu()}
      </MenuArea>
    </BaseCard>
  );
};

QuoteCard.propTypes = {
  theme: PropTypes.object.isRequired,
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
