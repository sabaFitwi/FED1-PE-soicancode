import * as localStorage from "../../storage/localStorage";

export const headers = (contentType) => {
  const token = localStorage.load("token");
  const headers = {};

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
