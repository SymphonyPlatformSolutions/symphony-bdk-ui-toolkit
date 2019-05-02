import React from 'react';
import { shallow } from 'enzyme';
import TableFooter from '../../../src/components/table/table-footer';

const mockColor = 'my color';
const wrapperOneChild = shallow(
  <TableFooter
    cols={3}
    color={mockColor}
  >
    <div>Single Div</div>
  </TableFooter>,
);

const wrapperTwoChildren = shallow(
  <TableFooter
    cols={3}
    color={mockColor}
  >
    <div>Div 1</div>
    <div>Div 2</div>
  </TableFooter>,
);

describe('TableFooter', () => {
  it('Should render a "tfoot" with the child wrapped in a td if only one Child', () => {
    expect(wrapperOneChild.find('tr').exists()).toBeTruthy();
    expect(wrapperOneChild.find('div').text()).toEqual('Single Div');
  });

  it('Should render a "tfoot" with the children, without td', () => {
    expect(wrapperTwoChildren.find('tr').exists()).toBeFalsy();
    expect(wrapperTwoChildren.find('div')).toHaveLength(2);
  });
});
