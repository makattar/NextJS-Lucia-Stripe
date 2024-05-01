import { luciaAuthSession } from "../constants/LuciaConfig";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value?.split(`; ${name}=`) ?? [];
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export const HttpService = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const post = async (
    api: string,
    body: { [x: string]: any } = {},
    headers: { [x: string]: any } = {}
  ): Promise<{ data: any; status: number }> => {
    const authSession = getCookie(luciaAuthSession);
    !headers["Content-Type"] && (headers["Content-Type"] = "application/json");
    !headers["Authorization"] &&
      authSession &&
      (headers["Authorization"] = `Bearer ${authSession}`);

    const response = await fetch(BASE_URL + api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    if (response.ok) {
      const resp = await response.json();
      return { data: resp, status: response.status };
    } else {
      return {
        data: typeof response?.json === "function" ? await response.json() : {},
        status: response.status
      };
    }
  };

  const get = async (
    api: string,
    headers: { [x: string]: any } = {}
  ): Promise<{ data: any; status: number }> => {
    const authSession = getCookie(luciaAuthSession);
    !headers["Content-Type"] && (headers["Content-Type"] = "application/json");
    !headers["Authorization"] &&
      authSession &&
      (headers["Authorization"] = `Bearer ${authSession}`);

    const response = await fetch(BASE_URL + api, {
      method: "GET",
      headers: headers
    });
    if (response.ok) {
      const resp = await response.json();
      return { data: resp, status: response.status };
    } else {
      return {
        data: typeof response?.json === "function" ? await response.json() : {},
        status: response.status
      };
    }
  };

  return {
    get,
    post
  };
};
