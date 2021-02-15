import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../../misc/text';
import Box from '../../layout/box';
import Tooltip from '../../misc/tooltip';

const FieldSet = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
`;

const StyledText = styled(Text)`
  margin: 0 0 3px 0;
  padding: none;
`;

export const LabelText = ({ children, ...rest }) => (<StyledText {...rest}>{children}</StyledText>);
LabelText.propTypes = {
  children: PropTypes.string.isRequired,
};

export const Label = ({
  children, tooltip = null, htmlFor = null, ...rest
}) => {
  if (typeof children === 'string') {
    if (tooltip) {
      return (
        <label htmlFor={htmlFor}>
          <Box horizontal space={5}>
            <LabelText {...rest}>{children}</LabelText>
            <Tooltip style={{ alignSelf: 'center', marginBottom: '5px' }}>{tooltip}</Tooltip>
          </Box>
        </label>
      );
    }
    return <label htmlFor={htmlFor}><LabelText {...rest}>{children}</LabelText></label>;
  }
  if (tooltip) {
    return (
      <label htmlFor={htmlFor}>
        <Box horizontal space={5}>
          {children}
          <Tooltip style={{ alignSelf: 'center', marginBottom: '5px' }}>{tooltip}</Tooltip>
        </Box>
      </label>
    );
  }

  return <label htmlFor={htmlFor} {...rest}>{children}</label>;
};
Label.propTypes = {
  children: PropTypes.any.isRequired,
  tooltip: PropTypes.string,
  htmlFor: PropTypes.string,
};

export const FormGroup = ({ children, disabled = false, ...rest }) => (
  <FieldSet disabled={disabled} {...rest}>
    {disabled ? children.map((child, i) => React.cloneElement(child, { disabled: true, key: i })) : children}
  </FieldSet>
);
FormGroup.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};

const FormBox = (props) => {
  const {
    children, 
    onSubmit = null,
    disabled = false,
    ...rest
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Box {...rest}>
        {disabled ? children.map((child, i) => React.cloneElement(child, { disabled: true, key: i })) : children}
      </Box>
    </form>
  );
};
FormBox.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FormBox;
