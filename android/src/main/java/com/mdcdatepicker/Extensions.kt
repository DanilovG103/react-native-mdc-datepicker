package com.mdcdatepicker

import com.facebook.react.bridge.ReadableMap

fun ReadableMap.getActivityTheme(): Int {

  val theme = this.getString("theme")

  val staticTheme = Constants.activityStaticTheme[theme] ?: R.style.MaterialTheme

  val dynamicTheme = Constants.activityDynamicTheme[theme] ?: R.style.MaterialDynamicTheme

  val dynamicColors = this.getBoolean("dynamicColors")
  val activityTheme = if (dynamicColors) dynamicTheme else staticTheme

  return activityTheme
}
