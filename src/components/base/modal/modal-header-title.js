import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../text';

export default function ModalHeaderTitle(props) {
  const { modalTitle } = props;

  const titleStyle = {
    marginTop: '3px',
    fontSize: '18px',
  };

  return (
    <ModalTitleBase>
      <Text isTitle small style={titleStyle}>{modalTitle}</Text>
    </ModalTitleBase>
  );
}

ModalHeaderTitle.propTypes = {
  modalTitle: PropTypes.string,
};

const ModalTitleBase = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
