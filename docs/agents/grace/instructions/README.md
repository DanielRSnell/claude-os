# Grace Agent Instructions - Extraction Summary

This directory contains the extracted agent instructions from the Voiceflow Grace V2 project file dated 2025-07-11.

## Extraction Summary

**Total Agents Found:** 8

### Agent Overview

1. **PD Router** (`pd-router.md`)
   - **ID:** 67dfd9ce8ef7fa02101c7333
   - **Role:** Primary routing agent for Precision Door customer calls
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Market-specific knowledge base access, conversation routing, spam detection

2. **Booking Agent** (`booking-agent.md`)
   - **ID:** 67dfe2ad8ef7fa02101c77b9
   - **Role:** Handles appointment booking process
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Zip code validation, availability checking, appointment scheduling

3. **Customer Information Collector** (`customer-information-collector.md`)
   - **ID:** 67e67605462c9b9a1ef2766f
   - **Role:** Collects customer details for new customers
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Personal information collection, address verification

4. **Handoff Agent** (`handoff-agent.md`)
   - **ID:** 67eeaf8a53654e3a5faab96d
   - **Role:** Manages handoffs between agents and external systems
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Context preservation, seamless transitions

5. **Customer Lookup** (`customer-lookup.md`)
   - **ID:** 67eeb50853654e3a5faabeb0
   - **Role:** Identifies existing customers in the system
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Customer database search, profile matching

6. **Confirm Booking** (`confirm-booking.md`)
   - **ID:** 67f4146b6e58086dfacce2aa
   - **Role:** Final booking confirmation and details verification
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Appointment confirmation, final details review

7. **PD Router Gerkhin Test** (`pd-router-gerkhin-test.md`)
   - **ID:** 6862870e40186d84988259db
   - **Role:** Test version of the PD Router
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Testing configuration for routing logic

8. **Booking Agent Gerkhin Test** (`booking-agent-gerkhin-test.md`)
   - **ID:** 68628d6c40186d8498825cb1
   - **Role:** Test version of the Booking Agent
   - **Model:** gpt-4o (8000 max tokens)
   - **Key Features:** Testing configuration for booking logic

## Common Configuration

All agents share these common characteristics:
- **Model:** GPT-4o with 8000 token limit
- **Platform:** Voiceflow
- **Industry:** Garage door services (Precision Door)
- **Interaction Mode:** Phone-based customer service

## Function Integrations

The agents utilize several key functions:
- **ZIP_CODE_LOOKUP:** Service area verification
- **CHECK_AVAILABILITY:** Appointment time retrieval
- **CUSTOMER_LOOKUP:** Database search functionality
- **CONFIRM_REQUIRED_VARIABLES:** Data validation

## Knowledge Base Usage

Most agents have access to market-specific knowledge bases containing:
- Hours of operation
- Service areas
- Services provided
- Warranty policies
- Appointment procedures
- Pricing information

## Exit Conditions

Exit conditions are primarily handled through:
- Path routing configurations
- Spam detection mechanisms
- Handoff triggers to human agents
- Error handling for failed function calls

## Files Created

```
/Users/broke/umbral/umbral/docs/agents/grace/instructions/
├── booking-agent-gerkhin-test.md
├── booking-agent.md
├── confirm-booking.md
├── customer-information-collector.md
├── customer-lookup.md
├── handoff-agent.md
├── pd-router-gerkhin-test.md
├── pd-router.md
└── README.md
```

## Notes

- All agents are configured for phone-based interactions
- Market-specific restrictions are enforced to ensure relevant information delivery
- Customer service phone number (833) 511-8001 is provided as fallback across agents
- The system follows a structured flow: Router → Booking → Information Collection → Confirmation

## Extraction Date

Extracted on: 2025-07-11 from Grace_V2-2025-07-11_15-00.vf