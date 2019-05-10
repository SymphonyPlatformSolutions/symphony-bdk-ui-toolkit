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
  small: '16px',
  large: '18px',
};
const LINEHEIGHT = {
  tiny: '16px',
  small: '16px',
  large: '20px'
};
const LINEHEIGHTTITLE = {
  tiny: '14px',
  small: '16px',
  large: '24px'
};

const getTextColor = (title, size) => (title || size!=='tiny' ? colors.darkgrey : colors.lightgrey);
const getPadding = size => PADDING[size];
const getFontStyle = (title, size) => (title || size!=='tiny' ? 'normal' : 'italic');
const getFontSize = (title, size) => (title ? FONTSIZETITLE[size] : FONTSIZE[size]);
const getLineHeight = (title, size) => (title ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size]);
const getFontWeight = title => (title ? '900' : '400');
const getBorderBottom = (title, size) => (title ? ((size === 'large') ? '1px #E6E6E6 solid' : '0px') : '0px');

class Text extends React.PureComponent {
  render() {
    const {
      children, title, size, ...rest
    } = this.props;

    return (
      <BaseText title={title} size={size} {...rest}>
        {children}
      </BaseText>
    );
  }
}

Text.propTypes = {
  title: PropTypes.bool,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Text.defaultProps = {
  title: false,
  size: 'large',
};

export default Text;

const BaseText = styled.div.attrs({
})`
  color: ${p => getTextColor(p.title, p.size)};
  font-family: 'Lato', sans-serif;
  font-style: ${p => getFontStyle(p.title, p.size)};
  font-size: ${p => getFontSize(p.title, p.size)};
  font-weight: ${p => getFontWeight(p.title)};
  line-height: ${p => getLineHeight(p.title, p.size)};
  padding: ${p => getPadding(p.size)};
  border-bottom: ${p => getBorderBottom(p.title, p.size)};
  margin-top: 10px;
  margin-bottom: 10px;
`;
