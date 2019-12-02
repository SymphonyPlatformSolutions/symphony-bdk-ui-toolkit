import React from 'react';
import styled from 'styled-components';
import { ArrowRightCircle } from 'styled-icons/feather';
import Card from '../../base/card';

export const HelperLink = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary_500};
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;


export const StyledArrowRightCircle = styled(ArrowRightCircle)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary_500}
  opacity: 0.7;
  transition: ease opacity .2s;
  &:hover {
    opacity: 1;
  }
`;
export const StyledCard = styled(Card)`
  height: 35px;
  max-height: 150px;
`;

export const StyledSubTopicContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledSubTopic = styled(Card)`
  width: 240px;
  height: 128px;
`;

export const HelpPageContainer = styled.div`
  width: 42rem;
`;
