import React from 'react';
import { shallow } from 'enzyme';
import TableHeaderItem from '../../../src/components/table/table-header-item';

const wrapper = shallow(
  <TableHeaderItem>
    <p>Child</p>
  </TableHeaderItem>,
);

describe('TableHeaderItem', () => {
  it('Should render a th with children ', () => {
    expect(wrapper.find('th').exists()).toBeTruthy();
    expect(wrapper.find('p').text()).toEqual('Child');
  });
});
