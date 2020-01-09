import React from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {StyledRectButton, StyledText} from './styles';

export default function Button({children, loading, ...rest}) {
  return (
    <StyledRectButton {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <StyledText>{children}</StyledText>
      )}
    </StyledRectButton>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
