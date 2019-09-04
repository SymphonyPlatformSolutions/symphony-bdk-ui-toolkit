import styled from 'styled-components';

export const Radio = styled.input`
  visibility: hidden;
  position: absolute;
  left: -1px;
  top: -2px;

  &:disabled {
    cursor: default; 
  }

  &:checked:before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 14px;
    height: 14px;
    border: 2px solid ${({ theme }) => theme.theme.primary};
    border-radius: 100%;
    background: 'white';
  } 

  &:disabled:checked:before {
    border: 2px solid #9197a1;
  }

  &:not(:checked):before {
    visibility: visible;
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 0.9rem;
    height: 0.9rem;
    border: 2px solid #dce1ea;
    border-radius: 100%;
  }

  &:checked:after,
  &:not(:checked):after {
    visibility: visible;
    content: '';
    left: 1px;
    top: 1px;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.theme.primary};
    position: absolute;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }

  &:disabled:checked:after,
  &:disabled:not(:checked):after {
    background: #9197a1;
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

export const RadioLabel = styled.label`
  position: relative;
  padding-left: 1.4rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  line-height: 0.9rem;
  display: inline-block;
`;

export const RadioContainer = styled.div`
  margin: 0.5rem 0;
`;
