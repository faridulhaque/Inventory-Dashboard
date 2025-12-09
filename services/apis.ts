import { APIEnums } from "./types";
import { getToken } from "./util-client";

export const postData = async <T>(url: APIEnums, body: T) => {
  let token: string = "";
  if (
    url !== APIEnums.login &&
    url !== APIEnums.register &&
    url !== APIEnums.verify
  ) {
    token = getToken();
  }
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
