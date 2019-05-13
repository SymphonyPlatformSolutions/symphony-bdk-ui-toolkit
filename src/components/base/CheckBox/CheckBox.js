import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../styles/colors';


const CheckBox = (props) => {
  const {
    children, disabled, isChecked, onChange,
  } = props;

  return (

    <CheckBoxLabel>
      <CheckBoxInput checked={isChecked} disabled={disabled} onChange={onChange} />
      <BaseCheckBox isChecked={isChecked}>
        <Checkmark isChecked={isChecked} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Checkmark>
      </BaseCheckBox>
      {children}
    </CheckBoxLabel>
  );
};

CheckBox.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  disabled: false,
  isChecked: false,
};

export default CheckBox;

const CheckBoxLabel = styled.label.attrs({
  key: `label_${props => props.children}`,
  htmlFor: `checkbox-${props => props.children}`,
})`
  display: flex;
  vertical-align: middle;
  line-height: 1.3rem;
  position: relative;
  user-select: none;
  cursor: pointer;
  width: fit-content;
`;

const Checkmark = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  opacity: ${props => (props.isChecked ? 1 : 0)}
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

const CheckBoxInput = styled.input.attrs({
  disabled: props => (!!props.disabled),
  key: `checkbox_${props => props.children}`,
  id: `checkbox-${props => props.children}`,
  type: 'checkbox',
})`
  position: absolute;
  opacity: 0;
`;

const BaseCheckBox = styled.div`
  align-self:center;
  width: 1rem;
  height: 1rem;
  margin-right: .5rem;
  background: ${props => (props.isChecked ? colors.system : colors.white)}
  border: 1px solid ${props => (props.isChecked ? colors.system : colors.grey)};
  border-radius: 4px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;
