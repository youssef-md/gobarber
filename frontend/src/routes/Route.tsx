import React from 'react';
import {
  RouteProps as DOMRouteProps,
  Route as DOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

// isPrivate = true | isSigned = true => OK
// isPrivate = true | isSigned = false => Login
// isPrivate = false | isSigned = true => Dashboard
// isPrivate = false | isSigned = false => OK

interface RouteProps extends DOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <DOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
