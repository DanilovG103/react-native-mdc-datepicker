export interface PickerResult {
  month: number;
  year: number;
  day: number;
}

export interface PickerRangeResult {
  start: Date;
  end: Date;
}

export interface TextOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

export interface BasePickerOptions {
  minDate?: Date;
  maxDate?: Date;
}

export interface PickerRangeOptions extends BasePickerOptions {
  start?: Date | null;
  end?: Date | null;
  confirmText?: string;
  initialStart?: Date;
  initialEnd?: Date;
}

export interface PickerDefaultOptions extends BasePickerOptions, TextOptions {
  value?: Date | null;
  initialDate?: Date;
}

export type TimePickerFormat = '24' | '12';

export type TimePickerMode = 'input' | 'clock';

export interface TimePickerOptions extends TextOptions {
  format?: TimePickerFormat;
  mode?: TimePickerMode;
}

export interface TimePickerResult {
  hour: number;
  minute: number;
}
