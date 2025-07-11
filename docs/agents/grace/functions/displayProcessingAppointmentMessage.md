# displayProcessingAppointmentMessage

**Function ID:** 680bddd9c1e2d8fd2042bd2e

**Description:** No description provided

**Created:** 2025-04-25T19:09:14.000Z
**Updated:** 2025-04-25T19:22:30.000Z

## Input Parameters

No input parameters defined.


## Output Parameters

No output parameters defined.


## JavaScript Code

```javascript
export default async function main(args) {
  // Return a text trace with our message
  return {
    next: { path: 'success' }, // Use the success path
    trace: [
      {
        type: "text",
        payload: {
          message: "Just a second while I lock in your appointment time.  This could take a few seconds.  Thank you for your patience."
        }
      }
    ]
  };
}
}
```

## Additional Metadata

**Path Order:** ['680bde10c1e2d8fd2042bd65']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
