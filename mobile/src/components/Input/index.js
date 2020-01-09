import React, {forwardRef} from 'react';

import {Container, TxtInput, IconBackground, CustomIcon} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && (
        <IconBackground>
          <CustomIcon name={icon} />
        </IconBackground>
      )}
      <TxtInput {...rest} ref={ref} />
    </Container>
  );
}

export default forwardRef(Input);
