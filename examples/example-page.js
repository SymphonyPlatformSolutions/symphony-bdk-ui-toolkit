/*
  You can test npm package locally running npm on symphony-bdk-toolkit-ui folder
  Then npm link on example folder
*/

import React from 'react';
import Button from 'symphony-bdk-toolkit-ui';

const ExamplePage = () => (
  <React.Fragment>
    <Button size="large" type="primary" fill onClick={() => console.log('Clicked!')}>
      <span>Primary</span>
    </Button>
  </React.Fragment>
);

export { ExamplePage };
