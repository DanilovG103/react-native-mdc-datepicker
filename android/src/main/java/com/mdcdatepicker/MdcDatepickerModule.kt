package com.mdcdatepicker

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.android.material.datepicker.CalendarConstraints
import com.google.android.material.datepicker.MaterialDatePicker
import java.util.Calendar

class MdcDatepickerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = NAME

  @ReactMethod
  public fun present(arguments: ReadableMap, promise: Promise) {
    val title = arguments.getString("title")
    val initialDate = arguments.getMap("initialDate")
    val minDate = arguments.getMap("minDate")
    val maxDate = arguments.getMap("maxDate")
    val activity = currentActivity as FragmentActivity
    val manager = activity.supportFragmentManager

    val constraints = constraintsBuilder(minDate, maxDate)
    val builder = MaterialDatePicker.Builder
      .datePicker()
      .setTitleText(title)

    if (minDate != null || minDate != null) {
      builder.setCalendarConstraints(constraints)
    }

    if (initialDate != null) {
      builder.setSelection(initialDate.getDateValues())
    }

    val picker = builder.build()

    picker.apply {
      addOnPositiveButtonClickListener {
        onApply(promise, it)
      }
      addOnDismissListener {
        promise.reject("Error", "Picker cancelled")
      }
    }

    activity.runOnUiThread {
        picker.show(manager, TAG)
    }
  }

  private fun onApply(promise: Promise, it: Long) {
    val calendar = Calendar.getInstance()
    val map = WritableNativeMap()
    calendar.timeInMillis = it
    map.putInt(Constants.MONTH, calendar.get(Calendar.MONTH))
    map.putInt(Constants.DAY, calendar.get(Calendar.DATE))
    map.putInt(Constants.YEAR, calendar.get(Calendar.YEAR))
    promise.resolve(map)
  }


  private fun constraintsBuilder(minDate: ReadableMap?, maxDate: ReadableMap?): CalendarConstraints {
    val constraints = CalendarConstraints.Builder()

    if (minDate != null) {
      constraints.setStart(minDate.getDateValues())
    }

    if (maxDate != null) {
      constraints.setEnd(maxDate.getDateValues())
    }

    return constraints.build()
  }

  private fun ReadableMap.getDateValues(): Long {
    val calendar = Calendar.getInstance();

    val year = this.getInt("year")
    val month = this.getInt("month")
    val day = this.getInt("day")

    if (year == null || month == null || day == null) return calendar.timeInMillis

    calendar.set(year, month, day)

    return calendar.timeInMillis
  }

  companion object {
    const val NAME = "MdcDatepicker"
    const val TAG = "MdcDatepickerFragmentTag"
  }
}
