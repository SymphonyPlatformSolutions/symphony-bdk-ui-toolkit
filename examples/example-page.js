/*
  You can test npm package locally running npm on sms-sdk-toolbox-ui folder
  Then npm link on example folder
*/

import React from 'react';
import Button from 'sms-sdk-toolbox-ui';

const ExamplePage = () => (
  <React.Fragment>
    <Button size="large" type="primary" fill onClick={() => console.log('Clicked!')}>
      <span>Primary</span>
    </Button>
  </React.Fragment>
);

export { ExamplePage };
