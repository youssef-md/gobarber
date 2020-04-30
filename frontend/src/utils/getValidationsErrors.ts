import { ValidationError } from 'yup';

interface Errors {
  // could have a bunch of keys, but all of them will be string: string <key pair>
  [key: string]: string;
}

export default function getValidationErrors(errors: ValidationError): Errors {
  return errors.inner.reduce(
    (acc, error) => ({
      ...acc,
      [error.path]: error.message,
    }),
    {}
  );
}
