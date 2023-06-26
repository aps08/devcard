import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Callendpoint from "./Callendpoint";
import { setUserData } from "../redux/userinfoSlice";
import { setAuthAndUserType } from "../redux/authSlice";
import { getlocaldata } from "../store/localstorage";

function DataWrapper({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const token = getlocaldata("X-ACCESS-TOKEN");
        if (token) {
          const { data, statuscode } = await Callendpoint("get", "/user/profile", null, null, true);
          if (statuscode === 200) {
            dispatch(
              setAuthAndUserType({
                isLoggedIn: true,
                userType: data.profile.user
              })
            );
            dispatch(setUserData(data));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return <>{children}</>;
}

export default DataWrapper;
