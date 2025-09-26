type CreateLeadPhone = {
  value: string;
  valueType?: "WORK" | "MOBILE" | "HOME" | "OTHER";
};

export type CreateLeadPayload = {
  title: string;
  name?: string;
  lastName?: string;
  phones?: CreateLeadPhone[];
  comments?: string;
  sourceId?: string; // e.g. 'WEB', 'TELEGRAM'
};

function buildFormData(payload: CreateLeadPayload): URLSearchParams {
  const fd = new URLSearchParams();
  fd.set("fields[TITLE]", payload.title);
  if (payload.name) fd.set("fields[NAME]", payload.name);
  if (payload.lastName) fd.set("fields[LAST_NAME]", payload.lastName);
  if (payload.sourceId) fd.set("fields[SOURCE_ID]", payload.sourceId);
  if (payload.comments) fd.set("fields[COMMENTS]", payload.comments);
  if (payload.phones && payload.phones.length > 0) {
    payload.phones.forEach((p, idx) => {
      fd.set(`fields[PHONE][${idx}][VALUE]`, p.value);
      fd.set(`fields[PHONE][${idx}][VALUE_TYPE]`, p.valueType ?? "MOBILE");
    });
  }
  fd.set("params[REGISTER_SONET_EVENT]", "Y");
  return fd;
}

export async function createLead(
  payload: CreateLeadPayload
): Promise<{ id: number } | null> {
  const webhookUrl = import.meta.env.VITE_BITRIX_WEBHOOK_URL as
    | string
    | undefined;
  if (!webhookUrl) {
    console.warn(
      "VITE_BITRIX_WEBHOOK_URL is not set. Lead will not be created."
    );
    return null;
  }
  const body = buildFormData(payload);
  const resp = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Bitrix24 error: ${resp.status} ${text}`);
  }
  const data = await resp.json().catch(() => ({}));
  if (data && typeof data.result === "number") {
    return { id: data.result };
  }
  return null;
}
