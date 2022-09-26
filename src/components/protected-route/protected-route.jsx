import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import PropTypes from "prop-types";

export const ProtectedRoute = ({
  forNonAuthUsers = false,
  children,
  ...rest
}) => {

  const user = useSelector((store) => store.user.user);
  const location = useLocation();

  const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);

  if (!isAuthSuccess) {
    <Preloader />;
  }

  if (forNonAuthUsers && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!forNonAuthUsers && !user) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

ProtectedRoute.propTypes = {
  forNonAuthUsers: PropTypes.bool,
  children: PropTypes.element.isRequired,
};
