import styled, { css } from 'styled-components';
import { colorPrimary, colorWhite } from '../../colors/colors';

const primaryStyle = css`
  background-color: ${colorWhite};
  color: ${colorPrimary};
`;

const styles = props => '';

const StyledButton = styled.button`
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 4px;
  min-width: 3rem;
  min-height: 1.4rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  width: ${props => (props.fill ? '100%' : '')}

  /* Button Outline Primary */
  /* ${console.log(primaryStyle)} */
  ${props => props.color === 'primary' && primaryStyle}
`;

export { StyledButton };
