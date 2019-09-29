import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowRightCircle } from 'styled-icons/feather';
import styled, { withTheme } from 'styled-components';
import Text from '../text';
import Box from '../box';
import Card from '../card';
import Button from '../button';
import { Separator } from '../../index';

const HelperLink = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const BreadCrumbs = ({ config, currentPage, handleNavigate }) => {
  const hasTopics = !!currentPage.node.topics;
  const hasContent = !!currentPage.node.contents;
  const breadCrumbsMap = [];

  if (config === currentPage.node) {
    breadCrumbsMap.push({ node: config, label: config.title, link: false });
  } else if (hasTopics) {
    breadCrumbsMap.push({ node: config, label: config.title, link: true });
    breadCrumbsMap.push({ node: currentPage.node, label: currentPage.node.title, link: false });
  } else if (hasContent) {
    breadCrumbsMap.push({ node: config, label: config.title, link: true });
    if (currentPage.parent !== config) {
      breadCrumbsMap.push({ node: currentPage.parent, label: currentPage.parent.title, link: true });
    }
    breadCrumbsMap.push({ node: currentPage.node, label: currentPage.node.title, link: false });
  }

  return (
    <Box type="flat" horizontal>
      {breadCrumbsMap.map((item, index) => (
        <React.Fragment>
          { !item.link && <Text>{item.label}</Text> }
          {item.link && (<HelperLink onClick={handleNavigate(item.node)}>{item.label}</HelperLink>)}
          { breadCrumbsMap.length !== (index + 1) && <Text px="5px"> > </Text> }
        </React.Fragment>
      ))}
    </Box>
  );
};
const StyledArrowRightCircle = styled(ArrowRightCircle)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary}
  opacity: 0.7;
  transition: ease opacity .2s;
  &:hover {
    opacity: 1;
  }
`;
const StyledCard = styled(Card)`
  height: 35px;
  max-height: 150px;
`;

const StyledSubTopicContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSubTopic = styled(Card)`
  width: 240px;
  height: 128px;
`;

const HelpPageContainer = styled.div`
  width: 42rem;
`;

const HELP_LEVELS = {
  ROOT: 0,
  SUB_TOPIC: 1,
  CONTENT: 2,
};

const RecursiveSearch = (id, node, parent = null) => {
  if (node && node.id === id) {
    return [node, parent];
  }
  const hasTopics = !!node.topics;
  const hasContent = !!node.contents;

  let result = null;
  if (hasTopics) {
    for (let i = 0; i < node.topics.length; i++) {
      const tmp = RecursiveSearch(id, node.topics[i], node);
      if (tmp) {
        result = tmp;
        break;
      }
    }
  } else if (hasContent) {
    for (let i = 0; i < node.contents.length; i++) {
      const tmp = RecursiveSearch(id, node.contents[i], node);
      if (tmp) {
        result = tmp;
        break;
      }
    }
  }

  return result;
};

const HelpPageBuilder = ({ config }) => {
  const [currentTopics, setCurrentTopics] = useState({
    node: config,
    level: HELP_LEVELS.ROOT,
    parent: null,
  });


  const handlePageClick = (node, parent) => () => {
    const level = node === config ? HELP_LEVELS.ROOT
      : node.contents ? HELP_LEVELS.CONTENT : HELP_LEVELS.SUB_TOPIC;
    switch (level) {
      case HELP_LEVELS.SUB_TOPIC:
        setCurrentTopics({ node, level: HELP_LEVELS.SUB_TOPIC, parent });
        break;
      case HELP_LEVELS.CONTENT:
        setCurrentTopics({ node, level: HELP_LEVELS.CONTENT, parent });
        break;
      default:
        setCurrentTopics({ node, level: HELP_LEVELS.ROOT, parent: null });
    }
  };

  const { level, node, parent } = currentTopics;

  const handleRelatedLink = relatedTopic => () => {
    const [node, parent] = RecursiveSearch(relatedTopic.id, config);
    setCurrentTopics({ node, level: HELP_LEVELS.CONTENT, parent });
    window.scrollTo(0, 0);
  };

  return (
    <HelpPageContainer>
      <Box vertical>
        <BreadCrumbs config={config} currentPage={currentTopics} handleNavigate={handlePageClick} />
        { level === HELP_LEVELS.ROOT && (
          <React.Fragment>
            <Text isTitle size="large">{config.title}</Text>
            <Text>{config.description}</Text>
            <Box type="secondary">
              {node && node.topics.map(topic => (
                <StyledCard key={topic.title} hoverEffect onClick={handlePageClick(topic, config)}>
                  <Box type="flat" horizontal justify="space-between" p="2px 10px 6px 10px">
                    <Box horizontal align="center">
                      { topic.icon }
                      <Text>{topic.title}</Text>
                    </Box>
                    <Box horizontal>
                      <StyledArrowRightCircle />
                    </Box>
                  </Box>
                </StyledCard>
              ))}
            </Box>
          </React.Fragment>
        )}

        { level === HELP_LEVELS.SUB_TOPIC && (
        <React.Fragment>
          <Text isTitle>{node.title}</Text>
          <StyledSubTopicContainer>
            {node && node.topics.map(subTopic => (
              <StyledSubTopic
                key={subTopic.title}
                hoverEffect
                onClick={handlePageClick(subTopic, node)}
              >
                <Box type="primary" horizontal align="center">
                  <Box type="flat">
                    { subTopic.icon }
                  </Box>
                  <Box vertical>
                    <Text isTitle type="primary" size="small">{subTopic.title}</Text>
                    <Text type="primary">{subTopic.description}</Text>
                  </Box>
                  <Box horizontal type="flat">
                    <StyledArrowRightCircle />
                  </Box>
                </Box>
              </StyledSubTopic>
            ))}
          </StyledSubTopicContainer>
          <Box horizontal justify="flex-end" type="flat">
            <Button onClick={handlePageClick(parent)}>Back</Button>
          </Box>
        </React.Fragment>
        )}

        { level === HELP_LEVELS.CONTENT && (
        <React.Fragment>
          <Box vertical type="secondary">
            <Text isTitle>{node.title}</Text>
            {node && node.contents.map(content => (
              <React.Fragment>
                <Text isTitle type="primary">{content.title}</Text>
                <Text type="secondary">{content.description}</Text>
                {content.imageUrl && (<img width={500} alt="image" src={content.imageUrl} />)}
              </React.Fragment>
            ))}
            <Box horizontal>
              <Separator />
            </Box>
            {node.relatedContent && node.relatedContent.length && (<Text isTitle type="primary">Related Subjects</Text>)}
            <Box vertical type="secondary">
              { node.relatedContent && node.relatedContent.map(elem => (
                <React.Fragment>
                  <HelperLink onClick={handleRelatedLink(elem)}>{elem.title}</HelperLink>
                </React.Fragment>
              ))}
            </Box>
            <Box horizontal justify="flex-end" type="flat">
              <Button onClick={handlePageClick(parent, config)}>Back</Button>
            </Box>
          </Box>
        </React.Fragment>
        )}
      </Box>
    </HelpPageContainer>
  );
};

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

export default withTheme(HelpPageBuilder);
