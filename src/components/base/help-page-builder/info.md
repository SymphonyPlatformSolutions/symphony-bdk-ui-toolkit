# Help Page Builder
This is a component that automatically builds a help page with up to 2 levels of data.

## Data Sample
```jsx
import Faker from 'faker';

const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [
  {
    title: Faker.lorem.word(),
    description: Faker.lorem.words(),
    icon: <StyledBookBookmarkIcon size={32} />,
    topics: [
    {
      id: 'UniqueTopicId',
      title: Faker.lorem.word(),
      description: Faker.lorem.sentences().slice(0, 50),
      icon: <StyledBookmarkIcon />,
      contents: [
      {
        title: 'Step 1',
        description: Faker.lorem.sentences(),
        imageUrl: Faker.image.imageUrl(),
      }
      ],
    }
    ],
    relatedContent: [
    {
     id: 'UniqueTopicId',
     title: 'entry.title',
     url: 'entry.url',	
   }
   ],
 }
 ],
};

const PAGE_DATA_ONE_LEVEL = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [
  {
    id: 'UniqueTopicId',
    title: Faker.lorem.word(),
    description: Faker.lorem.sentences().slice(0, 50),
    icon: <StyledBookmarkIcon />,
    contents: [
    {
     title: 'Step 1',
     description: Faker.lorem.sentences(),
     imageUrl: Faker.image.imageUrl(),
   }
   ],
   relatedContent: [
   {
    id: 'UniqueTopicId',
    title: 'entry.title',
    url: 'entry.url', 
  }
  ],
}]}
```
## Sample
```jsx
 <HelpPageBuilder
    config={PAGE_DATA_TWO_LEVELS}
 />
```


## Proptypes
```jsx
HelpPageBuilder.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      icon: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      topics: PropTypes.array,
      contents: PropTypes.array,
    })),
  }),
};
HelpPageBuilder.defaultProps = {
  config: null,
};
```
