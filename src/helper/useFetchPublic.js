import { useState, useEffect } from "react";
import { getUserToken } from "../store/localstorageoperations";

const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8",
  Accept: "application/json"
};

const useFetchpublic = (url, method, body = null, authorizaton = false) => {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  let requestOptions = null;

  useEffect(() => {
    const fetchData = async () => {
      if (authorizaton) {
        const jwt_token = getUserToken();
        requestOptions = {
          method: method,
          headers: { ...HEADERS, Authorization: `Bearer ${jwt_token}` },
          mode: "cors"
        };
      } else {
        requestOptions = {
          method: method,
          headers: HEADERS,
          mode: "cors"
        };
      }

      if (method !== "GET" && method !== "DELETE" && body !== null) {
        requestOptions.body = JSON.stringify(body);
        console.log(body);
      }
      const response = await fetch(HOST + url, requestOptions);
      const responsedata = await response.json();
      setData(responsedata);
      setStatusCode(response.status);
    };

    fetchData();
  }, [url]);

  return { data, statusCode };
};

export default useFetchpublic;
