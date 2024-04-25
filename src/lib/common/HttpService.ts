export const HttpService = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const post = async (
    api: string,
    body: { [x: string]: any } = {},
    headers: { [x: string]: any } = {}
  ): Promise<{ data: any; status: number }> => {
    const loginToken = localStorage.getItem("token");
    !headers["Content-Type"] && (headers["Content-Type"] = "application/json");
    !headers["Authorization"] && (headers["Authorization"] = loginToken);

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

  return {
    post
  };
};
