import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Text from '../text';
import Box from '../box';
import Tooltip from '../tooltip';

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
  children, tooltip, htmlFor, ...rest
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
Label.defaultProps = {
  tooltip: null,
  htmlFor: null,
};

export const FormGroup = ({ children, disabled, ...rest }) => (
  <FieldSet disabled={disabled} {...rest}>
    {disabled ? children.map(child => React.cloneElement(child, { disabled: true })) : children}
  </FieldSet>
);
FormGroup.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};
FormGroup.defaultProps = {
  disabled: false,
};

const FormBox = (props) => {
  const {
    children, onSubmit, disabled, ...rest
  } = props;

  return (
    <form onSubmit={onSubmit}>
      <Box {...rest}>
        {disabled ? children.map(child => React.cloneElement(child, { disabled: true })) : children}
      </Box>
    </form>
  );
};
FormBox.propTypes = {
  children: PropTypes.any.isRequired,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};
FormBox.defaultProps = {
  onSubmit: null,
  disabled: false,
};

export default FormBox;
