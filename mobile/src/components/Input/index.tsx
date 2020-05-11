import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProperties } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string; // for unform
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue }); // handle input value
  const inputElementRef = useRef<any>(null); // handle input UI

  useEffect(
    function registerInputFieldToUnform() {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
        // Code bellow is if we want to set or clear the Form input dynamically via Unform
        setValue(_, value) {
          inputValueRef.current.value = value;
          inputElementRef.current.setNativeProps({ text: value });
        },
        clearValue() {
          inputValueRef.current.value = '';
          inputElementRef.current.clear();
        },
      });
    },
    [registerField, inputValueRef, fieldName]
  );

  // We are using inputElementRef to synchronize a possible setting and cleaning via Unform, so we'll use the useImperativeHandle
  useImperativeHandle(ref, function defineFocusMethodToInputRef() {
    return {
      focus() {
        inputElementRef.current.focus();
      },
    };
  });

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
