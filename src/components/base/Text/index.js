import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import {
  getBorderBottom,
  getFontSize,
  getFontStyle,
  getFontWeight,
  getLineHeight,
  getPadding,
  getTextColor,
} from './theme';


const BaseText = styled.div`
  color: ${props => getTextColor(props)};
  font-family: 'Lato', sans-serif;
  font-style: ${props => getFontStyle(props)};
  font-size: ${props => getFontSize(props)};
  font-weight: ${props => getFontWeight(props)};
  line-height: ${props => getLineHeight(props)};
  padding: ${props => getPadding(props)};
  border-bottom: ${props => getBorderBottom(props)};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default function Text(props) {
  const {
    children, title, size, underline, ...rest
  } = props;

  return (
    <BaseText title={title} size={size} underline={underline} {...rest}>
      {children}
    </BaseText>
  );
}

Text.propTypes = {
  title: PropTypes.bool,
  size: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  title: false,
  size: 'large',
  underline: false,
};
