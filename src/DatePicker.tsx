import React, { useEffect } from 'react';
import type { DatePickerProps } from './types';
import { MDCDatePicker } from './datepickermodule';

const DatePicker = ({ visible, setVisible, ...props }: DatePickerProps) => {
  useEffect(() => {
    if (!visible) return;

    if (props.mode === 'default' || !props.mode) {
      const { onSelect, onDismiss, ...defaultProps } = props;

      MDCDatePicker.present(defaultProps)
        .then(onSelect)
        .catch(onDismiss)
        .finally(() => setVisible(false));
      return;
    }

    if (props.mode === 'range') {
      const { onSelect, onDismiss, ...rangeProps } = props;
      MDCDatePicker.presentRange(rangeProps)
        .then(onSelect)
        .catch(onDismiss)
        .finally(() => setVisible(false));
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  return <></>;
};

export default DatePicker;
