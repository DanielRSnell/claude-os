# CURRENT_DATE_TIME

**Function ID:** 67f7d12567832ee5b545216b

**Description:** No description provided

**Created:** 2025-04-10T14:09:41.000Z
**Updated:** 2025-06-30T11:22:57.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| timezone_offset | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| humanReadableDateTime | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables (timezone_offset instead of timezoneName)
  const { timezone_offset } = args.inputVars;
  
  // Initialize debug traces array
  const traces = [];
  
  // Add initial debug trace
  traces.push({
    type: "debug",
    payload: {
      message: "Starting date and time function with timezone offset"
    }
  });
  
  // Get current date and time
  const now = new Date();
  
  // Apply timezone settings
  let localDateTime = now;
  let effectiveOffset = 0;
  let effectiveTimezoneName = "UTC";
  
  // Use the provided timezone_offset
  if (timezone_offset !== undefined && timezone_offset !== null) {
    effectiveOffset = parseFloat(timezone_offset);
    
    // Validate offset is within reasonable range (-12 to +14)
    if (isNaN(effectiveOffset) || effectiveOffset < -12 || effectiveOffset > 14) {
      traces.push({
        type: "debug",
        payload: {
          message: `Invalid timezone offset: ${timezone_offset}, defaulting to UTC`
        }
      });
      effectiveOffset = 0;
    }
    
    // Create timezone name based on offset
    if (effectiveOffset === 0) {
      effectiveTimezoneName = "UTC";
    } else {
      const sign = effectiveOffset >= 0 ? "+" : "";
      effectiveTimezoneName = `UTC${sign}${effectiveOffset}`;
    }
  } else {
    traces.push({
      type: "debug",
      payload: {
        message: "No timezone_offset provided, defaulting to UTC"
      }
    });
  }
  
  // Calculate the time with the offset
  // First get UTC time in milliseconds
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  // Then add the requested offset in milliseconds
  localDateTime = new Date(utcTime + (3600000 * effectiveOffset));
  
  traces.push({
    type: "debug",
    payload: {
      message: `Applied timezone offset: ${effectiveOffset} hours (${effectiveTimezoneName})`
    }
  });
  
  // Format date components
  const year = localDateTime.getFullYear();
  const month = localDateTime.getMonth() + 1; // getMonth() returns 0-11
  const day = localDateTime.getDate();
  const hours = localDateTime.getHours();
  const minutes = localDateTime.getMinutes();
  const seconds = localDateTime.getSeconds();
  
  // Format time in 12-hour format with AM/PM
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Add leading zeros
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const hour12Str = hour12 < 10 ? `0${hour12}` : `${hour12}`;
  
  // Get day of week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[localDateTime.getDay()];
  
  // Get month name
  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthsOfYear[localDateTime.getMonth()];
  
  // Create different date and time formats
  const formats = {
    iso: localDateTime.toISOString(),
    fullDateTime: `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`,
    fullDate: `${year}-${monthStr}-${dayStr}`,
    shortDate: `${monthStr}/${dayStr}/${year}`,
    longDate: `${dayOfWeek}, ${monthName} ${day}, ${year}`,
    time24h: `${hoursStr}:${minutesStr}`,
    time12h: `${hour12Str}:${minutesStr} ${ampm}`,
    dateTimeFormatted: `${dayOfWeek}, ${monthName} ${day}, ${year} at ${hour12Str}:${minutesStr} ${ampm}`,
    unixTimestamp: Math.floor(localDateTime.getTime() / 1000)
  };
  
  // Prepare human readable response
  const humanReadableDateTime = formats.dateTimeFormatted;
  
  // Log debug information
  traces.push({
    type: "debug",
    payload: {
      message: `Current date/time: ${humanReadableDateTime} (${effectiveTimezoneName})`
    }
  });
  
  // Return success with formatted date and time values
  return {
    outputVars: {
      ...formats,
      humanReadableDateTime,
      dayOfWeek,
      monthName,
      day,
      month,
      year,
      hours,
      minutes,
      seconds,
      hour12,
      ampm,
      timezone: effectiveTimezoneName,
      timezoneOffset: effectiveOffset
    },
    next: { path: 'success' },
    trace: traces
  };
}
```

## Additional Metadata

**Path Order:** ['67f7d17967832ee5b545218d']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
