import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

import { InfoIcon } from '../icons';
// eslint-disable-next-line import/no-cycle
import Text from '../text';

import { Bubble, Container, IconWrap } from './theme';

export const TooltipBubble = (props) => {
  const { show, children, bottom, theme, tooltipRef } = props;

  return ReactDOM.createPortal(
    <Bubble
      show={show}
      bottom={bottom}
      addPercentage={Math.floor(children.length / 25)}
      xPosition={
        tooltipRef.current
          ? tooltipRef.current.getBoundingClientRect().x + window.scrollX
          : 0
      }
      yPosition={
        tooltipRef.current
          ? tooltipRef.current.getBoundingClientRect().y + window.scrollY
          : 0
      }
    >
      <Text
        size="small"
        style={{ color: theme.colors.grey_050, fontStyle: 'normal' }}
      >
        {children}
      </Text>
    </Bubble>,
    document.body
  );
};

const Tooltip = (props) => {
  const { children, theme, bottom, size, color, ...rest } = props;
  const [isHover, changeHover] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <Container {...rest}>
      <IconWrap
        ref={tooltipRef}
        onMouseEnter={() => changeHover(true)}
        onMouseLeave={() => changeHover(false)}
        theme={theme}
      >
        <InfoIcon color={color} size={size} />
      </IconWrap>
      <TooltipBubble
        show={isHover}
        bottom={bottom}
        theme={theme}
        tooltipRef={tooltipRef}
      >
        {children}
      </TooltipBubble>
    </Container>
  );
};

Tooltip.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  bottom: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
};

Tooltip.defaultProps = {
  bottom: false,
  size: 15,
  color: null,
};

export default withTheme(Tooltip);
