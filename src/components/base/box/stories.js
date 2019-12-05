import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import Box from '.';
import Text from '../text';
import { StoryWrapper } from '../wrappers';
import Info from './info.md';

const boxStyle = {
  width: '80px',
  height: '80px',
};

const ShowCaseCard = styled(Box)`
  padding: 10px;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_050}`};
  background-color: ${({ theme }) => theme.colors.grey_100};
`;

const boxCTA = {
  background: '#006CAF',
  color: '#fff',
};
const boxCaution = {
  background: '#D50935',
  color: '#fff',
};
const boxSystem = {
  background: '#006CAF',
  color: '#fff',
};

storiesOf('Base', module)
  .add('Box', () => (
    <StoryWrapper p={15}>
      <Box type="primary" horizontal>
        <Box space={10} style={{ width: '40%' }}>
          <Text isTitle>Box Align</Text>
          <Box horizontal justify="space-between" style={{ height: '100%' }}>
            <ShowCaseCard align="center" justify="flex-start">
              <Box>
                <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                  <span>flex-start</span>
                </Box>
              </Box>
            </ShowCaseCard>
            <ShowCaseCard align="center" justify="center">
              <Box>
                <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                  <span>flex-center</span>
                </Box>
              </Box>
            </ShowCaseCard>
            <ShowCaseCard align="center" justify="flex-end">
              <Box>
                <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                  <span>flex-end</span>
                </Box>
              </Box>
            </ShowCaseCard>
          </Box>
        </Box>
        <Box space={10} style={{ width: '40%' }}>
          <Text isTitle>Box Justify</Text>
          <Box vertical justify="space-between" style={{ height: '100%' }}>
            <ShowCaseCard>
              <Box type="primary">
                <Box horizontal justify="flex-start" space={20}>
                  <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                    <span>flex-start</span>
                  </Box>
                </Box>
              </Box>
            </ShowCaseCard>
            <ShowCaseCard>
              <Box>
                <Box horizontal justify="center" space={20}>
                  <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                    <span>center</span>
                  </Box>
                </Box>
              </Box>
            </ShowCaseCard>
            <ShowCaseCard>
              <Box>
                <Box horizontal justify="flex-end" space={20}>
                  <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                    <span>flex-end</span>
                  </Box>
                </Box>
              </Box>
            </ShowCaseCard>
          </Box>
        </Box>
      </Box>
      <Box vertical>
        <Box space={10}>
          <Text isTitle>Box Primary Horizontal</Text>
          <ShowCaseCard>
            <Box horizontal>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Secondary Horizontal</Text>
          <ShowCaseCard>
            <Box horizontal type="secondary">
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Horizontal</Text>
          <ShowCaseCard>
            <Box horizontal type="flat">
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Primary Vertical</Text>
          <ShowCaseCard>
            <Box vertical>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Secondary Vertical</Text>
          <ShowCaseCard>
            <Box vertical type="secondary">
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Horizontal</Text>
          <ShowCaseCard>
            <Box horizontal type="flat">
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
        <Box space={10}>
          <Text isTitle>Box Flat Vertical</Text>
          <ShowCaseCard>
            <Box vertical type="flat">
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCTA)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxCaution)}>
                <span>HtmlElement</span>
              </Box>
              <Box align="center" justify="center" style={Object.assign({}, boxStyle, boxSystem)}>
                <span>HtmlElement</span>
              </Box>
            </Box>
          </ShowCaseCard>
        </Box>
      </Box>
    </StoryWrapper>
  ), {
    notes: { markdown: Info },
  });
