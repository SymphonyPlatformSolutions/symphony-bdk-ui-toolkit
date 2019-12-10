import React from 'react';
import styled from 'styled-components';
import { STORY_RENDERED } from '@storybook/core-events';
import { addons, types } from '@storybook/addons';
import * as Bla from '@storybook/api';

console.log(Bla)

const ADDON_ID = 'textsize';
const PARAM_KEY = 'textSize';
const PANEL_ID = `${ADDON_ID}/panel`;

const Panel = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
`;

const TextSizePanel = () => {
  // const value = useParameter(PARAM_KEY, null);

  return (<div>{'BRO!'}</div>);
}

addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => {
    console.log(active);
    console.log(key);
    return (
    <Panel active={active} key={key}>
      <TextSizePanel />
    </Panel>
  )};
  const title = 'Text Size';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
    paramKey: PARAM_KEY,
  });
});
