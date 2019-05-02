import React from 'react';
import { shallow } from 'enzyme';
import TableHeader from '../../../src/components/table/table-header';

let wrapper;
const mockHeader = ['Header 1', 'Header 2'];
const color = 'default';
const align = 'left';

describe('TableHeader', () => {
  beforeEach(() => {
    wrapper = shallow(
      <TableHeader
        header={mockHeader}
        color={color}
        align={align}
      >
        <div>Child</div>
      </TableHeader>,
    );
  });

  it('Should render a thead with the headers wrapped in a tr when header is present', () => {
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('th')).toHaveLength(2);
  });

  it('Should render a Component with the headers wrapped in a tr when header has function', () => {
    wrapper.setProps({ header: [() => <p />] });
    expect(wrapper.find('tr').exists()).toBeTruthy();
    expect(wrapper.find('p')).toHaveLength(1);
  });


  it('Should render children without tr when header is not present', () => {
    wrapper.setProps({ header: undefined });
    expect(wrapper.find('tr').exists()).toBeFalsy();
    expect(wrapper.find('div').text()).toEqual('Child');
  });

  it('Should render default className when color set to "default"', () => {
    expect(wrapper.find('.table-group.table-group--default')).toBeTruthy();
  });
});
