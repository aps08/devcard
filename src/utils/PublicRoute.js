import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getlocaldata } from "../store/localstorage";

function PublicRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = getlocaldata("X-USER");
    const user = getlocaldata("X-ACCESS-TOKEN");
    if (user && token) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Component />
    </>
  );
}

export default PublicRoute;
