import React from 'react';
import { shallow } from 'enzyme';
import DeleteConfirmation from '../../../src/components/danger-action-confirmation/danger-action-confirmation';

let wrapper;
const dismissCallbackMock = jest.fn();
const confirmCallbackMock = jest.fn();

beforeEach(() => {
  wrapper = shallow(
    <DeleteConfirmation
      show
      entityName="Entity"
      dismissCallback={dismissCallbackMock}
      confirmCallback={confirmCallbackMock}
      message="Hello"
      confirmButtonText="Are you sure?"
    />,
  );
});

it('Should call the callback function when "cancel" button is clicked', () => {
  wrapper.find('Button').at(0).simulate('click');
  expect(dismissCallbackMock).toBeCalled();
});

it('Should call the callback function when "yes" button is clicked', () => {
  wrapper.find('Button').at(1).simulate('click');
  expect(confirmCallbackMock).toBeCalled();
});
