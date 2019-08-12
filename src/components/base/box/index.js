import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const px = n => `${n}px`;
const space = (props) => {
  if (!props.space) return;
  if (props.horizontal) {
    return `
    > * + * {
      margin-left: ${px(props.space)} !important
    }
    `;
  }
  return `
    > * + * {
      margin-top: ${px(props.space)} !important
    }
  `;
};
const padding = props => `${px(props.p)}`;

const direction = props => (props.horizontal ? 'row' : 'column');

export default function Box(props) {
  return (
    <BaseBox {...props} />
  );
}

const BaseBox = styled.div`
  display: ${p => p.display};
  flex-direction: ${direction};
  flex-grow: ${p => p.grow};
  justify-content: ${p => p.justify};
  align-items: ${p => p.align};
  padding: ${padding};
  background: ${p => p.bg};
  ${space};
`;

Box.propTypes = {
  display: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  grow: PropTypes.string,
  space: PropTypes.number,
  bg: PropTypes.string,
  p: PropTypes.number,
};
Box.defaultProps = {
  display: 'flex',
  direction: 'flex-column',
  align: 'stretch',
  justify: 'flex-start',
  grow: 'initial',
  space: 0,
  bg: 'inherit',
  p: 0,
};
