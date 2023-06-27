import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);

  // const dispatch = useDispatch();

  const history = useNavigate();

  const Redirect =useCallback(() => {
    history("/");
  },[history])

  console.log("state", auth);
  useEffect(() => {
    if (!auth?.uid && auth.isLoaded === true) {
      Redirect();
    }
  }, [auth,Redirect]);

  return (
    <>
      {auth?.uid && auth?.isLoaded === true ? (
        <>
          <div className="overflow-y-auto h-100vh">
            <Outlet />
          </div>
        </>
      ) : (
        <>{Redirect()}</>
      )}
    </>
  );
};
export default ProtectedRoutes;
