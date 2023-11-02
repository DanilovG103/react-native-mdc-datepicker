package com.mdcdatepicker

import com.facebook.react.bridge.ReadableMap

fun ReadableMap.getActivityTheme(): Int {
  val theme = this.getString("theme")

  val staticTheme = when (theme) {
    "system" -> R.style.MaterialTheme
    "dark" -> R.style.MaterialDarkTheme
    "light" -> R.style.MaterialLightTheme
    else -> R.style.MaterialTheme
  }

  val dynamicTheme = when (theme) {
    "system" -> R.style.MaterialDynamicTheme
    "dark" -> R.style.MaterialDynamicDarkTheme
    "light" -> R.style.MaterialDynamicLightTheme
    else -> R.style.MaterialDynamicTheme
  }

  val dynamicColors = this.getBoolean("dynamicColors")
  val activityTheme = if (dynamicColors) dynamicTheme else staticTheme

  return activityTheme
}
