import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Box from '../Box';
import Text from '../Text';

class Card extends React.PureComponent {
  render() {
    const {
      children, title, ...rest
    } = this.props;

    return (
      <BaseCard {...rest}>
        <Box>
          <Box>
            <Text title size="large">{title}</Text>
          </Box>
          <Box>{children}</Box>
        </Box>
      </BaseCard>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  title: 'Title',
};

export default Card;

const BaseCard = styled.div.attrs({
})`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px #D4D4D4 solid;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 #AEAEAE;
`;
