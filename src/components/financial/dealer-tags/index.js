import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { CloseButton } from '../../misc/button/icon-buttons';
import {
  MainTag,
  SubTag,
  TagContainer,
  MainTextContainer,
  SubTextContainer,
  TextContainer,
} from './themes';

const DealerTag = (props) => {
  const {
    children, subText, closeHandler, ...rest
  } = props;

  return (
    <TagContainer {...rest}>
      <TextContainer>
        <MainTextContainer>
          <MainTag>{children}</MainTag>
        </MainTextContainer>
        <SubTextContainer>
          <SubTag size="small">{subText}</SubTag>
        </SubTextContainer>
      </TextContainer>
      {closeHandler && <CloseButton onClick={closeHandler} size={18} />}
    </TagContainer>
  );
};

DealerTag.propTypes = {
  children: PropTypes.string.isRequired,
  subText: PropTypes.string,
  closeHandler: PropTypes.func,
};
DealerTag.defaultProps = {
  subText: null,
  closeHandler: null,
};
export default withTheme(DealerTag);
