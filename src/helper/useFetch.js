import { useState, useEffect } from "react";
import { getUserToken } from "../store/localstorageoperations";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

export function useFetchpublic(url, method, body = null) {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let requestOptions = {
        method: method,
        headers: HEADERS
      };

      if (method !== "GET") {
        requestOptions.body = JSON.stringify(body);
      }
      fetch(url, requestOptions)
        .then((response) => {
          setStatusCode(response.status);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Request failed");
          }
        })
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          setData(error.error);
        });
    };

    fetchData();
  }, [url]);

  return { data, statusCode };
}

export function useFetchprivate(url, method, body = null) {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const token = getUserToken();
    let requestOptions = {
      method: method,
      headers: { ...HEADERS, Authorization: `Bearer ${token}` },
      Authorization: `Bearer ${token}`
    };

    if (method !== "GET") {
      requestOptions.body = JSON.stringify(body);
    }
    const fetchData = () => {
      fetch(url, requestOptions)
        .then((response) => {
          setStatusCode(response.status);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Request failed");
          }
        })
        .then((json) => {
          setData(json);
        })
        .catch((error) => {
          setData(error.error);
        });
    };

    fetchData();
  }, [url]);

  return { data, statusCode };
}
