import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box';
import Text from '../../misc/text';
import { BaseCard, CardTitle } from './theme';
import Separator from '../../misc/separator';

export default function Card(props) {
  const {
    children,
    titleText = '',
    hoverEffect = false,
    p = 10,
    overflow = 'hidden',
    ...rest
  } = props;

  return (
    <BaseCard p={p} overflow={overflow} hoverEffect={hoverEffect} {...rest}>
      <Box space={10}>
        {titleText && (
        <CardTitle titleText={titleText}>
          <Box style={{ padding: '10px' }}>
            <Text isTitle size="large">{titleText}</Text>
          </Box>
          <Separator />
        </CardTitle>
        )}
        <Box type="flat">{children}</Box>
      </Box>
    </BaseCard>
  );
}

Card.propTypes = {
  titleText: PropTypes.string,
  children: PropTypes.node.isRequired,
  hoverEffect: PropTypes.bool,
  p: PropTypes.number,
  overflow: PropTypes.string,
};
