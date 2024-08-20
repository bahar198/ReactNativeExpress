import { useState } from "react";
import apiRequest from "../utils/apiRequest";
import { useRouter } from "expo-router";

function useApi() {
  const router = useRouter();

  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function get(url: string) {
    try {
      setSuccess(null);
      setLoading(true);
      setError(null);
      const request = await apiRequest(url);
      setLoading(false);
      if (request.error) {
        if (request.error === "TOKEN_IS_MISSING") {
          router.push("/auth");
        }
        setError(request.error);
      } else if (request.success) {
        setSuccess(true);
      }
      return request;
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("ERROR_GETTING_API");
      return;
    }
  }
  async function remove(url: string) {
    try {
      setSuccess(null);
      setLoading(true);
      setError(null);
      const request = await apiRequest(url, {
        method: "delete",
      });
      setLoading(false);
      if (request.error) {
        if (request.error === "TOKEN_IS_MISSING") {
          router.push("/auth");
        }
        setError(request.error);
      } else if (request.success) {
        setSuccess(true);
      }
      return request;
    } catch (err) {
      setLoading(false);
      setError("ERROR_DELETING_API");
      return;
    }
  }
  async function post(url: string, data: any) {
    try {
      setSuccess(null);
      setLoading(true);
      setError(null);

      const request = await apiRequest(url, {
        body: data,
        method: "POST",
      });
      setLoading(false);
      console.log("useApi", request);
      if (request.error) {
        if (request.error === "TOKEN_IS_MISSING") {
          router.push("/auth");
        }
        setError(request.error);
      } else {
        setSuccess(true);
      }
      return request;
    } catch (err) {
      setLoading(false);
      setError("ERROR_POSTING_API");
      return;
    }
  }

  async function postFile(url: string, data: any) {
    try {
      setSuccess(null);
      setLoading(true);
      setError(null);
      const request = await apiRequest(url, {
        file: data,
        method: "POST",
        contentType: "",
      });
      setLoading(false);
      if (request.error) {
        if (request.error === "TOKEN_IS_MISSING") {
          router.push("/auth");
        }
        setError(request.error);
      } else {
        setSuccess(true);
      }
      return request;
    } catch (err) {
      setLoading(false);
      setError("ERROR_POSTING_API");
      return;
    }
  }

  async function put(url: string, data: any) {
    try {
      setSuccess(null);
      setLoading(true);
      setError(null);
      const request = await apiRequest(url, {
        body: data,
        method: "put",
      });
      setLoading(false);
      if (request.error) {
        if (request.error === "TOKEN_IS_MISSING") {
          router.push("/auth");
        }
        setError(request.error);
      } else if (request.success) {
        setSuccess(true);
      }
      return request;
    } catch (err) {
      setLoading(false);
      setError("ERROR_POSTING_API");
      return;
    }
  }

  return {
    error,
    loading,
    success,
    post,
    get,
    put,
    remove,
    postFile,
  };
}

export default useApi;
