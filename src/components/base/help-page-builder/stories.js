import React from 'react';
import { storiesOf } from '@storybook/react';
import { BookBookmark, Bookmark } from 'styled-icons/boxicons-regular';
import Faker from 'faker';
import styled from 'styled-components';
import Box from '../box';
import Text from '../text';
import Info from './info.md';
import { StoryWrapper } from '../wrappers';
import HelpPageBuilder from './index';

const StyledBookBookmarkIcon = styled(BookBookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;
const StyledBookmarkIcon = styled(Bookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a help Page',
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
      title: Faker.lorem.word(),
      description: Faker.lorem.sentences().slice(0, 50),
      icon: <StyledBookmarkIcon />,
      contents: [],
      relatedContent: [
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
        {
          title: Faker.lorem.words(),
          url: Faker.internet.url(),
        },
      ],
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
  PAGE_DATA_TWO_LEVELS.topics.push(data);
}


storiesOf('Base', module)
  .add('Help Page Builder', () => (
    <StoryWrapper p={15}>
      <Box space={20}>
        <Text isTitle size="large">Help Page Builder</Text>
        <Text isTitle size="small">2 Level helper</Text>
        <Box horizontal space={20}>
          <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: {
      markdown: Info,
    },
  });
