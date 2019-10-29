import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { MdClose } from 'react-icons/md';
import {
  BaseBadge, SideInfo, MainInfo, IconButton,
} from './theme';

const QuoteBadge = (props) => {
  const {
    mainInfo, sideInfo, hasCloseButton, onClose, ...rest
  } = props;

  return (
    <BaseBadge horizontal type="flat" {...rest}>
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
    </BaseBadge>
  );
};

QuoteBadge.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  hasCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
};

QuoteBadge.defaultProps = {
  sideInfo: null,
  hasCloseButton: false,
  onClose: null,
};

export default withTheme(QuoteBadge);
