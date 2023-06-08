import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkLocalStorageKeys } from "../store/localstorageoperations";

function PrivateRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const IsLoggedin = checkLocalStorageKeys();
    if (!IsLoggedin) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
}

export default PrivateRoute;
