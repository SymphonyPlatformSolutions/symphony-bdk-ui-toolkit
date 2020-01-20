import React from 'react';
import styled from 'styled-components';
import Box from '../index';
import Text from '../../../misc/text';

const ExampleViewport = styled(Box)`
  width: 1000px;
  height: 500px;
`;

const SideBar = styled(Box)`
  width: 200px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary_400};
`;

const ContentBox = styled(Box)`
  padding: 10px;
  width: -webkit-fill-available;
  background-color: ${({ theme }) => theme.colors.secondary_050};
`;

const ContentHeader = styled(Box)`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.secondary_200};
`;

const ContentBody = styled(Box)`
  padding: 10px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.secondary_200};
`;

const VerticalList = styled(Box)`
  height: 100%;
  width: -webkit-fill-available;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.oldprimary_100};
`;

const InnerVerticalList = styled(VerticalList)`
  height: auto;
  width: -webkit-fill-available;
  padding: 4px;
`;

const HorizontalList = styled(Box)`
  height: 100%;
  width: -webkit-fill-available;
  flex-wrap: wrap;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.oldprimary_100};
`;

const LeftListElement = styled(Box)`
  width: 100%;
  height: 100%;
  padding-top: 2px;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_500}`};
  background-color: ${({ theme }) => theme.colors.secondary_100};
`;

const RightListElement = styled(LeftListElement)`
  width: 100px;
  height: 100px;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_500}`};
`;

const RightCenterElement = styled(LeftListElement)`
  width: 100%;
  height: 30px;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;

const ElementText = styled(Text)`
  color: ${({ theme }) => theme.colors.oldprimary_900};
`;

export default () => (
  <ExampleViewport type="flat" horizontal>
    <SideBar vertical>
      <Box align="center">
        <Title isTitle>Sidebar</Title>
      </Box>
    </SideBar>
    <ContentBox type="secondary">
      <ContentHeader type="flat" align="center">
        <Title isTitle>Header</Title>
      </ContentHeader>
      <ContentBody vertical>
        <Box align="center">
          <Title isTitle>Body</Title>
        </Box>
        <Box horizontal>
          <VerticalList vertical>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
            <LeftListElement align="center">
              <ElementText>element</ElementText>
            </LeftListElement>
          </VerticalList>
          <HorizontalList type="flat" horizontal justify="space-around" align="center">
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
          </HorizontalList>
          <HorizontalList type="flat" horizontal justify="space-around" align="center">
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
            <RightListElement align="center" justify="center">
              <ElementText>element</ElementText>
            </RightListElement>
            <InnerVerticalList vertical>
              <RightCenterElement align="center" justify="center">
                <ElementText>element</ElementText>
              </RightCenterElement>
              <RightCenterElement align="center" justify="center">
                <ElementText>element</ElementText>
              </RightCenterElement>
              <RightCenterElement align="center" justify="center">
                <ElementText>element</ElementText>
              </RightCenterElement>
            </InnerVerticalList>
          </HorizontalList>
        </Box>
      </ContentBody>
      <ContentHeader type="flat" align="center">
        <Title isTitle>Footer</Title>
      </ContentHeader>
    </ContentBox>
  </ExampleViewport>
);
