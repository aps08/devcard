import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getlocaldata } from "../store/localstorage";

function PrivateRoute(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getlocaldata("X-ACCESS-TOKEN");
    if (!token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <props.Component />
    </>
  );
}

export default PrivateRoute;
