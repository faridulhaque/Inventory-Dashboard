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

export const putData = async <T>(url: APIEnums, body: T) => {
  const token = getToken();
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const deleteData = async <T>(url: APIEnums, body: T) => {
  const token = getToken();
  const res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
