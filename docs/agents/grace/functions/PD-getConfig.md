# PD-getConfig

**Function ID:** 67f6aaf867832ee5b54465a7

**Description:** get terms of service to bring into the conversation

**Created:** 2025-04-09T17:14:33.000Z
**Updated:** 2025-06-30T12:09:51.000Z

## Input Parameters

| Parameter | Description |
|-----------|-------------|
| s2fId | No description |
| bearerToken | No description |


## Output Parameters

| Parameter | Description |
|-----------|-------------|
| serviceAreaZipCodes | No description |
| timezone_offset | No description |
| jobTypeConfigs | No description |
| jobTypeTermsOfService | No description |
| jobTypeDetails | No description |
| availableJobTypes | No description |


## JavaScript Code

```javascript
export default async function main(args) {
  /* ------------------------------------------------------------------ */
  /* 0) BASIC SET-UP & INPUT CHECKS                                     */
  /* ------------------------------------------------------------------ */
  const successPath = "success";
  const errorPath   = "error";
  const { s2fId, bearerToken } = args.inputVars;
  const trace = [];

  if (!s2fId) {
    trace.push({ type:"debug", payload:{ message:"Error: 's2fId' input variable is missing." }});
    return {
      next:{ path:errorPath },
      trace,
      outputVars:{
        serviceAreaZipCodes:"[]",
        jobTypeConfigs:"{}",
        jobTypeTermsOfService:"{}",
        available_jobType:"{}",
        timezone_offset:0
      }
    };
  }

  if (!bearerToken) {
    trace.push({ type:"debug", payload:{ message:"Warning: 'bearerToken' is missing; proceeding without Authorization header." }});
  }

  /* shared headers */
  const requestConfig = {
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      ...(bearerToken && { Authorization:`Bearer ${bearerToken}` })
    }
  };

  /* ------------------------------------------------------------------ */
  /* 1) MAIN EXECUTION                                                  */
  /* ------------------------------------------------------------------ */
  try {

    /* ---------- 1A. GET MARKET CONFIG ---------- */
    const configEndpoint = `https://api.s2f.tech/api/v2/market/${s2fId}/config`;
    trace.push({ type:"debug", payload:{ message:`Fetching CONFIG: ${configEndpoint}` }});
    const cfgRes = await fetch(configEndpoint, requestConfig);

    if (!cfgRes.ok) {
      const txt = await cfgRes.text();
      throw new Error(`Config HTTP ${cfgRes.status}: ${txt}`);
    }

    const cfgRaw = cfgRes.json;                 // ← .json is already parsed
    const data   = Array.isArray(cfgRaw) ? cfgRaw[0] : cfgRaw;

    /* ---------- 1B. INITIALISE WORKING VARS ---------- */
    let jobTypeConfigs        = {};
    let jobTypeTermsOfService = {};
    let available_jobType     = {};
    let timezone_offset       = 0;

    /* ------------------------------------------------------------------ */
    /* 2) TIMEZONE OFFSET EXTRACTION (same logic, using `data`)            */
    /* ------------------------------------------------------------------ */
    try {
      const isInDST = (d) => {
        const y = d.getFullYear();
        const dstStart = new Date(y, 2, 1);  dstStart.setDate(dstStart.getDate() + (14 - dstStart.getDay()) % 7);
        const dstEnd   = new Date(y,10, 1);  dstEnd.setDate(dstEnd.getDate() + ( 7 - dstEnd.getDay()) % 7);
        return d >= dstStart && d < dstEnd;
      };
      const now    = new Date();
      const isDST  = isInDST(now);

      if (data.time_zone_id) {
        const tzMap = {
          1:{ name:"Eastern",        std:-5,  dst:-4 },
          2:{ name:"Central",        std:-6,  dst:-5 },
          3:{ name:"Mountain",       std:-7,  dst:-6 },
          4:{ name:"Mountain (AZ)",  std:-7,  dst:-7 },
          5:{ name:"Pacific",        std:-8,  dst:-7 },
          6:{ name:"Alaska",         std:-9,  dst:-8 },
          7:{ name:"Hawaii",         std:-10, dst:-10},
          8:{ name:"Atlantic",       std:-4,  dst:-3 },
          9:{ name:"Newfoundland",   std:-3.5,dst:-2.5}
        };
        const info = tzMap[data.time_zone_id];
        timezone_offset = info
          ? (isDST && info.dst !== info.std ? info.dst : info.std)
          : 0;
        trace.push({ type:"debug", payload:{ message:`Timezone offset ${timezone_offset} from id ${data.time_zone_id}` }});
      } else if (data.time_zone?.zone) {
        const tzZoneMap = {
          "America/New_York":   isDST ? -4 : -5,
          "America/Chicago":    isDST ? -5 : -6,
          "America/Denver":     isDST ? -6 : -7,
          "America/Phoenix":    -7,
          "America/Los_Angeles":isDST ? -7 : -8,
          "America/Anchorage":  isDST ? -8 : -9,
          "America/Adak":       isDST ? -9 : -10,
          "Pacific/Honolulu":   -10,
          "America/Vancouver":  isDST ? -7 : -8,
          "America/Edmonton":   isDST ? -6 : -7,
          "America/Winnipeg":   isDST ? -5 : -6,
          "America/Toronto":    isDST ? -4 : -5,
          "America/Halifax":    isDST ? -3 : -4,
          "America/St_Johns":   isDST ? -2.5 : -3.5
        };
        timezone_offset = tzZoneMap[data.time_zone.zone] ?? 0;
        trace.push({ type:"debug", payload:{ message:`Timezone offset ${timezone_offset} from zone ${data.time_zone.zone}` }});
      }
    } catch (tzErr) {
      trace.push({ type:"debug", payload:{ message:`Timezone extraction error: ${tzErr.message}` }});
    }

    /* ------------------------------------------------------------------ */
    /* 3) JOB-TYPE / TOS EXTRACTION (unchanged, uses `data`)              */
    /* ------------------------------------------------------------------ */
    try {
      const firstStepWithCards = data?.steps?.find(s =>
        s.input_groups?.some(g => g.input_item_radio_image_cards?.length)
      );

      if (firstStepWithCards) {
        const groupWithCards = firstStepWithCards.input_groups.find(g =>
          g.input_item_radio_image_cards?.length
        );

        if (groupWithCards) {
          const cards = groupWithCards.input_item_radio_image_cards;
          trace.push({ type:"debug", payload:{ message:`Found ${cards.length} job-type cards.` }});

          cards.forEach(card => {
            if (!card.job_type || !card.text) return;

            available_jobType[card.job_type] = {
              name: card.text,
              image: card.image || "",
              terms_of_service: card.terms_of_service || "",
              terms_of_service_summary: card.terms_of_service_summary || ""
            };
            jobTypeTermsOfService[card.job_type] = card.terms_of_service || "";

            if (card.service_titan?.length) {
              const st = card.service_titan[0];
              const cfgObj = {
                businessUnitId: st.business_unit_options?.[0]?.createJobBusinessUnitId || "",
                campaignId:     st.campaign_id || "",
                jobTypeIds: {
                  default:        st.job_types?.default || "",
                  repeatCustomer: st.job_types?.repeatCustomer || ""
                },
                tagTypeIds:{}
              };
              if (st.tag_types) {
                for (const k in st.tag_types) cfgObj.tagTypeIds[k] = st.tag_types[k] || "";
              }
              jobTypeConfigs[card.job_type] = cfgObj;
            }
          });

          trace.push({ type:"debug", payload:{ message:`Available job types: ${Object.keys(available_jobType).join(", ")}` }});
        }
      }
    } catch (jtErr) {
      trace.push({ type:"debug", payload:{ message:`Job-type extraction error: ${jtErr.message}` }});
    }

/* ------------------------------------------------------------------ */
/* 4) ZIP CODES VIA SHIFT-ZONE-MAP – PARALLEL 1-DAY SLICES             */
/* ------------------------------------------------------------------ */
const WINDOW_DAYS = 10;
const CHUNK_DAYS  = 1;

const nowUTC   = new Date();
const startUTC = new Date(Date.UTC(
  nowUTC.getUTCFullYear(),
  nowUTC.getUTCMonth(),
  nowUTC.getUTCDate(),
  4, 0, 0));                   // 04:00 UTC anchor

let uniqueZipSet = new Set();

/* ----- 1. build an array of fetch promises (runs in parallel) ----- */
const slicePromises = [];
for (let offset = 0; offset < WINDOW_DAYS; offset += CHUNK_DAYS) {
  const s = new Date(startUTC);  s.setDate(s.getDate() + offset);
  const e = new Date(s);         e.setDate(e.getDate() + CHUNK_DAYS);

  const url =
    `https://api.s2f.tech/api/v2/market/${s2fId}` +
    `/service-titan/schedule/technician-shift-zone-map` +
    `/starts-on-or-after/${s.toISOString().slice(0,19)}Z` +
    `/ends-on-or-before/${e.toISOString().slice(0,19)}Z`;

  slicePromises.push(fetch(url, requestConfig));
}

/* ----- 2. await all slices at once ----- */
const sliceResults = await Promise.all(slicePromises);

/* ----- 3. merge ZIP codes from all successful slices ----- */
sliceResults.forEach(res => {
  if (!res.ok) return;                                 // skip 5xx
  (res.json?.data || []).forEach(z =>
    (Array.isArray(z.zips) ? z.zips : []).forEach(zip => {
      if (/^\d{5}$/.test(zip)) uniqueZipSet.add(zip);
    })
  );
});

const uniqueZipCodes = [...uniqueZipSet];
trace.push({ type:"debug", payload:{ message:`Pulled ${uniqueZipCodes.length} zips in parallel.` }});

const availableJobTypesArray = Object.keys(available_jobType);
    
    /* ------------------------------------------------------------------ */
    /* 5) SUCCESS RETURN                                                  */
    /* ------------------------------------------------------------------ */
    return {
      outputVars:{
        serviceAreaZipCodes:      JSON.stringify(uniqueZipCodes),
        jobTypeConfigs:           JSON.stringify(jobTypeConfigs),
        jobTypeTermsOfService:    JSON.stringify(jobTypeTermsOfService),
        jobTypeDetails:           JSON.stringify(available_jobType),
        availableJobTypes:        JSON.stringify(availableJobTypesArray),
        timezone_offset
      },
      next:{ path:successPath },
      trace
    };

  /* -------------------------------------------------------------------- */
  /* 6) ERROR HANDLER                                                     */
  /* -------------------------------------------------------------------- */
  } catch (err) {
    trace.push({ type:"debug", payload:{ message:`Critical error: ${err.message}` }});
    return {
      next:{ path:errorPath },
      trace,
      outputVars:{
        serviceAreaZipCodes:"[]",
        jobTypeConfigs:"{}",
        jobTypeTermsOfService:"{}",
        available_jobType:"{}",
        timezone_offset:0
      }
    };
  }
}
```

## Additional Metadata

**Path Order:** ['67f6b18067832ee5b5446b42', '67f6b18567832ee5b5446b49']
**Created By ID:** 196309
**Updated By ID:** 196309
**Folder ID:** None
