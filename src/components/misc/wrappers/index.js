import React from 'react';
import PropTypes from 'prop-types';

import { Background, Wrapper, RemChanger } from './theme';

const StoryWrapper = ({ children }) => (
  <Background>
    <Wrapper>
      <RemChanger />
      {children}
    </Wrapper>
  </Background>
);

StoryWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default StoryWrapper;
