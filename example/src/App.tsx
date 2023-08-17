import React, { useCallback, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MDCDatePicker } from 'react-native-mdc-datepicker';

const minDate = new Date(2020, 5, 14);
const maxDate = new Date(2023, 11, 31);

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
        ...selectedRange,
      });
      console.log(val);
      setSelectedRange(val);
    } catch {}
  }, [selectedRange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={presentDefault}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={presentRange}>
        <Text>Show Date Range Picker</Text>
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
