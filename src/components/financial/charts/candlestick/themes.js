import styled from 'styled-components';
import { THEME_TYPES } from '../../../..';

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grey_100};
`;

export const ChartBackground = styled.div`
  position: absolute;
  transform: ${(props) => `translate(${props.margin.left}px,${props.margin.top}px)`};
  padding: ${(props) => `${props.margin.top}px ${props.margin.right}px ${props.margin.bottom}px ${props.margin.left}px`};
  width: ${(props) => props.width - (props.margin.right + props.margin.left) * 2}px;
  height: ${(props) => props.height - (props.margin.bottom + props.margin.top) * 2}px;
  background-color: ${({ theme }) => (theme.mode === THEME_TYPES.DARK ? theme.colors.secondary_900 : theme.colors.primary_050)};
`;
