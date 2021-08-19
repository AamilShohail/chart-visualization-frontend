import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, allowedRoles, ...rest }) {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(auth.role) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
