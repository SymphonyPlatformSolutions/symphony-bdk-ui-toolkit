import React from 'react';
import Table from '../index';
import Box from '../../../layout/box';

export const StaticTableDemo = () => (
  <Box p={15} style={{ width: '80%' }}>
    <Box space={60} p="0 16px 0 0">
      <Table
        data={[]}
        columns={[]}
      />
    </Box>
    <Box space={60} p="0 16px 0 0">
      <Table
        data={[]}
        columns={[]}
        loading
      />
    </Box>
  </Box>
);
