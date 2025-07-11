# CONFIRM_ALL_VARIABLES

**Function ID:** 67ff9cee20161f72ed1620a0

**Description:** No description provided

**Created:** 2025-04-16T12:05:02.000Z
**Updated:** 2025-05-02T13:58:08.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| existing_customer | No description |
| job_type | No description |
| street_address | No description |
| customer_city | No description |
| customer_state | No description |
| zip_code | No description |
| customer_firstName | No description |
| customer_lastName | No description |
| customer_phoneNumber | No description |
| appointment_time | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| system_message | No description |
| missing_fields | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // List of all required variables
  const requiredVariables = [
    'existing_customer',
    'job_type',
    'street_address',
    'customer_city',
    'customer_state',
    'zip_code',
    'customer_firstName',
    'customer_lastName',
    'customer_phoneNumber',
    'appointment_time',
  ];
  
  // Get all input variables
  const inputVars = args.inputVars;
  
  // Array to store missing variables
  const missingVariables = [];
  
  // Check each required variable
  for (const varName of requiredVariables) {
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
  
  // No special check for termsOfService length - just ensure it's not empty like the other fields
  
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
    
    // Handle specific variable needs with custom messages
    const customMessages = {
      last_utterance: 'The last message from the customer is missing.'
    };
    
    // Create the system message
    let systemMessage = `Please collect the following information to continue: ${formattedMissingVars}.`;
    
    // Add any custom messages
    missingVariables.forEach(varName => {
      if (customMessages[varName]) {
        systemMessage += ` ${customMessages[varName]}`;
      }
    });
    
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

**Path Order:** ['67ff9dc720161f72ed1620db', '67ff9dcd20161f72ed1620de']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
