import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const px = n => `${n}px`;

const getMargin = ({ mx, my }) => {
  const providedMx = mx || '0px';
  const providedMy = my || '0px';
  return `${providedMy} ${providedMx}`;
};

const BOX_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat',
};

const computeSpace = (props) => {
  let innerSpace;
  if (props.space) {
    innerSpace = props.space;
  } else {
    switch (props.type) {
      case BOX_TYPES.SECONDARY:
        innerSpace = 16;
        break;
      case BOX_TYPES.FLAT:
        return '';
      case BOX_TYPES.PRIMARY:
      default:
        innerSpace = 24;
    }
  }

  if (props.horizontal) {
    return `
    > * + * {
      margin-left: ${px(innerSpace)} !important
    }
    `;
  }
  return `
    > * + * {
      margin-top: ${px(innerSpace)} !important
    }
  `;
};

const direction = props => (props.horizontal ? 'row' : 'column');

export default function Box({
  display = 'flex',
  align = 'stretch',
  justify = 'flex-start',
  grow = 'initial',
  space = 0,
  bg = 'inherit',
  p = 0,
  mx = 0,
  my = 0,
  type = BOX_TYPES.PRIMARY,
  ...rest
}) {
  return (
    <BaseBox
      display={display}
      align={align}
      justify={justify}
      grow={grow}
      space={space}
      bg={bg}
      p={p}
      mx={mx}
      my={my}
      type={type}
      {...rest}
    />
  );
}

const BaseBox = styled.div`
  box-sizing: border-box;
  display: ${p => p.display};
  flex-direction: ${direction};
  flex-grow: ${p => p.grow};
  justify-content: ${p => p.justify};
  align-items: ${p => p.align};
  padding: ${props => props.p};
  background: ${p => p.bg};
  overflow: ${p => p.overflow};
  margin: ${props => getMargin(props)};
  ${computeSpace};
`;

Box.propTypes = {
  display: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  grow: PropTypes.string,
  space: PropTypes.number,
  bg: PropTypes.string,
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mx: PropTypes.string,
  my: PropTypes.string,
  type: PropTypes.oneOf([BOX_TYPES.PRIMARY, BOX_TYPES.SECONDARY, BOX_TYPES.FLAT]),
};
