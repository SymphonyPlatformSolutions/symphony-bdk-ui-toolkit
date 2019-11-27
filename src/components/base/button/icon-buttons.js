import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import {
  StarIcon, EmptyStarIcon, CloseIcon, EllipsisIcon,
} from '../icons';

const ButtonBG = styled.button`
  border: none;
  transition: all 0.3s;
  border-radius: 50%;
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  outline: none;
  padding: 0;
  width: ${({ size }) => size || 22}px;
  height: ${({ size }) => size || 22}px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_200};
  }
  cursor: pointer;
`;

export const FavoriteButton = (props) => {
  const { onClick, isFavorite, size } = props;
  return (
    <ButtonBG onClick={onClick} size={size}>
      {isFavorite ? <StarIcon /> : <EmptyStarIcon />}
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
