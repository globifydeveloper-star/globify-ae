interface LeadFormData {
  formName: string;
  fields: Record<string, string>;
}

export function extractFormFields(
  form: HTMLFormElement,
): Record<string, string> {
  const fields: Record<string, string> = {};
  const inputs = form.querySelectorAll("input, select, textarea");
  inputs.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const id = htmlEl.getAttribute("id");
    const name = htmlEl.getAttribute("name");
    
    // Try to find a label element for this input
    let labelEl = id ? form.querySelector(`label[for="${id}"]`) : null;
    
    // Fallback: If no label found by ID, look at the previous sibling in the DOM
    if (!labelEl && htmlEl.previousElementSibling?.tagName === "LABEL") {
      labelEl = htmlEl.previousElementSibling;
    }
    
    const labelText = labelEl?.textContent?.replace(/\s*\*\s*$/, "").trim();
    
    const placeholder = htmlEl
      .getAttribute("placeholder")
      ?.replace(/\s*\*\s*$/, "")
      .trim();
      
    // Always prefer standard 'name' attribute or 'labelText' over brittle fallbacks
    const key = name || labelText || placeholder || id || htmlEl.tagName;
    
    // Support checkboxes correctly
    if (htmlEl.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox") {
      fields[key] = (el as HTMLInputElement).checked ? "Yes" : "No";
    } else {
      fields[key] = (el as HTMLInputElement).value;
    }
  });
  return fields;
}

export async function submitLeadForm({
  formName,
  fields,
}: LeadFormData): Promise<boolean> {
  try {
    const response = await fetch("/api/send-lead-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formName, fields }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Lead form submission error:", errorData);
      return false;
    }

    const data = await response.json();
    return data?.success === true;
  } catch (err) {
    console.error("Lead form submission error:", err);
    return false;
  }
}
