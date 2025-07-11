# ZIP_CODE_LOOKUP

**Function ID:** 67f7b7a2f96f2e4fde2ccdd3

**Description:** looks up zip code of customer to verify service location

**Created:** 2025-04-10T12:20:51.000Z
**Updated:** 2025-04-10T13:29:17.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| userZipcode | zip code provided by customer |
| syncApiEndpoint | No description |
| serviceAreaZipCodes | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| inServiceArea | No description |
| alternateLocation | No description |
| alternatePhone | No description |
| alternateWebsite | No description |
| zipCode | No description |
| message | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract input variables
  const { userZipcode, serviceAreaZipCodes, syncApiEndpoint } = args.inputVars;
  
  // Initialize debug traces array
  const traces = [];
  
  // Add initial debug trace
  traces.push({
    type: "debug",
    payload: {
      message: "Starting zipcode validation function"
    }
  });
  
  // Validate input variables
  if (!userZipcode) {
    return {
      next: { path: 'error' },
      trace: [
        ...traces,
        { 
          type: "debug", 
          payload: { 
            message: "Missing required input variable: userZipcode" 
          } 
        }
      ]
    };
  }
  
  // Clean up the user zipcode (trim whitespace, standardize format)
  const cleanUserZipcode = userZipcode.trim();
  
  // Validate zipcode format - must be 5 digits
  const zipcodeRegex = /^\d{5}$/;
  if (!zipcodeRegex.test(cleanUserZipcode)) {
    return {
      next: { path: 'invalid_zipcode' },
      outputVars: {
        isValidZipcode: false,
        message: `Invalid zip code format: ${cleanUserZipcode}. Please provide a 5-digit zip code.`
      },
      trace: [
        ...traces,
        { 
          type: "debug", 
          payload: { 
            message: `Invalid zip code format: ${cleanUserZipcode}. Must be 5 digits.` 
          } 
        }
      ]
    };
  }
  
  if (!serviceAreaZipCodes) {
    return {
      next: { path: 'error' },
      trace: [
        ...traces,
        { 
          type: "debug", 
          payload: { 
            message: "Missing required input variable: serviceAreaZipCodes" 
          } 
        }
      ]
    };
  }
  
  // Ensure we have the API endpoint for out-of-service area lookup
  if (!syncApiEndpoint) {
    traces.push({
      type: "debug",
      payload: {
        message: "Warning: Missing syncApiEndpoint for out-of-service area lookup"
      }
    });
  }
  
  try {
    // Parse the service area zip codes from JSON string to array
    const zipCodesArray = JSON.parse(serviceAreaZipCodes);
    
    traces.push({
      type: "debug",
      payload: {
        message: `Successfully parsed ${zipCodesArray.length} service area zip codes`
      }
    });
    
    // Check if the user's zipcode is in the service area
    const isInServiceArea = zipCodesArray.includes(cleanUserZipcode);
    
    traces.push({
      type: "debug",
      payload: {
        message: `Checking if ${cleanUserZipcode} is in service area: ${isInServiceArea}`
      }
    });
    
    // If the zipcode is in our service area, return success
    if (isInServiceArea) {
      return {
        outputVars: {
          isValidZipcode: true,
          inServiceArea: true,
          zipCode: cleanUserZipcode,
          message: `Zip code ${cleanUserZipcode} is in our service area.`,
          alternateLocation: '',
          alternatePhone: '',
          alternateWebsite: ''
        },
        next: { path: 'in_service_area' },
        trace: traces
      };
    }
    
    // If the zipcode is NOT in our service area and we have an API endpoint, 
    // call the sync API to get alternate location info
    if (syncApiEndpoint) {
      try {
        // Build API URL with the zipcode
        const apiUrl = `${syncApiEndpoint}${cleanUserZipcode}&RequireAddressOnPartialPostalCode=false`;
        
        traces.push({
          type: "debug",
          payload: {
            message: `Calling sync API at: ${apiUrl}`
          }
        });
        
        // Call the API
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`API response error: ${response.status}`);
        }
        
        // Parse the response
        const responseData = response.json;
        
        traces.push({
          type: "debug",
          payload: {
            message: `Received API response: ${JSON.stringify(responseData)}`
          }
        });
        
        // Extract location information
        let location = '';
        let phoneNumber = '';
        let website = '';
        
        // Try to find Precision Door in the response data
        if (responseData) {
          
          let precisionDoor = null;
          
          if (Array.isArray(responseData)) {
            // Find the Precision Garage Door entry in the array
            precisionDoor = responseData.find(item => 
              item.doingBusinessAs && item.doingBusinessAs.includes("Precision Garage Door")
            );
          } else if (responseData.doingBusinessAs && 
                     responseData.doingBusinessAs.includes("Precision Garage Door")) {
            precisionDoor = responseData;
          }
          
          if (precisionDoor) {
            location = precisionDoor.doingBusinessAs || '';
            phoneNumber = precisionDoor.websiteTracking || '';
            website = precisionDoor.locationWebsiteUrl || '';
          }
        }
        
        // Return the out of service area response with alternate location info
        return {
          outputVars: {
            isValidZipcode: true,
            inServiceArea: false,
            zipCode: cleanUserZipcode,
            message: `Zip code ${cleanUserZipcode} is out of our service area.`,
            alternateLocation: location,
            alternatePhone: phoneNumber,
            alternateWebsite: website
          },
          next: { path: 'out_of_service_area' },
          trace: traces
        };
        
      } catch (apiError) {
        traces.push({
          type: "debug",
          payload: {
            message: `API Error: ${apiError.message}`
          }
        });
        
        // Return out of service area without alternate location info
        return {
          outputVars: {
            isValidZipcode: true,
            inServiceArea: false,
            zipCode: cleanUserZipcode,
            message: `Zip code ${cleanUserZipcode} is out of our service area.`,
            alternateLocation: '',
            alternatePhone: '',
            alternateWebsite: ''
          },
          next: { path: 'out_of_service_area' },
          trace: traces
        };
      }
    } else {
      // No API endpoint provided, just return out of service area
      return {
        outputVars: {
          isValidZipcode: true,
          inServiceArea: false,
          zipCode: cleanUserZipcode,
          message: `Zip code ${cleanUserZipcode} is out of our service area.`,
          alternateLocation: '',
          alternatePhone: '',
          alternateWebsite: ''
        },
        next: { path: 'out_of_service_area' },
        trace: traces
      };
    }
    
  } catch (error) {
    return {
      next: { path: 'error' },
      trace: [
        ...traces,
        { 
          type: "debug", 
          payload: { 
            message: `Error processing zipcode check: ${error.message}` 
          } 
        }
      ]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['67f7b7a2f96f2e4fde2ccdd4', '67f7b7a2f96f2e4fde2ccdd5', '67f7b7a2f96f2e4fde2ccdd6', '67f7c73867832ee5b5451c09']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
