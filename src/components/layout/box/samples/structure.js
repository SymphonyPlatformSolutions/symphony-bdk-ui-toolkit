import React from 'react';
import Box from '..';

const HilighterBox = (props) => {
  const { children, style, ...rest } = props;
  return (
    <Box
      {...rest}
      style={{
        width: '100%',
        backgroundColor: 'rgba(53, 56, 62, 0.2)',
        padding: '10px',
        ...style,
      }}
    >{children}
    </Box>
  );
};

export default HilighterBox;
