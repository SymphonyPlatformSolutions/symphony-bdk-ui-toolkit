import React from 'react';

import styled from 'styled-components';

export default function Separator() {
  return (
    <BaseSeparator />
  );
}

const BaseSeparator = styled.div`
  width: 100%;
  border-bottom: ${({ theme }) => `1px ${theme.theme.grey} solid`};
`;
