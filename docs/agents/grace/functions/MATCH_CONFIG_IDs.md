# MATCH_CONFIG_IDs

**Function ID:** 68010de1c6b7a40f4b2baa7e

**Description:** match necessary config IDs based on user's selection of job type

**Created:** 2025-04-17T14:19:14.000Z
**Updated:** 2025-04-25T18:13:37.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| jobType | No description |
| doorestimateConfig | No description |
| openersConfig | No description |
| repairConfig | No description |
| existing_customer | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| serviceTitanIds | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // --- Configuration ---
  const successPath = "success";
  const errorPath = "error";
  const VALID_JOB_TYPES = ["repair", "door-estimate", "openers"];

  // --- Input Validation ---
  const { jobType, repairConfig, doorestimateConfig, openersConfig, existing_customer } = args.inputVars;
  const trace = [];

  trace.push({ type: "debug", payload: { message: "Starting ExtractJobConfig function." } });
  
  // Debug input variables
  trace.push({ type: "debug", payload: { message: `Input jobType: ${jobType}` } });
  trace.push({ type: "debug", payload: { message: `Input existing_customer: ${existing_customer}` } });
  trace.push({ type: "debug", payload: { message: `repairConfig type: ${typeof repairConfig}` } });
  
  // Check if config variables are already objects and not strings
  let parsedRepairConfig = typeof repairConfig === 'object' ? repairConfig : {};
  let parsedDoorestimateConfig = typeof doorestimateConfig === 'object' ? doorestimateConfig : {};
  let parsedOpenersConfig = typeof openersConfig === 'object' ? openersConfig : {};

  // Check for required inputs and validate job type
  if (!jobType) {
    trace.push({ type: "debug", payload: { message: "Error: 'jobType' input variable is missing." } });
    return {
      next: { path: errorPath },
      trace,
      outputVars: {
        serviceTitanIds: JSON.stringify({
          businessUnitId: "",
          campaignId: "",
          jobTypeId: "",
          s2fTagId: "",
          s2fChatTagId: "",
          defaultTagId: "",
          repeatCustomerReplaceDefaultTagId: ""
        })
      }
    };
  }

  // Validate that job type is one of the allowed values
  const normalizedJobType = jobType.toLowerCase().trim();
  if (!VALID_JOB_TYPES.includes(normalizedJobType)) {
    trace.push({ type: "debug", payload: { message: `Error: Invalid job type '${jobType}'. Must be one of: ${VALID_JOB_TYPES.join(", ")}` } });
    return {
      next: { path: errorPath },
      trace,
      outputVars: {
        serviceTitanIds: JSON.stringify({
          businessUnitId: "",
          campaignId: "",
          jobTypeId: "",
          s2fTagId: "",
          s2fChatTagId: "",
          defaultTagId: "",
          repeatCustomerReplaceDefaultTagId: ""
        })
      }
    };
  }

  // Parse the config objects if they are strings
  try {
    if (typeof repairConfig === 'string' && repairConfig) {
      // Log the string for debugging
      trace.push({ type: "debug", payload: { message: `repairConfig string: ${repairConfig.substring(0, 100)}...` } });
      
      // Try to remove any potential double-escaped characters
      const cleanedConfig = repairConfig.replace(/\\\\\\\"/g, '\"').replace(/\\\\\\\\/g, '\\\\');
      
      try {
        parsedRepairConfig = JSON.parse(cleanedConfig);
      } catch (innerError) {
        // If that fails, try the original string
        parsedRepairConfig = JSON.parse(repairConfig);
      }
    }
    
    if (typeof doorestimateConfig === 'string' && doorestimateConfig) {
      // Try to remove any potential double-escaped characters
      const cleanedConfig = doorestimateConfig.replace(/\\\\\\\"/g, '\"').replace(/\\\\\\\\/g, '\\\\');
      
      try {
        parsedDoorestimateConfig = JSON.parse(cleanedConfig);
      } catch (innerError) {
        // If that fails, try the original string
        parsedDoorestimateConfig = JSON.parse(doorestimateConfig);
      }
    }
    
    if (typeof openersConfig === 'string' && openersConfig) {
      // Try to remove any potential double-escaped characters
      const cleanedConfig = openersConfig.replace(/\\\\\\\"/g, '\"').replace(/\\\\\\\\/g, '\\\\');
      
      try {
        parsedOpenersConfig = JSON.parse(cleanedConfig);
      } catch (innerError) {
        // If that fails, try the original string
        parsedOpenersConfig = JSON.parse(openersConfig);
      }
    }
    
    // Log the parsed objects for debugging
    trace.push({ type: "debug", payload: { message: `Parsed repairConfig keys: ${Object.keys(parsedRepairConfig).join(', ')}` } });
    
  } catch (parseError) {
    trace.push({ type: "debug", payload: { message: `Error parsing config JSON: ${parseError.message}` } });
    return {
      next: { path: errorPath },
      trace,
      outputVars: {
        serviceTitanIds: JSON.stringify({
          businessUnitId: "",
          campaignId: "",
          jobTypeId: "",
          s2fTagId: "",
          s2fChatTagId: "",
          defaultTagId: "",
          repeatCustomerReplaceDefaultTagId: ""
        })
      }
    };
  }

  // Initialize result object with all possible tag types
  const serviceTitanIds = {
    businessUnitId: "",
    campaignId: "",
    jobTypeId: "",
    s2fTagId: "",
    s2fChatTagId: "",
    defaultTagId: "",
    repeatCustomerReplaceDefaultTagId: ""
  };

  // Match job type with the correct config and extract IDs
  try {
    let selectedConfig = {};
    
    // Determine which config to use based on job type
    switch (normalizedJobType) {
      case "repair":
        selectedConfig = parsedRepairConfig;
        trace.push({ type: "debug", payload: { message: "Using repair configuration." } });
        break;
      case "door-estimate":
        selectedConfig = parsedDoorestimateConfig;
        trace.push({ type: "debug", payload: { message: "Using door-estimate configuration." } });
        break;
      case "openers":
        selectedConfig = parsedOpenersConfig;
        trace.push({ type: "debug", payload: { message: "Using openers configuration." } });
        break;
      // No default case needed since we've already validated job type
    }
    
    // Debug selected config
    trace.push({ type: "debug", payload: { message: `Selected config keys: ${Object.keys(selectedConfig).join(', ')}` } });
    
    // Extract IDs from the selected config
    if (selectedConfig && Object.keys(selectedConfig).length > 0) {
      serviceTitanIds.businessUnitId = selectedConfig.businessUnitId || "";
      serviceTitanIds.campaignId = selectedConfig.campaignId || "";
      
      // Extract tag type IDs from the nested structure
      if (selectedConfig.tagTypeIds) {
        // Always include s2f and s2FChat tags
        serviceTitanIds.s2fTagId = selectedConfig.tagTypeIds.s2f || "";
        serviceTitanIds.s2fChatTagId = selectedConfig.tagTypeIds.s2FChat || "";
        
        // Include default tag if it has a value
        if (selectedConfig.tagTypeIds.default) {
          serviceTitanIds.defaultTagId = selectedConfig.tagTypeIds.default;
        }
        
        // Include repeatCustomerReplaceDefault tag if customer is existing
        const isExistingCustomer = existing_customer === "true";
        if (isExistingCustomer && selectedConfig.tagTypeIds.repeatCustomerReplaceDefault) {
          serviceTitanIds.repeatCustomerReplaceDefaultTagId = selectedConfig.tagTypeIds.repeatCustomerReplaceDefault;
          trace.push({ type: "debug", payload: { message: `Using repeatCustomerReplaceDefault tag: ${serviceTitanIds.repeatCustomerReplaceDefaultTagId}` } });
        }
      }
      
      // Use the appropriate job type ID based on customer status
      const isExistingCustomer = existing_customer === "true";
      
      // Extract job type ID from the nested structure
      if (selectedConfig.jobTypeIds) {
        if (isExistingCustomer) {
          serviceTitanIds.jobTypeId = selectedConfig.jobTypeIds.repeatCustomer || "";
          trace.push({ type: "debug", payload: { message: `Using repeat customer job type ID: ${serviceTitanIds.jobTypeId}` } });
        } else {
          serviceTitanIds.jobTypeId = selectedConfig.jobTypeIds.default || "";
          trace.push({ type: "debug", payload: { message: `Using default job type ID: ${serviceTitanIds.jobTypeId}` } });
        }
      }
      
      trace.push({ type: "debug", payload: { message: "Successfully extracted IDs from configuration." } });
      trace.push({ type: "debug", payload: { message: `Final serviceTitanIds: ${JSON.stringify(serviceTitanIds)}` } });
      
    } else {
      trace.push({ type: "debug", payload: { message: "Selected configuration is empty or invalid." } });
      return {
        next: { path: errorPath },
        trace,
        outputVars: {
          serviceTitanIds: JSON.stringify(serviceTitanIds)
        }
      };
    }
  } catch (error) {
    trace.push({ type: "debug", payload: { message: `Error extracting IDs: ${error.message}` } });
    return {
      next: { path: errorPath },
      trace,
      outputVars: {
        serviceTitanIds: JSON.stringify(serviceTitanIds)
      }
    };
  }

  // --- Successful Return ---
  return {
    outputVars: {
      serviceTitanIds: JSON.stringify(serviceTitanIds)
    },
    next: { path: successPath },
    trace
  };
}
```

## Additional Metadata

**Path Order:** ['68010e5dc6b7a40f4b2baaa9', '68010e62c6b7a40f4b2baab6']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
