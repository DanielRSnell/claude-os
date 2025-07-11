# APPOINTMENT_TIME_IDs

**Function ID:** 680652bf8a4b43c9c441e7b1

**Description:** No description provided

**Created:** 2025-04-21T14:14:23.000Z
**Updated:** 2025-04-21T14:41:27.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| appointment_time | No description |
| s2f_raw_availability | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| matchedSlot | No description |
| endTime | No description |
| startTime | No description |
| availableTechIds | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables
  const { appointment_time, s2f_raw_availability } = args.inputVars;
  
  // Validate input variables
  if (!appointment_time || !s2f_raw_availability) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variables: appointment_time or s2f_raw_availability" 
        } 
      }]
    };
  }
  
  try {
    // Parse the appointment time string (format: "04/21/2025, 12:00 PM - 4:00 PM")
    const parsedTime = parseAppointmentTime(appointment_time);
    
    // Create Date objects for start and end times (in local time)
    const startDate = new Date(
      parsedTime.year, 
      parsedTime.month - 1, // Month is 0-indexed in JavaScript Date
      parsedTime.day,
      parsedTime.startHour,
      parsedTime.startMinute
    );
    
    // Based on our debugging, we know that:
    // 1. The function runs in a GMT/UTC environment (timezone offset = 0)
    // 2. The data in s2f_raw_availability assumes EDT (UTC-4)
    // 3. The appointment times are in local time (whichever timezone the user is in)
    
    // So we need to:
    // 1. Assume the appointment time is in EDT (UTC-4)
    // 2. Add 4 hours to get the UTC time that matches the data
    const startHourUTC = parsedTime.startHour + 4; // Convert from EDT to UTC
    
    // Format as ISO string with Z suffix
    const startUTC = `${parsedTime.year}-${String(parsedTime.month).padStart(2, '0')}-${String(parsedTime.day).padStart(2, '0')}T${String(startHourUTC).padStart(2, '0')}:${String(parsedTime.startMinute).padStart(2, '0')}:00Z`;
    
    // Parse the raw availability JSON
    let availabilityData;
    try {
      availabilityData = JSON.parse(s2f_raw_availability);
    } catch (e) {
      // If it's already an object, use it directly
      if (typeof s2f_raw_availability === 'object') {
        availabilityData = s2f_raw_availability;
      } else {
        throw new Error("Unable to parse s2f_raw_availability as JSON");
      }
    }
    
    // Find the matching time slot
    let matchedSlot = null;
    
    for (const key in availabilityData) {
      const slot = availabilityData[key];
      
      // Compare only the start time
      if (slot.start === startUTC) {
        matchedSlot = slot;
        break;
      }
    }
    
    // If no direct match is found, check if we need to look at startUnmodified
    if (!matchedSlot) {
      for (const key in availabilityData) {
        const slot = availabilityData[key];
        
        // Some slots might have the startUnmodified field that matches our local time
        if (slot.startUnmodified) {
          const localTimeStr = `${parsedTime.year}-${String(parsedTime.month).padStart(2, '0')}-${String(parsedTime.day).padStart(2, '0')}T${String(parsedTime.startHour).padStart(2, '0')}:${String(parsedTime.startMinute).padStart(2, '0')}:00Z`;
          
          if (slot.startUnmodified === localTimeStr) {
            matchedSlot = slot;
            break;
          }
        }
      }
    }
    
    if (!matchedSlot) {
      return {
        next: { path: 'no_match' },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `No matching time slot found for ${appointment_time} (UTC time: ${startUTC})` 
          } 
        }]
      };
    }
    
    // Return success with the matched slot data
    return {
      outputVars: { 
        matchedSlot: JSON.stringify(matchedSlot),
        startTime: matchedSlot.start,
        endTime: matchedSlot.end,
        availableTechIds: JSON.stringify(convertTechIdsToArray(matchedSlot.availableTechIds))
      },
      next: { path: 'success' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Found matching time slot for ${appointment_time} (UTC time: ${startUTC})` 
        } 
      }]
    };
    
  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error processing appointment time: ${error.message}` 
        } 
      }]
    };
  }
  
  // Function to convert technician IDs from object to array format
  function convertTechIdsToArray(techIds) {
    // If techIds is already an array, just return it
    if (Array.isArray(techIds)) {
      return techIds;
    }
    
    // If techIds is an object, extract the values into an array
    if (typeof techIds === 'object' && techIds !== null) {
      return Object.values(techIds);
    }
    
    // If techIds is a string (JSON), try to parse it
    if (typeof techIds === 'string') {
      try {
        const parsed = JSON.parse(techIds);
        return convertTechIdsToArray(parsed); // Recursively process the parsed result
      } catch (e) {
        // If parsing fails, return an empty array
        return [];
      }
    }
    
    // Default to empty array if none of the above conditions are met
    return [];
  }
  
  // Function to parse appointment time string
  function parseAppointmentTime(timeStr) {
    // Format: "MM/DD/YYYY, HH:MM AM/PM - HH:MM AM/PM"
    const regex = /(\d{2})\/(\d{2})\/(\d{4}), (\d{1,2}):(\d{2}) ([AP]M) - (\d{1,2}):(\d{2}) ([AP]M)/;
    const match = timeStr.match(regex);
    
    if (!match) {
      throw new Error(`Invalid appointment time format: ${timeStr}`);
    }
    
    const [_, month, day, year, startHour, startMinute, startAmPm, endHour, endMinute, endAmPm] = match;
    
    // Convert to 24-hour format
    const startHour24 = convertTo24Hour(parseInt(startHour), startAmPm);
    const endHour24 = convertTo24Hour(parseInt(endHour), endAmPm);
    
    return {
      month: parseInt(month),
      day: parseInt(day),
      year: parseInt(year),
      startHour: startHour24,
      startMinute: parseInt(startMinute),
      endHour: endHour24,
      endMinute: parseInt(endMinute)
    };
  }
  
  // Function to convert 12-hour format to 24-hour
  function convertTo24Hour(hour, amPm) {
    if (amPm === "AM") {
      return hour === 12 ? 0 : hour;
    } else {
      return hour === 12 ? 12 : hour + 12;
    }
  }
}
```

## Additional Metadata

**Path Order:** ['680653028a4b43c9c441e7f2', '680653058a4b43c9c441e7f6', '680653d08a4b43c9c441e880']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
