import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import { getBackgroundColor, getBorderColor, getBoxShadowColor } from './theme';
import Separator from '../separator';

const BaseCard = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${props => `1px solid ${getBorderColor(props)}`};
  border-radius: 2px;
  box-shadow: ${props => `0 1px 3px ${getBoxShadowColor(props)}, 0 1px 2px ${getBoxShadowColor(props)}`};

  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    background-color: ${props => getBackgroundColor(props)};
  }
  width: 100%;
`;

const CardTitle = styled.span`;
  display: ${p => (p.title === '' ? 'none' : 'inline-block')};
`;


export default function Card(props) {
  const {
    children, titleText, ...rest
  } = props;

  return (
    <BaseCard {...rest}>
      <Box space={10}>
        {titleText && (
        <CardTitle titleText={titleText}>
          <Box style={{ padding: '10px' }}>
            <Text isTitle size="large">{titleText}</Text>
          </Box>
          <Separator />
        </CardTitle>
        )
        }
        <Box style={{ padding: '10px' }}>{children}</Box>
      </Box>
    </BaseCard>
  );
}

Card.propTypes = {
  titleText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Card.defaultProps = {
  titleText: '',
};
