import { NativeModules, Platform } from 'react-native';
import type {
  PickerDefaultOptions,
  PickerRangeOptions,
  PickerRangeResult,
  PickerResult,
} from './types';

const DatePickerAndroid = NativeModules.MdcDatepicker;

const DatePickerIOS = {
  present: (_: unknown) =>
    Promise.reject('DatePicker does not implemented on IOS'),
};

const DatePickerModule =
  Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid;

export class MDCDatePicker {
  public static async present(options?: PickerDefaultOptions): Promise<Date> {
    const value = await DatePickerModule.present({
      ...options,
      minDate: MDCDatePicker.normalizeDate(options?.minDate),
      maxDate: MDCDatePicker.normalizeDate(options?.maxDate),
      initialDate: MDCDatePicker.normalizeDate(options?.value),
      type: 'default',
    });

    return MDCDatePicker.getDate(value);
  }

  public static async presentRange(
    options: PickerRangeOptions
  ): Promise<PickerRangeResult> {
    const value = await DatePickerModule.present({
      ...options,
      minDate: MDCDatePicker.normalizeDate(options?.minDate),
      maxDate: MDCDatePicker.normalizeDate(options?.maxDate),
      start: MDCDatePicker.normalizeDate(options?.start),
      end: MDCDatePicker.normalizeDate(options?.end),
      type: 'range',
    });

    return {
      start: MDCDatePicker.getDate(value.start),
      end: MDCDatePicker.getDate(value.end),
    };
  }

  private static normalizeDate(date?: Date | null) {
    if (!date) {
      return undefined;
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }

  private static getDate(value: PickerResult) {
    const offset = new Date().getTimezoneOffset() / 60;

    const date = new Date(value.year, value.month, value.day, 0 - offset);

    return date;
  }
}
