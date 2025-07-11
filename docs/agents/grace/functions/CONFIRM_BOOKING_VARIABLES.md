# CONFIRM_BOOKING_VARIABLES

**Function ID:** 680ed99ac1e2d8fd20447423

**Description:** No description provided

**Created:** 2025-04-28T01:27:55.000Z
**Updated:** 2025-05-02T13:58:31.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| zip_code | No description |
| appointment_time | No description |
| termsOfService | No description |
| baseRowId | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| system_message | No description |
| missing_fields | No description |
| cleaned_baseRowId | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // List of all required variables
  const requiredVariables = [
    'zip_code',
    'appointment_time',
    'termsOfService',
    'baseRowId'
  ];
  
  // Get all input variables
  const inputVars = args.inputVars;
  
  // Clean up baseRowId to extract only integers
  let baseRowIdValid = false;
  if (inputVars.hasOwnProperty('baseRowId') && inputVars.baseRowId !== undefined && inputVars.baseRowId !== null) {
    // Extract only numbers from the baseRowId variable
    const match = String(inputVars.baseRowId).match(/\d+/);
    if (match) {
      // Update the input variable with the extracted integer
      inputVars.baseRowId = match[0];
      baseRowIdValid = true;
    }
  }
  
  // Array to store missing variables
  const missingVariables = [];
  
  // Check each required variable
  for (const varName of requiredVariables) {
    // Skip baseRowId as we handle it separately
    if (varName === 'baseRowId') continue;
    
    // Check if variable is missing, empty, undefined, or zero
    if (
      !inputVars.hasOwnProperty(varName) || 
      inputVars[varName] === undefined || 
      inputVars[varName] === null || 
      inputVars[varName] === '' || 
      inputVars[varName] === 0 || 
      inputVars[varName] === '0'
    ) {
      missingVariables.push(varName);
    }
  }
  
  // Add baseRowId to missing variables if not valid
  if (!baseRowIdValid) {
    missingVariables.push('baseRowId');
  }
  
  // If there are missing variables, return them in the system_message
  if (missingVariables.length > 0) {
    // Format the missing variables into a human-readable message
    let formattedMissingVars = missingVariables.map(varName => {
      // Convert variable names to more readable format
      const readableName = varName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/^\w/, c => c.toUpperCase());
      
      return readableName;
    }).join(', ');
    
    // Create the system message
    let systemMessage = `Please collect the following information to continue: ${formattedMissingVars}.`;
    
    // Return error path with missing variables and system message
    return {
      next: { path: 'missing_variables' },
      outputVars: {
        system_message: systemMessage,
        missing_fields: JSON.stringify(missingVariables)
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Missing variables detected: ${missingVariables.join(', ')}` 
        } 
      }]
    };
  }
  
  // If all variables are present and valid, return success
  return {
    next: { path: 'success' },
    outputVars: {
      system_message: "All required variables have been collected successfully, please path to the next node.",
      cleaned_baseRowId: inputVars.baseRowId
    },
    trace: [{ 
      type: "debug", 
      payload: { 
        message: "All required variables validated." 
      } 
    }]
  };
}
```

## Additional Metadata

**Path Order:** ['680ed9ccc1e2d8fd20447424', '680ed9cfc1e2d8fd20447425']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
