import React from 'react';
import styled from 'styled-components';
import Text from '../text';
import Box from '../box';

const TextLabel = styled(Text)`
  margin: 0 0 8px 0;
  padding: none;
`;

const FormBox = (props) => {
  const { children } = props;
  return (
    <Box>
      {children.map((child) => {
        if (child.props.children) {
          const [firstChild, ...stuff] = child.props.children;
          if (typeof firstChild === 'string') {
            return (
              <div><TextLabel mx="0" my="0" px="0" py="0">{firstChild}</TextLabel>{stuff}</div>
            );
          }
        }
        return child;
      })}
    </Box>
  );
};

export default FormBox;
