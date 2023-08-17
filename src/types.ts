export interface PickerResult {
  month: number;
  year: number;
  day: number;
}

export interface PickerRangeResult {
  start: Date;
  end: Date;
}

export interface BasePickerOptions {
  title?: string;
  minDate?: Date;
  maxDate?: Date;
}

export interface PickerRangeOptions extends BasePickerOptions {
  start?: Date | null;
  end?: Date | null;
}

export interface PickerDefaultOptions extends BasePickerOptions {
  value?: Date | null;
}
