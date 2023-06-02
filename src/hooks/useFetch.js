import { useState, useEffect } from "react";
import { getUserToken } from "../store/localstorageoperations";

const OPTIONS = {
  method: null,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Accept: "application/json"
  },
  body: null,
  mode: "cors"
};

function useFetch(EndPoint, Method, Data = null, Authorization = false) {
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState(false);

  useEffect(() => {
    let Requestoptions = null;
    if (Authorization) {
      Requestoptions = { headers: { ...OPTIONS.headers, Authorization: "Bearer " + getUserToken() } };
    } else {
      Requestoptions = { ...OPTIONS, method: Method };
    }
    if (Data) {
      Requestoptions.body = JSON.stringify(Data);
    }
    const callingApi = async () => {
      try {
        const response = await fetch(EndPoint, Requestoptions);
        console.log("callled");
        const data = await response.json();
        if (response.ok) {
          setmessage(data.message);
        } else {
          seterror(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callingApi();
  }, [EndPoint, Method, Data, Authorization]);

  return { message, error };
}

export default useFetch;
