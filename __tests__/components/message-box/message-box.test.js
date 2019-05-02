import React from 'react';
import { shallow } from 'enzyme';
import MessageBox from '../../../src/components/message-box/message-box';

let wrapper;
const icon = 'my-icon';
const message = 'my-message';
const iconColor = 'default';
const messageColor = 'default';
const boxColor = 'default';

describe('A MessageBox Component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <MessageBox
        icon={icon}
        iconColor={iconColor}
        message={message}
        messageColor={messageColor}
        boxColor={boxColor}
      />,
    );
  });

  it('Should render the MessageBox without crashing', () => {
    shallow(<MessageBox
      icon={icon}
      iconColor={iconColor}
      message={message}
      messageColor={messageColor}
      boxColor={boxColor}
    />);
  });

  it('Should render the component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('A MessageBox Component with image as icon', () => {
  const iconImage = 'my-img';

  beforeEach(() => {
    wrapper = shallow(
      <MessageBox
        iconImage={iconImage}
        iconColor={iconColor}
        message={message}
        messageColor={messageColor}
        boxColor={boxColor}
      />,
    );
  });

  it('Should render the MessageBox without crashing', () => {
    shallow(<MessageBox
      icon={icon}
      iconColor={iconColor}
      message={message}
      messageColor={messageColor}
      boxColor={boxColor}
    />);
  });

  it('Should render the component snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
