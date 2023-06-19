import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PublicRoute(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <props.Component />
    </>
  );
}

export default PublicRoute;
