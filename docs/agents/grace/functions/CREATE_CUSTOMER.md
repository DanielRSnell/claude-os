# CREATE_CUSTOMER

**Function ID:** 67fce94458073caa366096ad

**Description:** create a new customer account after collecting required contact information

**Created:** 2025-04-14T10:53:56.000Z
**Updated:** 2025-04-14T11:37:57.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| postUrl | No description |
| customer_firstName | No description |
| customer_state | No description |
| customer_lastName | No description |
| street_address | No description |
| customer_city | No description |
| customer_phoneNumber | No description |
| customer_email | No description |
| zip_code | No description |
| authToken | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| customerId | No description |
| fullResponse | No description |
| locationId | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables from args
  const { 
    postUrl,
    authToken,
    customer_firstName, 
    customer_lastName, 
    customer_phoneNumber, 
    customer_email, 
    street_address, 
    unit, 
    customer_city, 
    customer_state, 
    zip_code 
  } = args.inputVars;

  // Validate that the required input variables are provided
  if (!postUrl || !authToken || !customer_firstName || !customer_lastName || 
      !customer_phoneNumber || !street_address || !customer_city || 
      !customer_state || !zip_code) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variables for this function" 
        } 
      }]
    };
  }

  // Prepare the request payload
  const payload = {
    city: customer_city,
    country: "USA", // Always USA as specified
    email: customer_email || "", // Optional
    firstName: customer_firstName,
    lastName: customer_lastName,
    latitude: 0, // Always 0 as specified
    longitude: 0, // Always 0 as specified
    phone: customer_phoneNumber,
    stateAbbr: customer_state,
    street: street_address,
    unit: unit || "", // Optional
    zip: zip_code
  };

  // Configure the fetch request with the bearer token
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify(payload)
  };

  try {
    // Make the API call
    const response = await fetch(postUrl, config);

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Extract the JSON body from the response
    const responseBody = response.json;

    // Store the full response for debugging
    const fullResponseString = JSON.stringify(responseBody);
    
    // Add a debug trace for the full response
    const debugTrace = [
      { 
        type: "debug", 
        payload: { 
          message: `Full API Response: ${fullResponseString}` 
        } 
      }
    ];

    // Based on the known response structure, extract customerId and locationId
    if (responseBody.status === "success" && responseBody.data) {
      const customerId = responseBody.data.customerId;
      const locationId = responseBody.data.locationId;
      
      if (!customerId) {
        return {
          outputVars: { 
            fullResponse: fullResponseString
          },
          next: { path: 'error' },
          trace: [
            ...debugTrace,
            { 
              type: "debug", 
              payload: { 
                message: "Could not extract customer ID from the response" 
              } 
            }
          ]
        };
      }

      // Success case - we found both IDs
      return {
        outputVars: { 
          customerId: customerId.toString(),
          locationId: locationId ? locationId.toString() : "",
          fullResponse: fullResponseString
        },
        next: { path: 'success' },
        trace: [
          ...debugTrace,
          { 
            type: "debug", 
            payload: { 
              message: `Customer created successfully. Customer ID: ${customerId}, Location ID: ${locationId}` 
            } 
          }
        ]
      };
    } else {
      // The response doesn't match the expected structure
      return {
        outputVars: { 
          fullResponse: fullResponseString
        },
        next: { path: 'error' },
        trace: [
          ...debugTrace,
          { 
            type: "debug", 
            payload: { 
              message: "Unexpected response structure from the API" 
            } 
          }
        ]
      };
    }
  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [
        { 
          type: "debug", 
          payload: { 
            message: `Error creating customer: ${error.message}` 
          } 
        }
      ]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['67fce9a958073caa3660972f', '67fce9af58073caa36609734']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
