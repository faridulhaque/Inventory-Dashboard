import { APIEnums } from "./types";

export const postData = async <T>(url: APIEnums, body: T) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),

    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};
