import React from 'react';
import Button from '../src/base/button/button';

const styles = {
  color: 'red',
  fontSize: '10px',
};

const ExamplePage = () => (
  <div>
    <Button
      styles={styles}
    >
      With in Line
    </Button>
  </div>
);

export { ExamplePage };
