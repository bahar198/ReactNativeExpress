import Cookies from "js-cookie";
import dayjs from "dayjs";

const HEADER_NAME = process.env.MARKETS_HEADER_NAME || "X-Auth-Token";
const BROWSER_AUTH_COOKIE = process.env.BROWSER_AUTH_COOKIE || "Smile_TOKEN";

const apiRequest = async (
  url: string,
  args?: {
    body?: any;
    file?: File;
    method?: string;
    contentType?: string;
  }
) => {
  const token = Cookies.get(BROWSER_AUTH_COOKIE);
  console.log("token", BROWSER_AUTH_COOKIE);
  const optionsConfig: any = {
    method: args?.method ? args.method : "get",
    credentials: "include",
    headers: {},
  };

  if (token) {
    optionsConfig.headers.authorization = `Bearer ${token}`;
  }

  if (args?.method) {
    optionsConfig.body = JSON.stringify({ ...args?.body });
  }

  if (args?.file) {
    const formdata = new FormData();
    formdata.append("image", args.file);
    optionsConfig.body = formdata;
  } else {
    optionsConfig.headers["Content-Type"] = "application/json; charset=UTF-8";
  }

  try {
    const request = await fetch(`/api/${url}`, optionsConfig).catch((err) => {
      console.log("error:", err);
      return err;
    });

    const authHeader = request.headers.get(HEADER_NAME);
    if (authHeader) {
      Cookies.set(BROWSER_AUTH_COOKIE, authHeader, {
        expires: dayjs().add(1, "hour").toDate(),
      });
    }

    if (request.status !== 200) {
      return await request.json();
    }

    return await request.json();
  } catch (err) {
    return err;
  }
};

export default apiRequest;
