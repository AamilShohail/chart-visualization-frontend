import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ Component, allowedRoles, ...rest }) {
  // const auth = useSelector((state) => state.auth);
  const auth = "OWNER";
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/logint", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
