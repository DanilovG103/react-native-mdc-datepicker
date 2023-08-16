import { NativeModules, Platform } from 'react-native';
import type { PickerOptions } from './types';

const DatePickerAndroid = NativeModules.MdcDatepicker;

const DatePickerIOS = {
  present: (_: unknown) =>
    Promise.reject('DatePicker does not implemented on IOS'),
};

const DatePickerModule =
  Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid;

export class MDCDatePicker {
  public static async present(options?: PickerOptions): Promise<Date> {
    const value = await DatePickerModule.present({
      ...options,
      minDate: MDCDatePicker.normalizeDate(options?.minDate),
      maxDate: MDCDatePicker.normalizeDate(options?.maxDate),
      initialDate: MDCDatePicker.normalizeDate(options?.initialDate),
    });

    const offset = new Date().getTimezoneOffset() / 60;
    const date = new Date(value.year, value.month, value.day, 0 - offset);

    return date;
  }

  private static normalizeDate(date?: Date) {
    if (!date) {
      return undefined;
    }
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }
}
