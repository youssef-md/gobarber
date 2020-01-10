import React, {forwardRef} from 'react';

import {StyledContainer, StyledTextInput, StyledIcon} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <StyledContainer style={style}>
      {icon && <StyledIcon name={icon} />}
      <StyledTextInput {...rest} ref={ref} />
    </StyledContainer>
  );
}

export default forwardRef(Input);
