import styled from 'styled-components';

export const ALIGNMENTS = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'space-between',
};
const getAlignment = align => ALIGNMENTS[align] || ALIGNMENTS.center;

const StyledTable = styled.div`
  min-width: ${({ totalWidth }) => totalWidth}px;
  border-radius: 4px;
  border-spacing: 0;
`;

const THead = styled.div`
  background-color: ${({ theme }) => theme.colors.grey_100};
  padding-top: 2px;
  border-top: 2px solid ${({ theme }) => theme.colors.grey_100};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const THeadTr = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${({ align }) => getAlignment(align)};
`;

const THeadTh = styled.div`
  border-right: none;
  align-items: center;
`;

const TBodyTr = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.grey_100};
  transition: background-color 0.2s;
  display: flex;
  width: 100%;
  justify-content: ${({ align }) => getAlignment(align)};
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey_200};
  }
`;

const TBody = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.grey_100};
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  width: calc(100% - 4px);
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : undefined)};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const TBodyTd = styled.div`
`;

export default {
  StyledTable,
  THead,
  THeadTr,
  THeadTh,
  TBodyTr,
  TBody,
  TBodyTd,
};
