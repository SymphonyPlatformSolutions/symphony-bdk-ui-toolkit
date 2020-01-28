import React from 'react';
import { BookBookmark, Bookmark } from 'styled-icons/boxicons-regular';
import Faker from 'faker';
import styled from 'styled-components';
import Box from '../../../layout/box';
import HelpPageBuilder from '../index';

const StyledBookBookmarkIcon = styled(BookBookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary_500};
`;
const StyledBookmarkIcon = styled(Bookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary_500};
`;

export const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [],
};

for (let i = 0; i < 3; i++) {
  const data = {
    title: Faker.lorem.word(),
    description: Faker.lorem.words(),
    icon: <StyledBookBookmarkIcon size={32} />,
    topics: [],
  };
  for (let j = 0; j < 6; j++) {
    const subTopic = {
      id: `${j}`,
      title: Faker.lorem.word(),
      description: Faker.lorem.sentences().slice(0, 50),
      icon: <StyledBookmarkIcon />,
      contents: [],
    };

    for (let k = 0; k < 3; k++) {
      const content = {
        title: `STEP ${k + 1}`,
        description: Faker.lorem.sentences(),
        imageUrl: Faker.image.imageUrl(),
      };
      subTopic.contents.push(content);
    }

    data.topics.push(subTopic);
  }
  data.topics.forEach((subTopic) => {
    subTopic.relatedContent = data.topics.map(entry => ({
      id: entry.id,
      title: entry.title,
      url: entry.url,
    }));
  });

  PAGE_DATA_TWO_LEVELS.topics.push(data);
}

export const TwoLevels = () => (
  <Box horizontal space={20}>
    <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
  </Box>
);
