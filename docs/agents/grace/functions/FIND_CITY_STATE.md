# FIND_CITY_STATE

**Function ID:** 67e677d1462c9b9a1ef277d1

**Description:** looks up city and state from already known customer zip code

**Created:** 2025-03-28T10:20:02.000Z
**Updated:** 2025-03-28T10:40:15.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| zipCode | No description |
| apiKey | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| city | No description |
| state | No description |
| lat | No description |
| fullLocation | No description |
| lng | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract the zipCode and API key from input variables
  const { zipCode, apiKey } = args.inputVars;
  
  // Validate that required inputs are provided
  if (!zipCode) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variable: zipCode" 
        } 
      }]
    };
  }
  
  if (!apiKey) {
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variable: apiKey" 
        } 
      }]
    };
  }
  
  try {
    // Format and validate the zip code
    const formattedZip = zipCode.toString().padStart(5, '0').substring(0, 5);
    
    // Create the Google Geocoding API URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedZip}&key=${apiKey}`;
    
    // Make the API call
    const response = await fetch(url);
    
    // Map the fetch request response
    const data = response.json;
    
    // Log the full response for debugging
    console.log(`API Response: ${JSON.stringify(data)}`);
    
    // Check if we got valid results
    if (!data || data.status !== "OK" || !data.results || data.results.length === 0) {
      return {
        next: { path: 'not_found' },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `No location data found for zip code: ${zipCode} (Status: ${data?.status || 'Unknown'})` 
          } 
        }]
      };
    }
    
    // Extract the first result (most relevant)
    const result = data.results[0];
    
    // Extract address components
    let city = "";
    let state = "";
    
    // Loop through address components to find city and state
    for (const component of result.address_components) {
      if (component.types.includes("locality")) {
        city = component.long_name;
      } else if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name; // Using short_name for state abbreviation (e.g., CA, NY)
      }
    }
    
    // Extract coordinates
    const lat = result.geometry.location.lat;
    const lng = result.geometry.location.lng;
    
    // Return the successful result with output variables
    return {
      outputVars: { 
        city,
        state,
        lat: lat.toString(),
        lng: lng.toString(),
        fullLocation: `${city}, ${state}`
      },
      next: { path: 'success' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Successfully retrieved location: ${city}, ${state} (${lat}, ${lng}) for zip code ${zipCode}` 
        } 
      }]
    };
  } catch (error) {
    // Handle any errors that occurred during the API call
    return {
      next: { path: 'error' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error fetching location data: ${error.message}` 
        } 
      }]
    };
  }
}
```

## Additional Metadata

**Path Order:** ['67e6782d462c9b9a1ef27826', '67e67834462c9b9a1ef27828', '67e67861462c9b9a1ef2784c']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
