// Supabase dependency entirely removed in favor of Hostinger native PHP router

interface LeadFormData {
  formName: string;
  fields: Record<string, string>;
}

export function extractFormFields(form: HTMLFormElement): Record<string, string> {
  const fields: Record<string, string> = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const id = htmlEl.getAttribute('id');
    // Try to find a label element for this input
    const labelEl = id ? form.querySelector(`label[for="${id}"]`) : null;
    const labelText = labelEl?.textContent?.replace(/\s*\*\s*$/, '').trim();
    // Try label text, then placeholder, then id
    const placeholder = htmlEl.getAttribute('placeholder')?.replace(/\s*\*\s*$/, '').trim();
    const key = labelText || placeholder || id || htmlEl.tagName;
    fields[key] = (el as HTMLInputElement).value;
  });
  return fields;
}

export async function submitLeadForm({ formName, fields }: LeadFormData): Promise<boolean> {
  try {
    // 1. MAP DATA STRICTLY TO CRM SCHEMA
    const getField = (possibleKeys: string[]) => {
      const key = Object.keys(fields).find(k => possibleKeys.some(pK => k.toLowerCase().includes(pK.toLowerCase())));
      return key ? fields[key] : "";
    };

    const name = getField(["Name"]);
    const company = getField(["Company"]) || "N/A";
    const email = getField(["Email"]);
    const phone = getField(["Phone"]);
    const country = getField(["Country"]) || "UAE";
    const description = getField(["Message", "Tell Us", "Project", "Requirements"]);
    const rawService = getField(["Service", "Project Type", "Package"]);

    // Map the custom dropdown to CRM strict categories
    let service_interest = "Website Development";
    const serviceLower = rawService.toLowerCase();
    if (serviceLower.includes("ecommerce") || serviceLower.includes("shopify") || serviceLower.includes("magento")) service_interest = "E-commerce Development";
    else if (serviceLower.includes("erp") || serviceLower.includes("medoc") || serviceLower.includes("system")) service_interest = "ERP / Business System";
    else if (serviceLower.includes("app")) service_interest = "Mobile App";
    else if (serviceLower.includes("marketing") || serviceLower.includes("seo") || serviceLower.includes("ppc")) service_interest = "Digital Marketing";
    else if (serviceLower.includes("ai") || serviceLower.includes("automation")) service_interest = "AI / Automation";
    else if (serviceLower.includes("migration") || serviceLower.includes("revamp")) service_interest = "Revamp / Migration";

    // 2. SEND TO LOVABLE CRM (Bypasses IP Limit since it comes from user's browser)
    const CRM_ENDPOINT = "https://tqfmxqbpvqqbpwlzpcgp.supabase.co/functions/v1/capture-lead";
    
    // We intentionally wrap this in a non-blocking or safe try-catch so an email still fires if CRM fails
    try {
      await fetch(CRM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.substring(0, 200),
          company: company.substring(0, 200),
          email: email.substring(0, 255),
          phone: phone ? phone.substring(0, 20) : undefined,
          country: country,
          service_interest: service_interest,
          description: description,
          source_url: typeof window !== 'undefined' ? window.location.origin : 'https://globify.ae',
        }),
      });
    } catch (crmErr) {
      console.warn("CRM Submission failed silently:", crmErr);
    }

    // 3. SEND TO HOSTINGER PHP ROUTER (For Resend Emails to Sales & Auto-reply)
    const response = await fetch('/lead-router.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formName, fields }),
    });

    if (!response.ok) {
      console.error('Lead form email router error: Server returned HTTP ' + response.status);
      return false;
    }

    const data = await response.json();
    return data?.success === true;
  } catch (err) {
    console.error('Lead form submission error:', err);
    return false;
  }
}
