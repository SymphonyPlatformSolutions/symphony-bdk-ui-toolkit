import React from 'react';
import styled from 'styled-components';
import { STORY_RENDERED } from '@storybook/core-events';
import addons, { types } from '@storybook/addons';
import { AddonPanel } from '@storybook/components';
import {useParameter, useChannel, useAddonState} from '@storybook/api';

const ADDON_ID = 'textsize';
const PARAM_KEY = 'textSize';
const PANEL_ID = `${ADDON_ID}/panel`;
const TextButton = styled.button`
  padding: 15px 12px;
  outline: none;
  border-radius: 4px;
  margin: 6px;
  border: 1px solid gray;
  transition: all 0.2s;
  background-color: ${({chosen}) => chosen ? 'gray' : 'white'};
  color:  ${({chosen}) => chosen ? 'white' : 'black'};
  cursor: pointer;
  &:hover {
    background-color: ${({chosen}) => chosen ? undefined : 'lightgray'};
  }
`;

const TextSizePanel = ({channel}) => {
  const [size, setSize] = useAddonState(ADDON_ID, 'normal');
  const chooseSize = (newSize) => {
    channel.emit('selectSize', newSize);
    setSize(newSize);
  }
  return (
    <div>
      <TextButton chosen={size === 'xsmall'} onClick={() => chooseSize('xsmall')}>X-Small</TextButton>
      <TextButton chosen={size === 'small'} onClick={() => chooseSize('small')}>Small</TextButton>
      <TextButton chosen={size === 'normal'} onClick={() => chooseSize('normal')}>Normal</TextButton>
      <TextButton chosen={size === 'large'} onClick={() => chooseSize('large')}>Large</TextButton>
    </div>
    );
}

addons.register(ADDON_ID, api => {
  const channel = addons.getChannel();
  const render = ({ active, key }) => {
    return (
    <AddonPanel active={active} key={key}>
      <TextSizePanel channel={channel} />
    </AddonPanel>
  )};
  const title = 'Text Size';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
    paramKey: PARAM_KEY,
  });
});
