import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import Box from './index';
import Text from '../../misc/text';
import { StoryWrapper } from '../../misc/wrappers';
import Info from './info.md';

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

export const ComplexExample = () => (
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

const ShowCaseCard = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  border: ${({ theme }) => `1px solid ${theme.colors.grey_050}`};
  background-color: ${({ theme }) => theme.colors.grey_100};
`;

// storiesOf('Layout', module)
//   .add('Box', () => (
//     <StoryWrapper p={15}>
//       <Text isTitle>Box</Text>
//       <Box p={15}>
//         <Box vertical>
//           <Text>
//             The <strong>Box</strong> component is meant to be your primary
//             tool while layouting UI elements.
//             You can achieve pretty much any design using it, its an abstraction of flexbox model.
//           </Text>
//           <ul>
//             <Text><li>It has 3 modes to choose from</li></Text>
//             <Text><li>Its composable, meant to aggregate and strucuture view components</li></Text>
//             <Text><li>Its extensible, since its a styled component, you can extend its behaviour</li></Text>
//           </ul>
//         </Box>
//       </Box>
//       <Box type="primary" vertical>
//         <ComplexExample />
//       </Box>
//       <Box>
//         <Text isTitle>Box modes</Text>
//         <Text>
//           You can either add a boolean property called
//           <strong> horizontal</strong> or <strong> vertical </strong>
//           to the <strong>Box</strong> component
//         </Text>
//         <ul>
//           <Text>
//             <li>
//               <strong>horizontal: </strong>
//               all childs will be laid horizontally like flex: row
//             </li>
//           </Text>
//           <Text>
//             <li>
//               <strong>vertical: </strong>
//               all childs will be laid vertically like flex: column
//             </li>
//           </Text>
//         </ul>
//       </Box>
//       <Box>
//         <Text isTitle type="secondary" size="small">
//             Box Horizontal
//         </Text>
//         <ShowCaseCard>
//           <Box horizontal type="secondary">
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//           </Box>
//         </ShowCaseCard>
//       </Box>
//       <Box>
//         <Text isTitle type="secondary" size="small">
//             Box Vertical
//         </Text>
//         <ShowCaseCard style={{ width: '100px' }}>
//           <Box vertical>
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//             <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//           </Box>
//         </ShowCaseCard>
//       </Box>
//       <Box type="primary" vertical>
//         <Box space={10} style={{ height: '300px' }}>
//           <Text isTitle>Box Align</Text>
//           <ul>
//             <Text><li>You can use the align property to <strong>vertically</strong> align components</li></Text>
//           </ul>
//           <Box horizontal justify="space-between" style={{ height: '100%' }}>
//             <ShowCaseCard align="center" justify="flex-start">
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//             </ShowCaseCard>
//             <ShowCaseCard align="center" justify="center">
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//             </ShowCaseCard>
//             <ShowCaseCard align="center" justify="flex-end">
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//             </ShowCaseCard>
//           </Box>
//         </Box>
//         <Box type="primary" horizontal>
//           <Box style={{ height: '450px', width: '-webkit-fill-available' }}>
//             <Text isTitle>Box Justify</Text>
//             <ul>
//               <Text><li>You can use the justify property to <strong>horizontally</strong> align components</li></Text>
//             </ul>
//             <Box vertical>
//               <ShowCaseCard align="flex-start">
//                 <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//               </ShowCaseCard>
//               <ShowCaseCard align="center">
//                 <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//               </ShowCaseCard>
//               <ShowCaseCard align="flex-end">
//                 <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" />
//               </ShowCaseCard>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       <Box vertical>
//         <Box space={10}>
//           <Text isTitle>Box Types</Text>
//           <Text>The <strong>Box</strong> Component, has 3 layout types. those being:</Text>
//           <ul>
//             <Text>
//               <li>
//                 <strong>Primary: </strong>
//                 Which adds 24px of padding to its children, either padding left, or top,
//                 depending if the component is set to horizontal or vertical, respectively.
//               </li>
//             </Text>
//             <Text>
//               <li>
//                 <strong>Secondary: </strong>
//                 Which adds 10px of padding to its children, either padding left, or top,
//                 depending if the component is set to horizontal or vertical, respectively.
//               </li>
//             </Text>
//             <Text>
//               <li>
//                 <strong>Flat: </strong>
//                 Does not add any padding to its inner children.
//               </li>
//             </Text>
//           </ul>
//         </Box>
//         <Box>
//           <Text isTitle type="secondary" size="small">
//             Box type primary
//           </Text>
//           <ShowCaseCard>
//             <Box horizontal>
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//             </Box>
//           </ShowCaseCard>
//         </Box>
//         <Box>
//           <Text isTitle type="secondary" size="small">
//             Box type Secondary
//           </Text>
//           <ShowCaseCard>
//             <Box horizontal type="secondary">
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//             </Box>
//           </ShowCaseCard>
//         </Box>
//         <Box>
//           <Text isTitle type="secondary" size="small">
//             Box type Flat
//           </Text>
//           <ShowCaseCard>
//             <Box horizontal type="flat">
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//               <img src="https://i.imgur.com/PAotv9Sg.jpg" width="120" height="90" />
//             </Box>
//           </ShowCaseCard>
//         </Box>
//       </Box>
//     </StoryWrapper>
//   ), {
//     notes: { markdown: Info },
//   });



export default {
  title: 'Box',
  component: Box,
};


// export const Emoji = () => (
//   <Button onClick={action('clicked')}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
