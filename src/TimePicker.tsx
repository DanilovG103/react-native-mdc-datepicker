import React, { useEffect } from 'react';
import type { TimePickerProps } from './types';
import { MDCTimePicker } from './timepickermodule';

const TimePicker = ({
  visible,
  onSelect,
  onDismiss,
  setVisible,
  ...timePickerOptions
}: TimePickerProps) => {
  useEffect(() => {
    if (!visible) return;

    MDCTimePicker.present(timePickerOptions)
      .then(onSelect)
      .catch(onDismiss)
      .finally(() => setVisible(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return <></>;
};

export default TimePicker;
