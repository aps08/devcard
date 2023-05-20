import { useState, useEffect } from "react";

const HEADERS = {
  "Content-Type": "application/json; charset=UTF-8"
};
const HOST = "http://localhost:5000";

const useFetchpublic = (url, method, body = null) => {
  const [data, setData] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let requestOptions = {
        method: method,
        headers: HEADERS,
        mode: "cors"
      };

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
