import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import { getBackgroundColor, getBorderColor } from './theme';
import Separator from '../separator';
import { THEME_TYPES } from '../../..';

const BaseCard = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border: ${props => props.theme.mode === THEME_TYPES.DARK ? `2px solid ${getBorderColor(props)}`: `1px solid ${getBorderColor(props)}`};
  border-radius: 4px;
  box-shadow: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? '0 1px 2px 0 rgba(145, 151, 161, 0.5)' : '0 1px 2px 0 rgba(0, 0, 0, 0.5)')};
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? theme.colors.inputgrey : null)};
  
  &:hover {
    box-shadow: ${props => (props.hoverEffect ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' : null)};
    background-color: ${props => (props.hoverEffect ? getBackgroundColor(props) : null)};
  }
  width: 100%;
`;

const CardTitle = styled.span`;
  display: ${p => (p.title === '' ? 'none' : 'inline-block')};
`;


export default function Card(props) {
  const {
    children, titleText, hoverEffect, ...rest
  } = props;

  return (
    <BaseCard {...rest} hoverEfffect={hoverEffect}>
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
  hoverEffect: PropTypes.bool,
};

Card.defaultProps = {
  titleText: '',
  hoverEffect: false,
};
