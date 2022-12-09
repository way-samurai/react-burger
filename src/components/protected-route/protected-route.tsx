import { FC, ReactNode } from 'react';
import { useSelector } from "../../services/types/index";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { TLocation } from '../../services/types/data';

type TProtectedRoute = {
  forNonAuthUsers: boolean;
  children: ReactNode;
  path: string;
  exact: boolean;
}

export const ProtectedRoute: FC<TProtectedRoute> = ({
  forNonAuthUsers = false,
  children,
  ...rest
}) => {
  const { email, name } = useSelector((store) => store.user.user);
  const location = useLocation<TLocation>();

  const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);

  if (!isAuthSuccess) {
    <Preloader />;
  }

  if (forNonAuthUsers && email !== "" && name !== "") {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!forNonAuthUsers && email === "" && name === "") {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};