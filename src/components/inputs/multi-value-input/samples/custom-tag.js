import React from 'react';
import styled from 'styled-components';
import QuoteProductTag from '../../../financial/quote-product-tag';

const TagContainer = styled.div`
margin: 4px 7px 0 0;
`;

export const Tag = (props) => {
  const { hasClose, removeHandler, element } = props;

  if (Array.isArray(element)) {
    return (
      <TagContainer>
        <QuoteProductTag
          sideInfo={element[0].label}
          mainInfo={element[1] ? element[1].label : ''}
          tagState={hasClose ? 'active' : 'default'}
          onClose={() => removeHandler(element.value)}
        />
      </TagContainer>
    );
  }

  return (
    <TagContainer>
      <QuoteProductTag
        mainInfo={element.label}
        tagState={hasClose ? 'active' : 'default'}
        onClose={() => removeHandler(element.value)}
      />
    </TagContainer>
  );
};
