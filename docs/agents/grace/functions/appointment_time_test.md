# appointment_time_test

**Function ID:** 680e4002c1e2d8fd20440164

**Description:** No description provided

**Created:** 2025-04-27T14:32:34.000Z
**Updated:** 2025-06-02T00:55:38.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| appointment_time | No description |
| baseRowId | No description |
| webhook_url | No description |
| timezone | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| matchedSlot | No description |
| startTime | No description |
| endTime | No description |
| availableTechIds | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables
  const { appointment_time, baseRowId, webhook_url, timezone } = args.inputVars;
  
  // Validate input variables
  if (!appointment_time || !baseRowId || !webhook_url) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variables: appointment_time, baseRowId, or webhook_url" 
        } 
      }]
    };
  }
  
  try {
    // Prepare the request body
    const requestBody = JSON.stringify({
      appointment_time,
      baseRowId,
      timezone
    });
    
    // Configure the fetch request
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    };
    
    // Make the API call to your webhook
    const response = await fetch(webhook_url, config);
    
    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Extract the JSON body from the response
    const responseBody = response.json;
    
    // Debug the response structure
    const responseType = typeof responseBody;
    const isArray = Array.isArray(responseBody);
    
    // Log the response structure for debugging
    const debugTrace = [
      { 
        type: "debug", 
        payload: { 
          message: `Response type: ${responseType}, isArray: ${isArray}` 
        } 
      },
      { 
        type: "debug", 
        payload: { 
          message: `Response body: ${JSON.stringify(responseBody).substring(0, 500)}` 
        } 
      }
    ];
    
    // If response is an array, extract the first item
    let dataObject = responseBody;
    if (isArray && responseBody.length > 0) {
      dataObject = responseBody[0];
      debugTrace.push({
        type: "debug",
        payload: {
          message: "Extracted first item from array response"
        }
      });
    }
    
    // Now validate and process the data object
    if (!dataObject || typeof dataObject !== 'object') {
      // Return error with debugging information
      return {
        next: { path: 'error' },
        trace: [
          ...debugTrace,
          { 
            type: "debug", 
            payload: { 
              message: "Invalid data structure in response" 
            } 
          }
        ]
      };
    }
    
    // Check for success/failure in the extracted data
    if (!dataObject.success) {
      return {
        next: { path: 'no_match' },
        trace: [
          ...debugTrace,
          { 
            type: "debug", 
            payload: { 
              message: `No match found: ${dataObject.error || "Unknown error"}` 
            } 
          }
        ]
      };
    }
    
    // Return success with the data from the webhook (with proper extraction)
    return {
      outputVars: { 
        matchedSlot: JSON.stringify(dataObject.matchedSlot || {}),
        startTime: dataObject.startTime || "",
        endTime: dataObject.endTime || "",
        availableTechIds: JSON.stringify(dataObject.availableTechIds || [])
      },
      next: { path: 'success' },
      trace: debugTrace
    };
    
  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error processing webhook request: ${error.message}` 
        } 
      }]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['680e4019c1e2d8fd2044018b', '680e401cc1e2d8fd20440191', '683cf68960d51f8ed28319d7']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
