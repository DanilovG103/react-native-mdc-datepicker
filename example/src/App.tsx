import React, { useCallback, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MDCDatePicker, MDCTimePicker } from 'react-native-mdc-datepicker';

const minDate = new Date(2020, 5, 14);
const maxDate = new Date(2023, 11, 24);

export default function App() {
  const [selected, setSelected] = useState<Date | null>(null);
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const presentDefault = useCallback(async () => {
    try {
      const date = await MDCDatePicker.present({
        minDate,
        maxDate,
        value: selected,
        dynamicColors: true,
      });

      setSelected(date);
    } catch (err) {
      console.log(err);
    }
  }, [selected]);

  const presentRange = useCallback(async () => {
    try {
      const val = await MDCDatePicker.presentRange({
        minDate,
        maxDate,
        dynamicColors: true,
        ...selectedRange,
      });
      console.log(val);
      setSelectedRange(val);
    } catch {}
  }, [selectedRange]);

  const presentTimePicker = useCallback(async () => {
    try {
      const time = await MDCTimePicker.present({
        format: '24',
        mode: 'clock',
      });
      console.log(time);
    } catch {}
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={presentDefault}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={presentRange}>
        <Text>Show Date Range Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={presentTimePicker}>
        <Text>Show Time Picker</Text>
      </TouchableOpacity>
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
