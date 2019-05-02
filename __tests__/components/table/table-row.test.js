import React from 'react';
import { shallow } from 'enzyme';
import TableRow from '../../../src/components/table/table-row';

const wrapper = shallow(
  <TableRow>
    <p>Child</p>
  </TableRow>,
);

describe('TableRow', () => {
  it('Should render a tr with children ', () => {
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('p').text()).toEqual('Child');
  });
});
