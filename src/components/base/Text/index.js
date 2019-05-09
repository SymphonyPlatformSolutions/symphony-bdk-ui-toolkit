import React from 'react';
// import color from 'color';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const PADDING = {
  tiny: '3px 10px',
  small: '5px 15px',
  large: '5px 20px',
};
const FONTSIZE = {
  tiny: '10px',
  small: '16px',
  large: '24px',
};
const FONTTITLE = {
  tiny: '14px',
  small: '22px',
  large: '28px',
};

const getTextColor = () => colors.darkgrey;
const getPadding = size => PADDING[size];
const getFontSize = (title, size) => (title ? FONTTITLE[size] : FONTSIZE[size]);
const getFontWeight = title => (title ? '900' : '400');
const getBorderBottom = (title, size) => (title ? ((size=='large') ? '1px #E6E6E6 solid' : '0px' ) : '0px');

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
  children: PropTypes.node.isRequired
};

Text.defaultProps = {
  title: false,
  size: 'large'
};

export default Text;

const BaseText = styled.div.attrs({
})`
  font-family: 'Lato', sans-serif;
  color: ${p => getTextColor()};;
  font-size: ${p => getFontSize(p.title, p.size)};
  font-weight: ${p => getFontWeight(p.title)};
  padding: ${p => getPadding(p.size)};
  border-bottom: ${p => getBorderBottom(p.title, p.size)};
  margin-top: 10px;
  margin-bottom: 10px;
`;
