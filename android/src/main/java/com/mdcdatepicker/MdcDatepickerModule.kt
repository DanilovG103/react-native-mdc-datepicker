package com.mdcdatepicker

import androidx.fragment.app.FragmentActivity
import androidx.core.util.Pair
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

    val activity = currentActivity as FragmentActivity
    val manager = activity.supportFragmentManager


    val picker = calendarBuilder(arguments, promise)

    activity.runOnUiThread {
        picker.show(manager, TAG)
    }
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

  private fun calendarBuilder(options: ReadableMap, promise: Promise): MaterialDatePicker<out Any> {
    val type = options.getString("type")
    val title = options.getString("title")
    val initialDate = options.getMap("initialDate")
    val minDate = options.getMap("minDate")
    val maxDate = options.getMap("maxDate")
    val constraints = constraintsBuilder(minDate, maxDate)

    if (type.equals("range")) {
      val start = options.getMap("start")
      val end = options.getMap("end")
      val rangeSelection = Pair(start?.getDateValues(), end?.getDateValues())
      val rangeBuilder = MaterialDatePicker.Builder
        .dateRangePicker()
        .setTitleText(title)
        .setCalendarConstraints(constraints)
        .setSelection(rangeSelection)

      val rangePicker = rangeBuilder.build()

      rangePicker.apply {
        addOnPositiveButtonClickListener {
          onApplyRange(promise, it)
        }
        addOnDismissListener {
          promise.reject("Error", "Picker cancelled")
        }
      }

      return rangePicker
    }

    val builder = MaterialDatePicker.Builder
      .datePicker()
      .setTitleText(title)
      .setCalendarConstraints(constraints)


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

    return picker
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

  private fun onApply(promise: Promise, it: Long) {
    val value = prepareDateValues(it)
    promise.resolve(value)
  }

  private fun onApplyRange(promise: Promise, it: Pair<Long, Long>) {
    val map = WritableNativeMap()
    val start = prepareDateValues(it.first)
    val end = prepareDateValues(it.second)

    map.putMap("start", start)
    map.putMap("end", end)

    promise.resolve(map)
  }

  private fun prepareDateValues(value: Long): ReadableMap {
    val map = WritableNativeMap()
    val calendar = Calendar.getInstance()
    calendar.timeInMillis = value
    map.putInt(Constants.MONTH, calendar.get(Calendar.MONTH))
    map.putInt(Constants.DAY, calendar.get(Calendar.DATE))
    map.putInt(Constants.YEAR, calendar.get(Calendar.YEAR))

    return map
  }


  companion object {
    const val NAME = "MdcDatepicker"
    const val TAG = "MdcDatepickerFragmentTag"
  }
}
