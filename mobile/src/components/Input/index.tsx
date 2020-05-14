import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
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
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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

  // Override the ref.focus, instead of calling it in TextInput(which already have a ref for unform setting and cleaning) we'll
  // get this ref.focus() and run our focus() method bellow, specifying via what ref it'll focus
  useImperativeHandle(ref, function defineFocusMethodToInputRef() {
    return {
      focus() {
        inputElementRef.current.focus();
      },
    };
  });

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholderTextColor="#666360"
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        keyboardAppearance="dark"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
