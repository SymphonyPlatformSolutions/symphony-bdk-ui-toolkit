import React from 'react';
import Faker from 'faker';
import Box from '../../../layout/box';
import Text from '../../../misc/text';
import HelpPageBuilder from '../index';
import { HelperLink } from '../theme';

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


export const OneLevel = () => (
  <Box horizontal space={20}>
    <HelpPageBuilder config={PAGE_DATA_ONE_LEVEL} />
  </Box>
);
