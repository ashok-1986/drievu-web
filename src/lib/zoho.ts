// src/lib/zoho.ts

// Type representing the shape of our form data
export interface EnquiryData {
  propertyType: string;
  buildings: number;
  postcode: string;
  trigger: string[];
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  callTime: string;
}

// Labels for mapping enums to readable text in the description
const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "commercial-office": "Commercial Office",
  "residential-block": "Residential Block",
  "industrial-logistics": "Industrial & Logistics",
  "public-infrastructure": "Public Infrastructure",
  "private-residence": "Private Residence",
};

const TRIGGER_LABELS: Record<string, string> = {
  "new-install": "New installation",
  "upgrading-existing": "Upgrading existing system",
  "compliance-requirement": "Compliance requirement",
};

/**
 * Maps the form submission data to the Zoho CRM Lead format
 */
function mapFormToZohoLead(formData: EnquiryData) {
  const propertyLabel = PROPERTY_TYPE_LABELS[formData.propertyType] || formData.propertyType;
  const triggerLabels = formData.trigger.map(t => TRIGGER_LABELS[t] || t).join(", ");
  
  const description = [
    `Property Type: ${propertyLabel}`,
    `Number of Buildings: ${formData.buildings}`,
    `Postcode: ${formData.postcode}`,
    `Reason for Enquiry: ${triggerLabels}`,
    `Preferred Call Time: ${formData.callTime}`
  ].join("\n");

  return {
    Last_Name: formData.name, // Zoho requires a last name. We map the full provided name here.
    Company: formData.company,
    Email: formData.email,
    Phone: formData.phone,
    Designation: formData.role, // Standard Zoho field for Job Title/Role
    Lead_Source: "Website - Drievu Scoping Review",
    Description: description
  };
}

/**
 * Fetches a fresh access token from Zoho using the refresh token
 */
async function getZohoAccessToken(): Promise<string> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_DC } = process.env;

  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    throw new Error("Missing Zoho environment variables");
  }

  const dc = ZOHO_DC || "eu";
  const tokenUrl = `https://accounts.zoho.${dc}/oauth/v2/token`;
  
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    refresh_token: ZOHO_REFRESH_TOKEN,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch Zoho access token: ${errorText}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("Zoho response did not contain an access token");
  }

  return data.access_token;
}

/**
 * Creates a Lead in Zoho CRM.
 * This function will catch any errors and return a success/failure object,
 * ensuring it doesn't break the main flow.
 */
export async function createZohoLead(formData: EnquiryData): Promise<{ success: boolean; error?: unknown }> {
  try {
    const accessToken = await getZohoAccessToken();
    const leadPayload = mapFormToZohoLead(formData);
    
    const dc = process.env.ZOHO_DC || "eu";
    const crmUrl = `https://www.zohoapis.${dc}/crm/v3/Leads`;

    const response = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Authorization": `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [leadPayload]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Zoho API responded with status ${response.status}: ${errorText}`);
    }

    const responseData = await response.json();
    
    // Zoho API returns an array of responses in the 'data' key corresponding to the input array
    if (responseData.data && responseData.data[0]?.code !== "SUCCESS") {
       throw new Error(`Zoho API error: ${JSON.stringify(responseData.data[0])}`);
    }

    console.log("[ZOHO] Lead created successfully.");
    return { success: true };
  } catch (error) {
    console.error("[ZOHO] Failed to create lead:", error);
    return { success: false, error };
  }
}
