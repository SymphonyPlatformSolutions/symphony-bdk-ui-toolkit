import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../base/text';
import Box from '../../base/box';
import Button from '../../base/button';
import Separator from '../../base/separator';
import {
  HelpPageContainer,
  HelperLink,
  StyledArrowRightCircle,
  StyledCard,
  StyledSubTopic,
  StyledSubTopicContainer,
} from './theme';

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
        <React.Fragment key={index}>
          { !item.link && <Text>{item.label}</Text> }
          {item.link && (<HelperLink onClick={handleNavigate(item.node)}>{item.label}</HelperLink>)}
          { breadCrumbsMap.length !== (index + 1) && <Text px="5px"> > </Text> }
        </React.Fragment>
      ))}
    </Box>
  );
};

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

  const handleRelatedLink = id => () => {
    const [node, parent] = RecursiveSearch(id, config);
    setCurrentTopics({ node, level: HELP_LEVELS.CONTENT, parent });
    window.scrollTo(0, 0);
  };

  const renderContent = (description) => {
    if (typeof description === 'string') {
      return (
        <Text type="secondary">{description}</Text>
      );
    } if (typeof description === 'function') {
      return description(id => handleRelatedLink(id));
    }
  };

  return (
    <HelpPageContainer>
      <Box vertical>
        <BreadCrumbs config={config} currentPage={currentTopics} handleNavigate={handlePageClick} />
        { level === HELP_LEVELS.ROOT && (
          <React.Fragment>
            <Text isTitle type="primary">{config.title}</Text>
            <Text type="primary">{config.description}</Text>
            <Box type="secondary">
              {node && node.topics.map(topic => (
                <StyledCard key={topic.title} onClick={handlePageClick(topic, config)}>
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
          <Text isTitle type="primary">{node.title}</Text>
          <StyledSubTopicContainer>
            {node && node.topics.map(subTopic => (
              <StyledSubTopic
                key={subTopic.title}
                onClick={handlePageClick(subTopic, node)}
              >
                <Box type="primary" horizontal align="center" style={{ height: '128px' }}>
                  <Box type="flat" style={{ height: '128px' }}>
                    { subTopic.icon }
                  </Box>
                  <Box vertical style={{ height: '128px' }}>
                    <Text isTitle type="primary" size="small">{subTopic.title}</Text>
                    <Text type="secondary">{subTopic.description}</Text>
                  </Box>
                  <Box horizontal type="flat" style={{ height: '128px' }}>
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
            {node && node.contents.map((content, index) => (
              <React.Fragment key={index}>
                <Text isTitle type="primary">{content.title}</Text>
                { renderContent(content.description) }
                {content.imageUrl && (<img width={500} alt="image" src={content.imageUrl} />)}
              </React.Fragment>
            ))}
            <Box horizontal>
              <Separator />
            </Box>
            {node.relatedContent && node.relatedContent.length && (<Text isTitle type="primary">Related Subjects</Text>)}
            <Box vertical type="secondary">
              { node.relatedContent && node.relatedContent.map((elem, index) => (
                <React.Fragment key={index}>
                  <HelperLink onClick={handleRelatedLink(elem.id)}>{elem.title}</HelperLink>
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

export default HelpPageBuilder;
