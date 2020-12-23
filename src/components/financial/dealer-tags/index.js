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
    children, 
    closeButtonSize = 18,
    subText = null,
    closeHandler = null,
    ...rest
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
      {closeHandler && <CloseButton onClick={closeHandler} size={closeButtonSize} />}
    </TagContainer>
  );
};

DealerTag.propTypes = {
  children: PropTypes.string.isRequired,
  subText: PropTypes.string,
  closeButtonSize: PropTypes.number,
  closeHandler: PropTypes.func,
};

export default withTheme(DealerTag);
