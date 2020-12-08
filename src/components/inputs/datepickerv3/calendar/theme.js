import styled from 'styled-components';

const getGridTemplateColumns = ({ activeMonths }) => {
  return `repeat(${activeMonths.length}, 200px)`;
};

export const Wrapper = styled.div`
  width: 200px;
  display: grid;
  gridtemplatecolumns: ${getGridTemplateColumns};
  gridgap: 0 64px;
`;
