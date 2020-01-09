import React, {forwardRef} from 'react';

import {
  StyledContainer,
  StyledTextInput,
  IconBackground,
  StyledIcon,
} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <StyledContainer style={style}>
      {icon && (
        <IconBackground>
          <StyledIcon name={icon} />
        </IconBackground>
      )}
      <StyledTextInput {...rest} ref={ref} />
    </StyledContainer>
  );
}

export default forwardRef(Input);
