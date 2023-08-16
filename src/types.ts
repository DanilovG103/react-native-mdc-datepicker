export interface PickerResult {
  month: number;
  year: number;
  day: number;
}

export interface PickerOptions {
  title?: string;
  minDate?: Date;
  maxDate?: Date;
  initialDate: Date;
}

export interface Picker {
  present: (options: PickerOptions) => Promise<PickerResult>;
}
