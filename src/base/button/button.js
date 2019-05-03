import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles/colors';

const baseButtonstyles = {
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: '4px',
  border: `1px solid ${colors.primary}`,
  backgroundColor: `${colors.primary}`,
  minWidth: '3rem',
  minHeight: '1.4rem',
  padding: '0.4rem 1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in',
  width: `${props => (props.fill ? '100%' : '')}`,
};

const executePress = (e) => {
  const { onClick } = this.props;
  e.stopPropagation();
  onClick();
};

const Button = (props) => {
  const { children, onClick } = props;

  return (
    <button
      type="button"
      style={baseButtonstyles}
      onClick={onClick ? executePress : null}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
