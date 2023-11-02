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

interface BasePickerOptions {
  minDate?: Date;
  maxDate?: Date;
  fullScreen?: boolean;
  dynamicColors?: boolean;
  theme?: 'system' | 'dark' | 'light';
}

export interface PickerRangeOptions extends BasePickerOptions {
  start?: Date | null;
  end?: Date | null;
  title?: string;
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
  dynamicColors?: boolean;
  theme?: 'system' | 'dark' | 'light';
}

export interface TimePickerResult {
  hour: number;
  minute: number;
}

export interface PickerComponentBaseProps<Result> {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onDismiss?: () => void;
  onSelect?: (result: Result) => void;
}

export type TimePickerProps = TimePickerOptions &
  PickerComponentBaseProps<TimePickerResult>;

export type DatePickerDefaultProps = PickerDefaultOptions &
  PickerComponentBaseProps<Date>;

export type DatePickerRangeProps = PickerRangeOptions &
  PickerComponentBaseProps<PickerRangeResult>;

export interface DatePickerRangeComponentProps extends DatePickerRangeProps {
  mode: 'range';
}

export interface DatePickerDefaultComponentProps
  extends DatePickerDefaultProps {
  mode?: 'default';
}

export type DatePickerProps =
  | DatePickerDefaultComponentProps
  | DatePickerRangeComponentProps;
