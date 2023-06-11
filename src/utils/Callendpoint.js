import axios from "axios";
import { getlocaldata } from "../store/localstorage";

const HEADER = {
  "Content-Type": "application/json; charset=UTF-8",
  Accept: "application/json"
};

async function Callendpoint(method, apiEndpoint, params = null, data = null, headers = HEADER, Authorization = false) {
  let axiosConfig = null;
  try {
    axiosConfig = {
      method: method,
      url: apiEndpoint,
      headers: headers
    };
    if (Authorization) {
      const token = getlocaldata("X-ACCESS-TOKEN");
      axiosConfig.headers["Authorization"] = `Bearer ${token}`;
    }
    if (method === "GET") {
      axiosConfig.params = params;
    } else {
      axiosConfig.data = data;
    }
    const response = await axios(axiosConfig);
    return { data: response.data, statuscode: response.status };
  } catch (error) {
    return { data: error.response.data, statuscode: error.response.status };
  }
}

export default Callendpoint;
