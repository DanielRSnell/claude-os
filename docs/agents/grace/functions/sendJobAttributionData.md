# sendJobAttributionData

**Function ID:** 680a799ddf064418b5db3cc4

**Description:** No description provided

**Created:** 2025-04-24T17:49:18.000Z
**Updated:** 2025-05-18T12:00:53.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| jobId | No description |
| webSessionData | No description |
| apiHost | No description |
| market | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| success | No description |
| error | No description |
| responseData | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables
  const { jobId, webSessionData, market, apiHost } = args.inputVars;
  
  // Validate required input variables
  if (!jobId || !webSessionData || !market || !apiHost) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variables: jobId, webSessionData, market, and apiHost are required" 
        } 
      }]
    };
  }

  
  const payload = {
    "webSessionData": {
      "landingPageUrl": webSessionData.landing_page || "",
      "referrerUrl": webSessionData.original_referrer || webSessionData.referrer || "",
      "gclid": webSessionData.gclid || null,
      "fbclid": webSessionData.fbclid || null,
      "msclkid": webSessionData.msclkid || null,
      "gbraid": webSessionData.gbraid || null,
      "wbraid": webSessionData.wbraid || null,
      "utmSource": webSessionData.utm_source || null,
      "utmMedium": webSessionData.utm_medium || null,
      "utmCampaign": webSessionData.utm_campaign || null,
      "utmAdgroup": webSessionData.utm_adgroup || null,
      "utmTerm": webSessionData.utm_term || null,
      "utmContent": webSessionData.utm_content || null,
      "googleAnalyticsClientId": webSessionData.ga_client_id || null
    },
    "jobId": jobId
  };
  
  // Construct the URL for the API endpoint
  const url = `${apiHost}/api/v2/market/${market}/service-titan/schedule/job-attributions`;
  
  // Set up the request options
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  };
  
  try {
    // Make the API request
    const response = await fetch(url, config);
    
    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the response
    const responseBody = response.json;
    
    // Add debug trace for the response
    const debugTrace = { 
      type: "debug", 
      payload: { 
        message: `API Response: ${JSON.stringify(responseBody)}` 
      } 
    };
    
    // Create attribution output
    // The API might be expecting specific fields to track attributions
    return {
      outputVars: { 
        success: true,
        responseData: JSON.stringify(responseBody)
      },
      next: { path: 'success' },
      trace: [
        debugTrace,
        { 
          type: "debug", 
          payload: { 
            message: `Successfully sent job attribution data for job ID: ${jobId}` 
          } 
        }
      ]
    };
  } catch (error) {
    return {
      outputVars: { 
        success: false,
        error: error.message,
        responseData: `Request payload: ${JSON.stringify(payload)}`     
      },
      next: { path: 'error' },
      trace: [
        { 
          type: "debug", 
          payload: { 
            message: `Request payload: ${JSON.stringify(payload)}` 
          } 
        },
        { 
          type: "debug", 
          payload: { 
            message: `Error sending job attribution data: ${error.message}` 
          } 
        }
      ]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['680a79e8df064418b5db3d01', '680a79eadf064418b5db3d02']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
