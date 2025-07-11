# CREATE_JOB [Final Booking]

**Function ID:** 680693f784cb77110f0bf1c8

**Description:** No description provided

**Created:** 2025-04-21T18:52:39.000Z
**Updated:** 2025-05-14T14:43:17.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| customer_ID | No description |
| location_ID | No description |
| availableTechs | No description |
| conversationSummary | No description |
| startTime | No description |
| endTime | No description |
| serviceTitanIDs | No description |
| apiEndpoint | No description |
| bearerToken | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| responseBody | No description |
| jobId | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables from args
  const { 
    customer_ID, 
    location_ID, 
    serviceTitanIDs, 
    availableTechs, 
    conversationSummary, 
    startTime, 
    endTime,
    latitude,
    longitude,
    bearerToken,
    apiEndpoint
  } = args.inputVars;

  // Validate required input variables
  const requiredFields = [
    { name: 'customer_ID', value: customer_ID },
    { name: 'location_ID', value: location_ID },
    { name: 'startTime', value: startTime },
    { name: 'endTime', value: endTime },
    { name: 'serviceTitanIDs', value: serviceTitanIDs },
    { name: 'bearerToken', value: bearerToken },
    { name: 'apiEndpoint', value: apiEndpoint }
  ];

  // Check for missing required fields
  const missingFields = requiredFields
    .filter(field => !field.value)
    .map(field => field.name);

  if (missingFields.length > 0) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Missing required input variables: ${missingFields.join(', ')}` 
        } 
      }]
    };
  }

  // Parse serviceTitanIds - this is now required
  let parsedIds = {};
  let tagIds = [];
  
  try {
    parsedIds = JSON.parse(serviceTitanIDs);
    
    // Extract s2fTagId and s2fChatTagId to combine into tagTypeIds array
    if (parsedIds.s2fTagId) {
      tagIds.push(parsedIds.s2fTagId);
    }
    
    if (parsedIds.s2fChatTagId) {
      tagIds.push(parsedIds.s2fChatTagId);
    }
     // If repeatCustomerReplaceDefaultTagId has a value, add it to tagIds
    // If repeatCustomerReplaceDefaultTagId is empty but defaultTagId has a value, add defaultTagId
     if (parsedIds.repeatCustomerReplaceDefaultTagId && parsedIds.repeatCustomerReplaceDefaultTagId !== "") {
      tagIds.push(parsedIds.repeatCustomerReplaceDefaultTagId);
    } else if (parsedIds.defaultTagId && parsedIds.defaultTagId !== "") {
      tagIds.push(parsedIds.defaultTagId);
    }
  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error parsing serviceTitanIDs JSON: ${error.message}` 
        } 
      }]
    };
  }
  
  // Ensure required fields from serviceTitanIDs are present
  if (!parsedIds.businessUnitId || !parsedIds.campaignId || !parsedIds.jobTypeId) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Missing required fields in serviceTitanIDs: businessUnitId, campaignId, and/or jobTypeId are missing` 
        } 
      }]
    };
  }
  
  // Create the payload for the API request
  const payload = {
    businessUnitId: parsedIds.businessUnitId,
    campaignId: parsedIds.campaignId,
    customerId: customer_ID,
    start: startTime,
    end: endTime,
    jobTypeId: parsedIds.jobTypeId,
    latitude: latitude || 0,
    longitude: longitude || 0,
    locationId: location_ID,
    summary: conversationSummary || "",
    tagTypeIds: tagIds,
    technicianIds: availableTechs ? JSON.parse(availableTechs) : []
  };

  // Setup the request options
  const config = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  // Check if we're in debug mode (just testing payload construction)
  const isDebugMode = apiEndpoint === 'debug' || apiEndpoint === 'test';
  
  if (isDebugMode) {
    // Skip the API call and just return the constructed payload
    return {
      outputVars: { 
        constructedPayload: JSON.stringify(payload),
        requestConfig: JSON.stringify(config)
      },
      next: { path: 'success' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `DEBUG MODE: Constructed payload: ${JSON.stringify(payload, null, 2)}` 
        } 
      }]
    };
  }
  
  try {
    // Make the API call
    const response = await fetch(apiEndpoint, config);
    
    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Extract the response body
    const responseBody = response.json;
    const jobId = responseBody.data.jobId;
    
    // Return success
    return {
      outputVars: { 
        responseBody: JSON.stringify(responseBody),
        jobId: jobId
      },
      next: { path: 'success' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Job created successfully: ${JSON.stringify(responseBody)}` 
        } 
      }]
    };
  } catch (error) {
    // Handle errors during the API call
    return {
      outputVars: { error: error.message },
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error creating job: ${error.message}` 
        } 
      }]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['680694d984cb77110f0bf237', '680694e084cb77110f0bf238']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
