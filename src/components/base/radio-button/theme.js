import styled from 'styled-components';

export const RadioLabel = styled.label`
  position: relative;
  padding-left: 1.4rem;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  line-height: 0.9rem;
  display: inline-block;
`;

export const Radio = styled.input`
  visibility: hidden;
  position: absolute;
  left: ${({ checked }) => (checked ? '-4px' : '-3px')};
  top: -4px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  &:disabled {
    cursor: default; 
  }

  &:checked:before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.primary_500};
    border-radius: 100%;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  } 
  ${RadioLabel}:hover &:checked:before {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border: ${({ theme, disabled }) => (disabled ? undefined : `2px solid ${theme.colors.primary_700}`)};
  }

  &:focus:checked::before {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border: ${({ theme, disabled }) => (disabled ? undefined : `2px solid ${theme.colors.primary_700}`)};
  }

  &:not(:checked):before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 20px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.colors.grey_400};
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border-radius: 100%;
  }
  ${RadioLabel}:hover &:not(:checked):before {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border: ${({ theme, disabled }) => (disabled ? undefined : `1px solid ${theme.colors.grey_600}`)};
  }

  &:focus:not(:checked)::before {
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    border: ${({ theme, disabled }) => (disabled ? undefined : `1px solid ${theme.colors.grey_600}`)};
  }

  &:checked:after,
  &:not(:checked):after {
    visibility: visible;
    content: '';
    left: 1px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: ${({ theme }) => theme.colors.primary_500};
    position: absolute;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  ${RadioLabel}:hover &:checked:after,
  &:not(:checked):after {
    transition: all 0.2s ease;
    background: ${({ theme, disabled }) => (disabled ? undefined : theme.colors.primary_700)};
  }

  &:focus:checked::after,
  &:focus:not(:checked)::after {
    transition: all 0.2s ease;
    background: ${({ theme, disabled }) => (disabled ? undefined : theme.colors.primary_700)};
  }

  &:not(:checked):after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  &:checked:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const RadioContainer = styled.div`
  margin: 9px 0;
  opacity: ${({ disabled }) => (disabled ? '0.25' : '1')};
  align-items: center;
    display: flex;
`;
