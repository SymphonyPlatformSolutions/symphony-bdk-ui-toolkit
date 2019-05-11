import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';

const getBorderBottom = (underline) => '1px ' + colors.lightgrey + ' solid';

class Separator extends React.PureComponent {
  render() {
    const {
      children, ...rest
    } = this.props;

    return (
      <BaseSeparator {...rest}>
        {children}
      </BaseSeparator>
    );
  }
}

Separator.propTypes = {
  children: PropTypes.node
};

Separator.defaultProps = {
};

export default Separator;

const BaseSeparator = styled.div.attrs({
})`
  width: 100%;
  border-bottom: ${p => getBorderBottom()};
`;
