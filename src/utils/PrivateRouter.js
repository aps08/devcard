import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getlocaldata } from "../store/localstorage";

function PrivateRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const token = getlocaldata("X-USER");
    const user = getlocaldata("X-ACCESS-TOKEN");
    if (!(token && user)) {
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
