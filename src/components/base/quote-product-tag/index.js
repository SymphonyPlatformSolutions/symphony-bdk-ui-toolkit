import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import errorIconPath from '../../../assets/quote-product-tag/tag-error-icon.svg';
import closeDarkIconPath from '../../../assets/quote-product-tag/tag-close-dark-icon.svg';
import {
  BaseQuoteTag, SideInfo, MainInfo, IconImage, IconButton,
} from './theme';

const QuoteProductTag = (props) => {
  const {
    mainInfo, sideInfo, tagState, onClose, ...rest
  } = props;

  const renderIcon = () => {
    switch (tagState) {
      case 'active':
        return (
          <IconButton
            onClick={onClose}
          >
            <img src={closeDarkIconPath} alt="icon" />
          </IconButton>
        );
      case 'error':
        return (
          <IconImage src={errorIconPath} alt="icon" />
        );
      case 'default':
      case 'disabled':
      case 'removed':
      case 'added':
      default:
        return null;
    }
  };

  return (
    <BaseQuoteTag horizontal type="flat" align="center" {...rest}>
      {sideInfo
        && <SideInfo>{sideInfo.toUpperCase()}</SideInfo>
      }
      <MainInfo>{mainInfo.toUpperCase()}</MainInfo>
      {renderIcon()}
    </BaseQuoteTag>
  );
};

QuoteProductTag.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  tagState: PropTypes.string,
  onClose: PropTypes.func,
};

QuoteProductTag.defaultProps = {
  sideInfo: null,
  tagState: 'default',
  onClose: null,
};

export default withTheme(QuoteProductTag);
