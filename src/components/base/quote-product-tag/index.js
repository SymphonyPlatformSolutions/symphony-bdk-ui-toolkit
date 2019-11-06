import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { MdClose } from 'react-icons/md';
import {
  BaseBadge as BaseQuoteTag, SideInfo, MainInfo, IconButton,
} from './theme';

const QuoteProductTag = (props) => {
  const {
    mainInfo, sideInfo, hasCloseButton, onClose, ...rest
  } = props;

  return (
    <BaseQuoteTag horizontal type="flat" {...rest}>
      {sideInfo
        && <SideInfo>{sideInfo.toUpperCase()}</SideInfo>
      }
      <MainInfo>{mainInfo.toUpperCase()}</MainInfo>
      {hasCloseButton
        && (
        <IconButton
          onClick={onClose}
        >
          <MdClose />
        </IconButton>
        )
      }
    </BaseQuoteTag>
  );
};

QuoteProductTag.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

QuoteProductTag.defaultProps = {
  sideInfo: null,
  hasCloseButton: false,
  onClose: null,
};

export default withTheme(QuoteProductTag);
