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
    const args = MDCDatePicker.normalizeOptions(options);

    const value = await DatePickerModule.present(args);

    return MDCDatePicker.getDate(value);
  }

  public static async presentRange(
    options: PickerRangeOptions
  ): Promise<PickerRangeResult> {
    const args = MDCDatePicker.normalizeOptions(options);
    const value = await DatePickerModule.present({ ...args, type: 'range' });

    return {
      start: MDCDatePicker.getDate(value.start),
      end: MDCDatePicker.getDate(value.end),
    };
  }

  private static normalizeOptions(
    options?: PickerDefaultOptions | PickerRangeOptions
  ) {
    if (!options) return {};

    return Object.entries(options).reduce<Record<string, unknown>>(
      (acc, [key, value]) => {
        const val =
          value instanceof Date ? MDCDatePicker.normalizeDate(value) : value;

        acc[key] = val;

        return acc;
      },
      {}
    );
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
