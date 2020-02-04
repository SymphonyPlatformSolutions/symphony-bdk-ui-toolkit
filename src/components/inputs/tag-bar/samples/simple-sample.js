import React, { useState } from 'react';
import styled from 'styled-components';
import TagBar from '../index';
import QuoteProductTag from '../../../financial/quote-product-tag';
import Box from '../../../layout/box';

const TagContainer = styled.div`
  margin-right: 6px;
`;

export const CustomTag = (props) => {
  const { value: { value } } = props;

  return (
    <TagContainer>
      <QuoteProductTag mainInfo={value} />
    </TagContainer>
  );
};

export const TagBarHandler = props => {
  const [chosen, changeChosen] = useState([]);

  const tagChosen = newValue => {
    changeChosen([...chosen, { value: newValue, label: newValue }]);
  };

  const removeHandler = removingValue => {
    changeChosen(chosen.filter(el => removingValue.value !== el.value));
  };

  const onClear = () => {
    changeChosen([]);
  };

  return (
    <Box style={{ width: '95%' }}>
      <TagBar
        onChoose={tagChosen}
        onRemove={removeHandler}
        onClear={onClear}
        value={chosen}

        {...props}
      />
    </Box>
  );
};
