import React from 'react';
import { shallow } from 'enzyme';
import TableItem from '../../../src/components/table/table-item';

const wrapper = shallow(
  <TableItem>
    <p>Child</p>
  </TableItem>,
);

describe('TableItem', () => {
  it('Should render a td with children ', () => {
    expect(wrapper.find('td').exists()).toBeTruthy();
    expect(wrapper.find('p').text()).toEqual('Child');
  });
});
