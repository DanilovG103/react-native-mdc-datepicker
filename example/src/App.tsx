import React, { useCallback, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  DatePicker,
  TimePicker,
  type TimePickerResult,
} from 'react-native-mdc-datepicker';

const minDate = new Date(2020, 5, 14);
const maxDate = new Date(2023, 11, 24);

export default function App() {
  const [time, setTime] = useState<TimePickerResult | null>(null);
  const [timeVisible, setTimeVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [rangeVisible, setRangeVisible] = useState(false);

  const [selected, setSelected] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const presentDefault = useCallback(async () => {
    setDateVisible(true);
    // try {
    //   const date = await MDCDatePicker.present({
    //     minDate,
    //     maxDate,
    //     value: selected,
    //     dynamicColors: true,
    //   });

    //   setSelected(date);
    // } catch (err) {
    //   console.log(err);
    // }
  }, []);

  const presentRange = useCallback(async () => {
    setRangeVisible(true);
    // try {
    //   const val = await MDCDatePicker.presentRange({
    //     minDate,
    //     maxDate,
    //     dynamicColors: true,
    //     ...selectedRange,
    //   });
    //   console.log(val);
    //   setSelectedRange(val);
    // } catch {}
  }, []);

  const presentTimePicker = useCallback(async () => {
    setTimeVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={presentDefault}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={presentRange}>
        <Text>Show Date Range Picker</Text>
      </TouchableOpacity>
      {time && (
        <Text>
          Time is {time.hour}:{time.minute}
        </Text>
      )}
      <TouchableOpacity onPress={presentTimePicker}>
        <Text>Show Time Picker</Text>
      </TouchableOpacity>
      <TimePicker
        visible={timeVisible}
        setVisible={setTimeVisible}
        format="24"
        mode="clock"
        onSelect={setTime}
      />
      <DatePicker
        visible={dateVisible}
        setVisible={setDateVisible}
        value={selected}
        minDate={minDate}
        dynamicColors
        maxDate={maxDate}
        onSelect={setSelected}
      />
      <DatePicker
        dynamicColors
        mode="range"
        visible={rangeVisible}
        setVisible={setRangeVisible}
        minDate={minDate}
        maxDate={maxDate}
        onSelect={setSelectedRange}
        {...selectedRange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
});
