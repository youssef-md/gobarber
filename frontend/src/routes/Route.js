import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import { store } from '../store';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { logged } = store.getState().auth;

  if (!logged && isPrivate) return <Redirect to="/" />;
  if (logged && !isPrivate) return <Redirect to="/dashboard" />;

  const PageLayout = logged ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <PageLayout>
          <Component {...props} />
        </PageLayout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
