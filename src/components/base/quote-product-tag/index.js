import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import loadingIconPath from '../../../assets/quote-product-tag/tag-loading-icon.svg';
import errorIconPath from '../../../assets/quote-product-tag/tag-error-icon.svg';
import successIconPath from '../../../assets/quote-product-tag/tag-success-icon.svg';
import {
  BaseQuoteTag, SideInfo, MainInfo, IconImage, IconButton, getCloseIconPath,
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
            <img src={getCloseIconPath(props)} alt="icon" />
          </IconButton>
        );
      case 'loading':
        return (
          <IconImage src={loadingIconPath} alt="icon" />
        );
      case 'error':
        return (
          <IconImage src={errorIconPath} alt="icon" />
        );
      case 'success':
        return (
          <IconImage src={successIconPath} alt="icon" />
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
    <BaseQuoteTag horizontal type="flat" align="center" tagState={tagState} {...rest}>
      {sideInfo
        && <SideInfo tagState={tagState}>{sideInfo.toUpperCase()}</SideInfo>
      }
      <MainInfo tagState={tagState}>{mainInfo.toUpperCase()}</MainInfo>
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
