import React, { useCallback } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MDCDatePicker } from 'react-native-mdc-datepicker';

export default function App() {
  const onPress = useCallback(async () => {
    const minDate = new Date(2020, 5, 14);
    const maxDate = new Date(2023, 11, 31);
    const initialDate = new Date(2022, 6, 24);
    try {
      const date = await MDCDatePicker.present({
        title: 'Выбрать дату',
        minDate,
        maxDate,
        initialDate,
      });

      console.log(date);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text>Show Date Picker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
