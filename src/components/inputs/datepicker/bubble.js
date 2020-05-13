import React, {
  useState, useRef, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import { CalendarBubble } from './theme';

const PortalBubble = (props) => {
  const {
    triggerClose,
    activeMonths,
    goToNextMonths,
    goToPreviousMonths,
    firstDayOfWeek,
    isRange,
    value,
    strategy,
    relatedWidth,
    customWeekdayLabels,
  } = props;
  const isUp = strategy && strategy.includes('ABOVE');
  const bubbleRef = useRef();
  const [initialHeight, setInitialHeight] = useState(0);
  const [currHeight, setCurrHeight] = useState(0);
  useLayoutEffect(() => {
    if (!initialHeight) {
      setInitialHeight(bubbleRef.current.getBoundingClientRect().height);
    }
    setCurrHeight(bubbleRef.current.getBoundingClientRect().height);
  }, [activeMonths]);

  return (
    <CalendarBubble
      ref={bubbleRef}
      relatedShift={relatedWidth / 2}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      size={activeMonths.length}
      out={triggerClose}
      isUp={isUp}
      heightDelta={initialHeight ? initialHeight - currHeight : 0}
    >
      {activeMonths.map((month, index) => (
        <Month
          goToNextMonths={
            index === activeMonths.length - 1 ? goToNextMonths : null
          }
          customWeekdayLabels={customWeekdayLabels}
          goToPreviousMonths={index === 0 ? goToPreviousMonths : null}
          key={`${month.year}-${month.month}`}
          year={month.year}
          month={month.month}
          singleDay={isRange ? null : value}
          firstDayOfWeek={firstDayOfWeek}
        />
      ))}
    </CalendarBubble>
  );
};

PortalBubble.propTypes = {
  value: PropTypes.object,
  isRange: PropTypes.bool,
  firstDayOfWeek: PropTypes.number,
  customWeekdayLabels: PropTypes.arrayOf(PropTypes.string),
  activeMonths: PropTypes.array.isRequired,
  triggerClose: PropTypes.bool,
  goToNextMonths: PropTypes.func.isRequired,
  goToPreviousMonths: PropTypes.func.isRequired,
  relatedWidth: PropTypes.number,
  strategy: PropTypes.string,
};
PortalBubble.defaultProps = {
  value: null,
  isRange: false,
  firstDayOfWeek: 0,
  customWeekdayLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  relatedWidth: 0,
  strategy: '',
  triggerClose: false,
};

export default PortalBubble;
