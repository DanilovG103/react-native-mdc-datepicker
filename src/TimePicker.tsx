import React, { useEffect } from 'react';
import type { TimePickerProps } from './types';
import { MDCTimePicker } from './timepickermodule';

const TimePicker = ({
  visible,
  onSelect,
  onDismiss,
  onClose,
  ...timePickerOptions
}: TimePickerProps) => {
  useEffect(() => {
    if (!visible) return;

    MDCTimePicker.present(timePickerOptions)
      .then(onSelect)
      .catch(onDismiss)
      .finally(onClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return <></>;
};

export default TimePicker;
