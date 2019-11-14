import styled, { keyframes } from 'styled-components';
import { THEME_TYPES } from '../../../styles/colors';

export const getBackgroundColor = ({ theme, colorObject }) => {
  if (!colorObject) {
    return (theme.mode === THEME_TYPES.DARK ? '#676a70' : '#c0c1c3');
  }
  return colorObject.background;
};
export const getTileColor = ({ theme, colorObject }) => {
  if (!colorObject) {
    return (theme.mode === THEME_TYPES.DARK ? '#e3e5e8' : '#2F3237');
  }
  return colorObject.tile;
};


export const SPINNER_SIZES = {
  SMALL: 'small',
  REGULAR: 'regular',
  LARGE: 'large',
};

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const spinnerSize = ({ size }) => {
  switch (size) {
    case SPINNER_SIZES.SMALL:
      return '16px';
    case SPINNER_SIZES.LARGE:
      return '64px';
    default:
      return '32px';
  }
};

export const borderWidth = ({ size }) => {
  switch (size) {
    case SPINNER_SIZES.SMALL:
      return '3px';
    case SPINNER_SIZES.LARGE:
      return '8px';
    default:
      return '6px';
  }
};

export const InnerRing = styled.div`
  display: inline-block;
  width: ${spinnerSize};
  height: ${spinnerSize};
  border-radius: 50%;
  border: ${borderWidth} solid ${props => getBackgroundColor(props)};
  border-color: ${props => getBackgroundColor(props)};
  overflow: visible;

  &:after {
    content: " ";
    display: block;
    width: ${spinnerSize};
    height: ${spinnerSize};
    margin: -${borderWidth};
    border-radius: 50%;
    border: ${borderWidth} solid ${props => getTileColor(props)};
    border-color: ${props => getTileColor(props)} transparent transparent transparent;
    animation: ${spin} 0.7s linear infinite;
  }
`;
// src={color === 'white' ? WhiteLoaderPNG : LoaderPNG}
export const SpinnerIcon = styled.div`
  background: ${({ color }) => (color && color === 'white'
    ? 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH3SURBVHgBpZS9SxxhEMZnN3dJVGJCkATyQUiRD9KYLultLMTeWssD/xMRO8FSBStBES0EUQsRwUJFK7Gw8gNRzw+801t/jzfrrngndzjw29m7nXlm3nf23cAqWBRFr3B/4Bt8ghZ4AQeQh80gCFYq5QYVxL7j2qAJspBxn76XP4UZhJeqCiL2D9fq3SjpZcpnU79jUTGF6MQjQcQk9DcVWIJ12CLhxGO0/M/QAR89TsVniRm5F/Rl/veHYgeWCbqyCkZ8A64T2l00hH7ta+gxv+HG2eDBQjWxuy6C4BLGuF1KbU+OQo0hl6/80FSLoKWtWe027HkSbIY2dfjB/xTrVC7WqkbsBW7akregVYKa3LVzbPXbnCVT/6FLg3eninmr08jZY9skqAF/ycRizzStMtKNlnxu5eUW/cjVZeT8tGQPdySY9y4L8N7qt18pwX0JHlsylHdUDGtVIvYNLmfJUBaVfARX3qWOW4vVbr1W/iJJbI8BTYZcdDp2rXxK1GUjld9C8ERnzdDHbbclJ2XQ/EajPyNAnTa5sF4lnaIzFeF55ELqpgt6PFYNqHAfMeP3gi56SELBA0se+NrK04+HVvCtuXavLRsidyDWyaSXwoNTT5ZQ5MKRY14kRm9HjpyZBxpWfZ+y3kHJt0GFtmEV5mE0/k6m7RbtXrVSgabvEQAAAABJRU5ErkJggg==\') no-repeat center'
    : 'url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+MLDBc3GYwH8CQAAAH5SURBVCjPdZE9SJVhGIav9/3e7+eo52gUlOWSRWLYFtHP0OgQOYatQT9bg0ujmzi1iy5BTSXUUkEUORiFVENIDeUQ9jNIx4zzfd/797R4QATv6eHmvob7fhQ7tPBZmjjOVZ7DLjDkI7kL/LPCxzYs3T2vym5WdY97qzImwpkQ6as8uRVy68nrSG4DuQ/4KDyavaiWATTAwy8yXBhOZ5pEK4JOCIlC0ICgRUgiNJ1w/fZLGQdQKyuSrre4HBSNGDE2Yrc8726eUl+n16TgJ0OV5VolDMZIFoSqY7mjnn6TESInRZO4gK1rnl0ZU3Zn9xtPpCftYcYLg1EwMfJaG8VgbrAJ1CqyvBsCmJtQHRd4YD2FDWQOjuueFF0Yqjyhap6gzR6aG1dv60DDeQrrGDV5hhVBtEKdVcrvBU4sSLMMFNuLik4j7UaCbfXS2RBp7QWW/YzUjoYL5FbY0EnGX6Op00C9tcn+6WnRu6ELj6VpI7PV9k+t57le/cEvCVSFoY5CvDXFgVciRkQUwOi8XKo2eWE9wz6Su0iVp9xXAGt/ZAAYMDnOBOyhPiqgPDZPmSWUeUKVJVijcalmamlSLRqAo/tUe13EtqA3gP8N8SCICIigg5B4oaOE2TeTahHAdHscUaojIiWQ9W97EVSATwm8d4aZD1fV927+P5RoAlvr6LKPAAAAAElFTkSuQmCC\') no-repeat center')
}; 
  animation: ${spin} 0.7s linear infinite;
  height: ${props => spinnerSize(props)};
  width: ${props => spinnerSize(props)};
  background-size: cover;
  transform: ${({ size }) => (
    size === SPINNER_SIZES.SMALL
      ? 'scale(1)'
      : size === SPINNER_SIZES.REGULAR
        ? 'scale(2)' : 'scale(4)'
  )}
`;
