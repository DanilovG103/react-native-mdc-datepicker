package com.mdcdatepicker

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.TimeFormat
import java.util.Calendar

class MdcTimepickerModule(ctx: ReactApplicationContext): ReactContextBaseJavaModule(ctx) {

  override fun getName() = NAME

  @ReactMethod()
  public fun present(args: ReadableMap, promise: Promise) {
    val activity = currentActivity as FragmentActivity
    val manager = activity.supportFragmentManager

    val activityTheme = args.getActivityTheme()

    activity.setTheme(activityTheme)

    val picker = timePickerBuilder(args, promise)

    activity.runOnUiThread {
      picker.show(manager, TAG)
    }
  }

  private fun timePickerBuilder(options: ReadableMap, promise: Promise): MaterialTimePicker {
    val format = options.getString("format")
    val mode = options.getString("mode")
    val title = options.getString("title")
    val okText = options.getString("confirmText")
    val cancelText = options.getString("cancelText")

    val time = options.getTime()

    val timeFormat = when {
      format.equals("24") -> TimeFormat.CLOCK_24H
      else -> TimeFormat.CLOCK_12H
    }

    val inputMode = when {
      mode.equals("input") -> MaterialTimePicker.INPUT_MODE_KEYBOARD
      else -> MaterialTimePicker.INPUT_MODE_CLOCK
    }

    val theme = options.getTimepickerTheme()

    val builder = MaterialTimePicker.Builder()
      .setTitleText(title)
      .setTimeFormat(timeFormat)
      .setInputMode(inputMode)
      .setNegativeButtonText(cancelText)
      .setPositiveButtonText(okText)
      .setTheme(theme)
      .setHour(time.getValue(TimeValue.HOUR))
      .setMinute(time.getValue(TimeValue.MINUTE))

    val picker = builder.build()

    picker.apply {
      addOnPositiveButtonClickListener {
        onApply(promise, picker.hour, picker.minute)
      }
      addOnDismissListener {
        promise.reject("Error", "TimePicker cancelled")
      }
    }

    return picker
  }

  private fun ReadableMap.getTimepickerTheme(): Int {
    val theme = this.getString("theme")

    val timepickerTheme = themes[theme] ?: R.style.MaterialTimePickerTheme

    return timepickerTheme
  }

  private fun ReadableMap.getTime(): Map<TimeValue, Int> {
    val calendar = Calendar.getInstance()
    val map = mutableMapOf(TimeValue.HOUR to calendar.get(Calendar.HOUR), TimeValue.MINUTE to calendar.get(Calendar.MINUTE))
    val initialTime = this.getMap("initialTime")
    val value = this.getMap("value")

    val result = value ?: initialTime

    val hour = result?.getInt("hour")

    if (hour != null) {
      map[TimeValue.HOUR] = hour
    }

    val minutes = result?.getInt("minute")

    if (minutes != null) {
      map[TimeValue.MINUTE] = minutes
    }

    return map
  }

  private fun onApply(promise: Promise, hour: Int, minute: Int) {
    val map = WritableNativeMap()

    map.putInt(Constants.HOUR, hour)
    map.putInt(Constants.MINUTE, minute)

    promise.resolve(map)
  }


  companion object {
    const val NAME = "MdcTimepicker"
    const val TAG = "MdcTimepickerFragmentTag"
    val themes = mapOf("dark" to R.style.MaterialTimePickerDarkTheme, "light" to R.style.MaterialTimePickerLightTheme)

    enum class TimeValue {
      HOUR,
      MINUTE
    }
  }
}
