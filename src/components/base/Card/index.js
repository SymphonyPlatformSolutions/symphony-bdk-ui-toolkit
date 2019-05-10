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
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`;
