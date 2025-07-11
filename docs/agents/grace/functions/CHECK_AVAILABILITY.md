# CHECK_AVAILABILITY

**Function ID:** 67dff36182602eae768cfb9e

**Description:** check available appointment times for booking technician appointments

**Created:** 2025-03-23T11:41:22.000Z
**Updated:** 2025-06-30T17:46:17.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| zip_code | customers provided zip code |
| job_type | type of job (repair, operators) |
| avail_webhook_url | No description |
| user_id | No description |
| timeZoneOffset | No description |
| s2fId | No description |
| authToken | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| UUID | No description |
| termsOfService | No description |
| timeSlots | No description |
| error | No description |
| DBRowId | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  /* ---------------------------------- INPUT --------------------------------- */
  const { zip_code, job_type, avail_webhook_url,
          user_id,  s2fId,  authToken, timeZoneOffset } = args.inputVars;

  if (!zip_code || !job_type) {
    return {
      next : { path: 'error' },
      trace: [{ type:"debug",
        payload:{ message:"Missing required input variables: zip_code and/or job_type" }}]
    };
  }

  /* ---------------------------------- CALL ---------------------------------- */
  const response = await fetch(avail_webhook_url, {
    method : 'POST',
    headers: { 'Content-Type':'application/json' },
    body   : JSON.stringify({ zip_code, job_type, user_id, s2fId, authToken, timeZoneOffset })
  });

  if (!response.ok)
    return _error(`HTTP error! status: ${response.status}`);

  
  const responseBody = response.json;

  /* --------------------------- PICK OUT TOP-LEVELS --------------------------- */
  const DBRowId       = responseBody?.DBRowId ?? null;
  const UUID          = responseBody?.UUID    ?? null;
  const termsOfService= responseBody?.terms_of_service ?? '';

  /* -------------------------- FIND THE SLOT OBJECT -------------------------- */
  let timeSlots = null;

  if (responseBody?.available_slots) {
    timeSlots = responseBody.available_slots;                    // newest schema
  } else if (Array.isArray(responseBody) && responseBody.length) {
    // legacy array wrapper
    const first = responseBody[0];
    timeSlots = first?.available_slots ?? first?.result ?? null;
  } else if (responseBody?.result) {
    timeSlots = responseBody.result;                             // very old schema
  } else {
    timeSlots = responseBody;                                    // fallback
  }

  if (!timeSlots || Object.keys(timeSlots).length === 0)
    return _error('No time slots found in webhook response');

  /* ---------------------------- FORMAT FOR OUTPUT --------------------------- */
const formattedTimeSlots = Object.values(timeSlots)
  // pick the slot only if it has the new keys
  .filter(s => s?.start && s?.end)
  .map(s  => ({    
    startTime: s.start,
    endTime  : s.end
  }))
  .sort((a, b) =>
    new Date(a.startTime.replace(',', '')) -
    new Date(b.startTime.replace(',', ''))
  );

if (!formattedTimeSlots.length)
  return _error('No valid (start / end) pairs after parsing');


  /* --------------------------------- RETURN -------------------------------- */
  return {
    outputVars: {
      timeSlots      : JSON.stringify(formattedTimeSlots),
      termsOfService ,
      DBRowId        ,
      UUID
    },
    next: { path:'success' },
    trace:[{ type:"debug",
      payload:{ message:`Returned ${formattedTimeSlots.length} slot(s)` }}]
  };

  /* ---------------------------- LOCAL ERROR HELPER -------------------------- */
  function _error(msg){
    return {
      next : { path:'error' },
      outputVars:{ error: msg },
      trace:[{ type:"debug", payload:{ message: 'CHECK_AVAILABILITY error: '+msg }}]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['67dff36182602eae768cfba0', '67dff36182602eae768cfb9f']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
