import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { MdInfo } from 'react-icons/md';
import Text from '../text';

const Container = styled.div`
  position: relative;
  text-align: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 1rem;
  display: flex;
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 16px;
  height: 16px;
  z-index: 2;
`;


const Bubble = styled.div`
  visibility: hidden;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.4rem 1rem;
  line-height: 0.9rem;
  min-width: 10rem;
  max-width: 20rem;
  left: 38%;
  border-radius: 0.23rem;
  transform: translate(-50%, 0);
  /* ${({ bottom }) => (bottom ? 'top: 0' : 'bottom: 0')}; */
  /* transition: opacity 0.15s, bottom 0.4s, top 0.4s, visibility 0.2s; */
  /* opacity: 0; */
  z-index: 0;

  &::after {
    content: " ";
    position: absolute;
    ${({ bottom }) => (bottom ? 'bottom' : 'top')}:
      ${({ addPercentage }) => (`${94 + addPercentage}%`)};
    left: 50%; 
    margin-left: -0.4rem;
    border-width: 0.5rem;
    border-style: solid;
    border-color: ${({ theme, bottom }) => (bottom
    ? `transparent transparent ${theme.colors.primary} transparent`
    : `${theme.colors.primary} transparent transparent transparent`)};
  }

  ${IconWrap}:hover + & {
    z-index: 1;
    ${({ bottom }) => (bottom ? 'top: 24px' : 'bottom: 24px')};
    opacity: 1;
    visibility: visible;
  }
`;

const BubbleText = styled.div`
  font-size: 0.7rem;
  font-weight: 300;
`;

const Tooltip = (props) => {
  const { children, theme, bottom } = props;

  return (
    <Container>
      <IconWrap theme={theme}>
        <MdInfo color={theme.colors.darkgrey} />
      </IconWrap>
      <Bubble bottom={bottom} addPercentage={Math.floor(children.length / 20)}>
        <BubbleText>
          <Text size="tiny" style={{ color: theme.colors.white, fontStyle: 'normal' }}>{children}</Text>
        </BubbleText>
      </Bubble>
    </Container>
  );
};

Tooltip.propTypes = {
  children: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  bottom: PropTypes.bool,
};
Tooltip.defaultProps = {
  bottom: false,
};

export default withTheme(Tooltip);
