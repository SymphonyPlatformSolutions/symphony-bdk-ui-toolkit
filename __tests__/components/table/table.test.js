import React from 'react';
import { shallow } from 'enzyme';
import Table from '../../../src/components/table/table';

let customClassName;

const wrapper = shallow(
  <Table
    className={customClassName}
    emptyMessage="Empty"
    LoadingComponent={() => <p>Loading</p>}
  >
    <div>Header</div>
    <div />
    <div>Footer</div>
  </Table>,
);

describe('Table', () => {
  it('Should render the LoadingComponent in case of loading', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find('LoadingComponent').dive().text()).toEqual('Loading');
    wrapper.setProps({ isLoading: false });
  });

  it('Should render the Empty message when body is empty', () => {
    expect(wrapper.find('span').text()).toEqual('Empty');
  });

  it('Should render custom className when passed by props', () => {
    wrapper.setProps({ className: 'my-custom-class' });
  });

  it('Should render the children wrapper in a tbody if not loading, nor empty', () => {
    wrapper.setProps({
      children: [
        'Header', 'Body', 'Footer',
      ],
    });
    expect(wrapper.find('tbody').exists()).toBeTruthy();
    expect(wrapper.find('tbody').text()).toEqual('Body');
  });
});
