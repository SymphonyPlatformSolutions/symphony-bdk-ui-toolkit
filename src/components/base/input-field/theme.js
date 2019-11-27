import styled from 'styled-components';
import Text from '../text';

const getInputColor = ({ theme, disabled }) => (disabled ? theme.colors.grey_400 : theme.colors.primary_500);

const INPUT_SIZES = {
  REGULAR: 'regular',
  LARGE: 'large',
};

export const FloatInput = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButtonText = styled.div`
  font-size: 0.875rem;
  padding-right: 7px;
  color: ${props => getInputColor(props)};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${p => (p.disabled ? 'none' : '')};
  z-index: 3;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`;

export const StyledInput = styled.input`
  padding: ${({ size }) => (size === INPUT_SIZES.LARGE ? '9px 12px 11px 18px' : '9px 5px 9px 7px')};
  border: 0;
  outline: none;
  font-size: ${({ size }) => (size === INPUT_SIZES.LARGE ? '16px' : '12px')};
  transition: all 0.3s;
  width: 100%;
  background-color: transparent;
  color: ${({ theme, disabled }) => (disabled ? theme.colors.grey_400 : theme.colors.grey_700)};
  resize: vertical;
  font-family: "SymphonyLato", "Lato", "Segoe UI", "Helvetica Neue", "Verdana",
    "Arial", sans-serif !important;
  z-index: 2;
  position: relative;
  cursor: ${p => (p.disabled ? 'not-allowed' : (p.readOnly ? 'default' : 'pointer'))};

  ::placeholder {
    color: ${({ theme }) => theme.colors.grey_300};
  }
`;

export const TextArea = StyledInput.withComponent('textarea');

export const InputLabel = styled(Text)`
  color: ${({ theme }) => theme.colors.grey_600};
  font-weight: bold;
`;

export const Container = styled.div`
  margin-top: 3px;
  background: ${({ theme, disabled }) => (disabled ? theme.colors.grey_050 : 'transparent')};
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error_500 : theme.colors.grey_300)};
  border-radius: 4px;
  transition: all 0.3s ease;
  &:focus-within {
    border: 1px solid ${({ theme, error }) => (error ? theme.colors.error_500 : theme.colors.oldprimary_400)};
  }
`;
