import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const px = n => `${n}px`;

const getMargin = ({ mx, my }) => {
  const providedMx = mx || '0px';
  const providedMy = my || '0px';
  return `${providedMy} ${providedMx}`;
};

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

const direction = props => (props.horizontal ? 'row' : 'column');

export default function Box(props) {
  return (
    <BaseBox {...props} />
  );
}

const BaseBox = styled.div`
  box-sizing: inherit;
  display: ${p => p.display};
  flex-direction: ${direction};
  flex-grow: ${p => p.grow};
  justify-content: ${p => p.justify};
  align-items: ${p => p.align};
  padding: ${props => props.p};
  background: ${p => p.bg};
  margin: ${props => getMargin(props)};
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
  mx: PropTypes.string,
  my: PropTypes.string,
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
  mx: null,
  my: null,
};
