import { NativeModules, Platform } from 'react-native';
import type { TimePickerOptions, TimePickerResult } from './types';

const DatePickerAndroid = NativeModules.MdcTimepicker;

const DatePickerIOS = {
  present: (_: unknown) =>
    Promise.reject('TimePicker does not implemented on IOS'),
};

const TimePickerModule =
  Platform.OS === 'ios' ? DatePickerIOS : DatePickerAndroid;

export class MDCTimePicker {
  public static async present(
    options?: TimePickerOptions
  ): Promise<TimePickerResult> {
    const data = await TimePickerModule.present(options ?? {});

    return data;
  }
}
