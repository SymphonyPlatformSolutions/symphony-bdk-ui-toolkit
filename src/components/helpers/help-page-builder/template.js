import React from 'react';
import { BookBookmark, Bookmark } from 'styled-icons/boxicons-regular';
import Faker from 'faker';
import styled from 'styled-components';
import Box from '../../layout/box';
import Text from '../../misc/text';
import HelpPageBuilder from './index';
import { HelperLink } from './theme';

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

export const PAGE_DATA_ONE_LEVEL = {
  title: 'Help page',
  description: 'this is a help Page, it has topics and content',
  topics: [],
};

const SampleCustomnContentComponent = openArticleById => (
  <React.Fragment>
    <Text>This is a custom content with a <HelperLink onClick={openArticleById('1')}>Link</HelperLink></Text>
  </React.Fragment>
);

for (let i = 0; i < 4; i++) {
  const topic = {
    id: `${i}`,
    title: Faker.lorem.word(),
    description: Faker.lorem.words(),
    contents: [],
  };
  for (let j = 0; j < 3; j++) {
    const content = {
      title: `STEP ${j + 1}`,
      description: j === 0 ? SampleCustomnContentComponent : Faker.lorem.sentences(),
      imageUrl: Faker.image.imageUrl(),
    };
    topic.contents.push(content);
  }

  PAGE_DATA_ONE_LEVEL.topics.push(topic);
}

PAGE_DATA_ONE_LEVEL.topics.forEach((topic) => {
  topic.relatedContent = PAGE_DATA_ONE_LEVEL.topics.map(entry => ({
    id: entry.id,
    title: entry.title,
    url: entry.url,
  }));
});


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

export const OneLevel = () => (
  <Box horizontal space={20}>
    <HelpPageBuilder config={PAGE_DATA_ONE_LEVEL} />
  </Box>
);


export const TwoLevels = () => (
  <Box horizontal space={20}>
    <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
  </Box>
);
