# LOOKUP_CUSTOMER_INFO

**Function ID:** 67e680d2462c9b9a1ef27ef5

**Description:** lookup previous customer info with customer's provided phone number

**Created:** 2025-03-28T10:58:26.000Z
**Updated:** 2025-04-16T11:47:39.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| phoneNumber | No description |
| bearerToken | No description |
| apiBaseUrl | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| displayAddress | No description |
| zip | No description |
| customerId | No description |
| locationId | No description |
| street | No description |
| unit | No description |
| city | No description |
| state | No description |
| name | No description |
| singleCustomer | No description |
| customers | No description |
| customerCount | No description |
| invalid_phone | No description |
| phone_number | No description |
| system_message | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  // Extract the phone number, bearer token, and API base URL from input variables
  const { phoneNumber, bearerToken, apiBaseUrl } = args.inputVars;
  
  // Validate that required inputs are provided
  if (!phoneNumber) {
    return {
      next: { path: 'error' },
      outputVars: {
        system_message: "Missing required input: phone number"
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variable: phoneNumber" 
        } 
      }]
    };
  }
  
  if (!bearerToken) {
    return {
      next: { path: 'error' },
      outputVars: {
        system_message: "Missing required input: authentication token"
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variable: bearerToken" 
        } 
      }]
    };
  }
  
  if (!apiBaseUrl) {
    return {
      next: { path: 'error' },
      outputVars: {
        system_message: "Missing required input: API base URL"
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: "Missing required input variable: apiBaseUrl" 
        } 
      }]
    };
  }
  
  // Validate phone number format
  if (!isValidPhoneNumber(phoneNumber)) {
    return {
      next: { path: 'invalid_phone' },
      outputVars: {
        system_message: `The phone number ${phoneNumber} is not valid. Please provide a US/Canadian phone number with 10 digits or 11 digits starting with '1'.`,
        invalid_phone: phoneNumber
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Invalid phone number format: ${phoneNumber}. Phone number must be a valid US/Canadian format: 10 digits or 11 digits starting with '1'.` 
        } 
      }]
    };
  }
  
  try {
    // Format phone number (remove non-numeric characters)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Create the API URL by combining the base URL with the formatted phone
    const url = `${apiBaseUrl}/${formattedPhone}`;
    
    // Make the API call with Bearer token authentication
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Map the fetch request response
    const data = response.json;
    
    // Log the full response for debugging
    console.log(`API Response: ${JSON.stringify(data)}`);
    
    // Check if we got valid results
    if (!data || data.status !== "success") {
      return {
        next: { path: 'error' },
        outputVars: {
          system_message: `Error looking up customer information for ${phoneNumber}`,
          invalid_phone: phoneNumber
        },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `API Error for phone number: ${phoneNumber}. Status: ${data?.status || 'unknown'}` 
          } 
        }]
      };
    }
    
    // Check if data object exists but is empty or null
    if (!data.data || Object.keys(data.data).length === 0) {
      return {
        next: { path: 'empty_results' },
        outputVars: {
          system_message: `No customer records found for phone number ${phoneNumber}`,
          phone_number: phoneNumber
        },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `API returned success but no customer data for phone number: ${phoneNumber}` 
          } 
        }]
      };
    }
    
    // Get customer IDs from the data object
    const customerIds = Object.keys(data.data);
    
    // If no customers found (this is a double-check, should be caught above)
    if (customerIds.length === 0) {
      return {
        next: { path: 'empty_results' },
        outputVars: {
          system_message: `No customer records found for phone number ${phoneNumber}`,
          phone_number: phoneNumber
        },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `No customer data found for phone number: ${phoneNumber}` 
          } 
        }]
      };
    }
    
    // In the single_customer path handling
    if (customerIds.length === 1) {
      const customerId = customerIds[0];
      const customer = data.data[customerId];
      
      // Check if customer has locations
      if (!customer.locations || customer.locations.length === 0) {
        return {
          next: { path: 'no_locations' },
          outputVars: {
            system_message: `Customer found but has no associated addresses`,
            customer_id: customerId,
            customer_name: customer.name || "",
            phone_number: phoneNumber
          },
          trace: [{ 
            type: "debug", 
            payload: { 
              message: `Customer found but has no locations: ${customerId}` 
            } 
          }]
        };
      }
      
      // Get the first location
      const location = customer.locations[0];
      const address = location.address;
      
      // Create masked display address (similar to multiple customers case)
      const streetParts = (address.street || "").split(' ');
      let maskedStreet = "";
      
      if (streetParts.length > 1) {
        // If first part is a number, replace with XXX
        if (!isNaN(parseInt(streetParts[0]))) {
          maskedStreet = "XXX " + streetParts.slice(1).join(' ');
        } else {
          maskedStreet = streetParts.join(' ');
        }
      } else {
        maskedStreet = "XXX";
      }
      
      const displayAddress = `${maskedStreet}${address.unit ? ', ' + address.unit : ''}`;
      
      // Return the customer information
      return {
        outputVars: { 
          customerId,
          locationId: location.locationId,
          street: address.street || "",
          unit: address.unit || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          name: customer.name || "",
          singleCustomer: "true",
          displayAddress: displayAddress,
          phone_number: phoneNumber,
          system_message: `Found customer record for ${customer.name}`
        },
        next: { path: 'single_customer' },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `Found single customer: ${customer.name}, ID: ${customerId}` 
          } 
        }]
      };
    }
    
    // Multiple customers found - prepare the data for conversation flow
    const customersArray = [];
    
    // Build an array of customer information with masked data
    customerIds.forEach(customerId => {
      const customer = data.data[customerId];
      
      // Only include customers with locations
      if (customer.locations && customer.locations.length > 0) {
        const location = customer.locations[0];
        const address = location.address;
        
        // Extract street name without numbers
        const streetParts = (address.street || "").split(' ');
        let maskedStreet = "";
        
        if (streetParts.length > 1) {
          // If first part is a number, replace with XXX
          if (!isNaN(parseInt(streetParts[0]))) {
            maskedStreet = "XXX " + streetParts.slice(1).join(' ');
          } else {
            maskedStreet = streetParts.join(' ');
          }
        } else {
          maskedStreet = "XXX";
        }
        
        customersArray.push({
          customerId,
          locationId: location.locationId,
          street: address.street || "", // Keep original for backend use
          unit: address.unit || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          name: customer.name || "",
          // New field for display purposes
          displayAddress: `${maskedStreet}${address.unit ? ', Unit ' + address.unit : ''}`,
          // Keep full address for backend, but don't display it
          fullAddress: `${address.street || ""} ${address.unit ? address.unit + ', ' : ''}${address.city || ""}, ${address.state || ""} ${address.zip || ""}`
        });
      }
    });
    
    // If no valid customers with locations found
    if (customersArray.length === 0) {
      return {
        next: { path: 'no_locations' },
        outputVars: {
          system_message: "We found customers matching your phone number, but none have valid address information",
          phone_number: phoneNumber,
          customer_count: customerIds.length.toString()
        },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `Customers found but none have valid locations` 
          } 
        }]
      };
    }
    
    // If only one valid customer found after filtering
    if (customersArray.length === 1) {
      const customer = customersArray[0];
      
      return {
        outputVars: { 
          customerId: customer.customerId,
          locationId: customer.locationId,
          street: customer.street,
          unit: customer.unit,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          name: customer.name,
          singleCustomer: "true",
          phone_number: phoneNumber,
          displayAddress: customer.displayAddress,
          system_message: `Found customer record for ${customer.name}`
        },
        next: { path: 'single_customer' },
        trace: [{ 
          type: "debug", 
          payload: { 
            message: `Found single valid customer with location: ${customer.name}, ID: ${customer.customerId}` 
          } 
        }]
      };
    }
    
    // Return multiple customers
    return {
      outputVars: { 
        customers: JSON.stringify(customersArray),
        customerCount: customersArray.length.toString(),
        displayAddress: JSON.stringify(customersArray.map(c => c.displayAddress)),
        singleCustomer: "false",
        phone_number: phoneNumber,
        system_message: `Found ${customersArray.length} customer records for this phone number`
      },
      next: { path: 'multiple_customers' },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Found ${customersArray.length} customers with valid locations` 
        } 
      }]
    };
  } catch (error) {
    // Handle any errors that occurred during the API call
    return {
      next: { path: 'error' },
      outputVars: {
        system_message: `An error occurred while looking up information for phone number ${phoneNumber}: ${error.message}`,
        phone_number: phoneNumber
      },
      trace: [{ 
        type: "debug", 
        payload: { 
          message: `Error fetching customer data: ${error.message}` 
        } 
      }]
    };
  }
  
  // Function to validate phone number format
  function isValidPhoneNumber(phone) {
    // Remove all non-numeric characters except + sign
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    
    // Remove leading + if present
    const numberOnly = cleanedPhone.startsWith('+') ? cleanedPhone.substring(1) : cleanedPhone;
    
    // Get digits only
    const digitsOnly = numberOnly.replace(/\D/g, '');
    
    // Valid cases for US/Canada only:
    // 1. 10 digits (e.g., 9736320212) - standard US/Canadian number
    // 2. 11 digits starting with 1 (e.g., 19736320212) - US/Canada with country code
    
    if (digitsOnly.length === 10) {
      // US/Canadian number without country code
      return true;
    } else if (digitsOnly.length === 11 && digitsOnly.charAt(0) === '1') {
      // US/Canadian number with country code
      return true;
    }
    
    return false;
  }
}
```

## Additional Metadata

**Path Order:** ['67e68375462c9b9a1ef28127', '67e68378462c9b9a1ef28128', '67e68391462c9b9a1ef2812c', '67e683a3462c9b9a1ef2812e', '67e6856b462c9b9a1ef282bb', '67f7dd5b7d97007d0af6ed58']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
