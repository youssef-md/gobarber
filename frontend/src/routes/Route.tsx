import React from 'react';
import {
  RouteProps as RouterDOMProps,
  Route as RouterDOMRoute,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface RouteProps extends RouterDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType; // Dashboard insted of <Dashboard />
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  // true/true = OK
  // true/false = redirect to SignIn
  // false/true = redirect to Dashboard
  // false/false = OK

  return (
    <RouterDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location }, // forward history
            }}
          />
        );
      }}
    />
  );
};

export default Route;
