import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowRightCircle } from 'styled-icons/feather';
import styled, { withTheme } from 'styled-components';
import Text from '../text';
import Box from '../box';
import Card from '../card';
import Button from '../button';

const BreadCrumbs = ({ config, currentPage }) => (
  <Box>
    <Text>Place / holder</Text>
  </Box>
);
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

const HelpPageBuilder = ({ config, theme }) => {
  const [currentTopics, setCurrentTopics] = useState({
    node: config,
    level: HELP_LEVELS.ROOT,
    parent: null,
  });

  const handlePageClick = (node, parent) => () => {
    const level = node.icon && node.contents
      ? HELP_LEVELS.CONTENT
      : node.icon && node.topics
        ? HELP_LEVELS.SUB_TOPIC
        : HELP_LEVELS.ROOT;
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

  console.log(level, node, parent);
  return (
    <HelpPageContainer>
      <Box vertical>
        <BreadCrumbs />
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
              <StyledSubTopic key={subTopic.title} hoverEffect onClick={handlePageClick(subTopic, node)}>
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
                <Text isTitle>{content.title}</Text>
                <Text>{content.description}</Text>
                <img width={500} src={content.imageUrl} />
              </React.Fragment>
            ))}
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
  config: PropTypes.object,
};
HelpPageBuilder.defaultProps = {
  config: null,
};

export default withTheme(HelpPageBuilder);
