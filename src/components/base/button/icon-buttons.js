import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import {
  StarIcon, EmptyStarIcon, CloseIcon, EllipsisIcon,
} from '../icons';

const ButtonBG = styled.button`
  font-family: 'Lato';
  transition: all 0.3s;
  display: flex;
  margin: auto;
  border: none;
  background: transparent;
  padding: 5px;
  border-radius: 50%;
  // width: ${({ size }) => size || 22}px;
  // height: ${({ size }) => size || 22}px;
  :before {
    transform: scale(2);
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_200};
  }
  cursor: pointer;
`;

export const FavoriteButton = (props) => {
  const { onClick, isFavorite, size } = props;
  return (
    <ButtonBG onClick={onClick} size={size}>
      {isFavorite ? <StarIcon style={{transform: 'translate(0px, -0.4px)'}} /> : <EmptyStarIcon />}
    </ButtonBG>
  );
};

export const CloseButton = withTheme((props) => {
  const { onClick, theme, size } = props;
  const [isHovering, setHovering] = useState(false);
  return (
    <ButtonBG
      onClick={onClick}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      size={size}
    >
      <CloseIcon
        style={{ transform: 'translate(0.6px, 0.5px)' }}
        color={isHovering ? theme.colors.grey_800 : theme.colors.grey_600}
      />
    </ButtonBG>
  );
});

export const MoreButton = withTheme((props) => {
  const { onClick, theme, size } = props;
  const [isHovering, setHovering] = useState(false);
  return (
    <ButtonBG
      onClick={onClick}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      size={size}
    >
      <EllipsisIcon
        color={isHovering ? theme.colors.grey_800 : theme.colors.grey_600}
      />
    </ButtonBG>
  );
});
