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

class MdcTimepickerModule(ctx: ReactApplicationContext): ReactContextBaseJavaModule(ctx) {

  override fun getName() = NAME

  @ReactMethod()
  public fun present(args: ReadableMap, promise: Promise) {
    val activity = currentActivity as FragmentActivity
    val manager = activity.supportFragmentManager

    activity.setTheme(R.style.MaterialTheme)

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

    val timeFormat = when {
      format.equals("24") -> TimeFormat.CLOCK_24H
      else -> TimeFormat.CLOCK_12H
    }

    val inputMode = when {
      mode.equals("input") -> MaterialTimePicker.INPUT_MODE_KEYBOARD
      else -> MaterialTimePicker.INPUT_MODE_CLOCK
    }

    val builder = MaterialTimePicker.Builder()
      .setTitleText(title)
      .setTimeFormat(timeFormat)
      .setInputMode(inputMode)
      .setNegativeButtonText(cancelText)
      .setPositiveButtonText(okText)
      .setTheme(R.style.MaterialTimePickerTheme)

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

  private fun onApply(promise: Promise, hour: Int, minute: Int) {
    val map = WritableNativeMap()

    map.putInt(Constants.HOUR, hour)
    map.putInt(Constants.MINUTE, minute)

    promise.resolve(map)
  }


  companion object {
    const val NAME = "MdcTimepicker"
    const val TAG = "MdcTimepickerFragmentTag"
  }
}
