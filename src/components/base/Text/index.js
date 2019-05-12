import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const PADDING = {
  tiny: '3px 10px',
  small: '5px 10px',
  large: '8px 10px',
};
const FONTSIZE = {
  tiny: '12px',
  small: '14px',
  large: '16px',
};
const FONTSIZETITLE = {
  tiny: '12px',
  small: '18px',
  large: '24px',
};
const LINEHEIGHT = {
  tiny: '16px',
  small: '16px',
  large: '20px',
};
const LINEHEIGHTTITLE = {
  tiny: '14px',
  small: '20px',
  large: '29px',
};

const getTextColor = (title, size) => (title || size !== 'tiny' ? colors.darkgrey : colors.grey);
const getPadding = size => PADDING[size];
const getFontStyle = (title, size) => (title || size !== 'tiny' ? 'normal' : 'italic');
const getFontSize = (title, size) => (title ? FONTSIZETITLE[size] : FONTSIZE[size]);
const getLineHeight = (title, size) => (title ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size]);
const getFontWeight = title => (title ? '900' : '400');
const getBorderBottom = underline => (underline ? `1px ${colors.lightgrey} solid` : '0px');

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

const BaseText = styled.div`
  color: ${p => getTextColor(p.title, p.size)};
  font-family: 'Lato', sans-serif;
  font-style: ${p => getFontStyle(p.title, p.size)};
  font-size: ${p => getFontSize(p.title, p.size)};
  font-weight: ${p => getFontWeight(p.title)};
  line-height: ${p => getLineHeight(p.title, p.size)};
  padding: ${p => getPadding(p.size)};
  border-bottom: ${p => getBorderBottom(p.underline)};
  margin-top: 10px;
  margin-bottom: 10px;
`;
